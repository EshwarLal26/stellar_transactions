import { InMemoryTtlCache } from './cache';
import {
  FxSnapshot,
  QuoteBundleResponse,
  QuoteResponse,
  RatesPayload,
  SUPPORTED_CURRENCIES,
  SupportedCurrency
} from './types';

const CACHE_KEY = 'fx-snapshot';
const DEFAULT_TTL_MS = 30_000;
const DEFAULT_SPREAD_BPS = 25;
const USD = 1;

export class FxRateService {
  private readonly cache = new InMemoryTtlCache<FxSnapshot>();
  private readonly appId: string;
  private readonly ttlMs: number;
  private readonly spreadBps: number;
  private refreshTimer: NodeJS.Timeout | null = null;
  private inflightRefresh: Promise<FxSnapshot> | null = null;

  constructor(options?: { appId?: string; ttlMs?: number; spreadBps?: number }) {
    this.appId = options?.appId ?? process.env.OPEN_EXCHANGE_RATES_APP_ID ?? 'b074b58cba964264a44fc5bb17915c10';
    this.ttlMs = options?.ttlMs ?? DEFAULT_TTL_MS;
    this.spreadBps = options?.spreadBps ?? Number(process.env.FX_SPREAD_BPS ?? DEFAULT_SPREAD_BPS);
  }

  async start(): Promise<void> {
    await this.refresh();

    this.refreshTimer = setInterval(() => {
      void this.refresh().catch((error: unknown) => {
        console.error('FX refresh failed:', error);
      });
    }, this.ttlMs);
  }

  stop(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  async getQuote(base: SupportedCurrency, counter: SupportedCurrency): Promise<QuoteResponse> {
    const snapshot = await this.getOrRefreshSnapshot();
    return this.buildQuote(snapshot, base, counter);
  }

  async getPkrQuotes(): Promise<QuoteBundleResponse> {
    const snapshot = await this.getOrRefreshSnapshot();
    const pkrUsd = this.buildQuote(snapshot, 'PKR', 'USD');
    const pkrAed = this.buildQuote(snapshot, 'PKR', 'AED');

    return {
      quotes: [pkrUsd, pkrAed],
      validity: pkrUsd.validity
    };
  }

  async getSnapshot(): Promise<FxSnapshot | null> {
    return this.cache.get(CACHE_KEY);
  }

  private async getOrRefreshSnapshot(): Promise<FxSnapshot> {
    return (await this.getSnapshot()) ?? this.refresh();
  }

  private async refresh(): Promise<FxSnapshot> {
    if (!this.appId) {
      throw new Error('OPEN_EXCHANGE_RATES_APP_ID is required');
    }

    if (this.inflightRefresh) {
      return this.inflightRefresh;
    }

    this.inflightRefresh = this.fetchSnapshot()
      .then((snapshot) => {
        this.cache.set(CACHE_KEY, snapshot, this.ttlMs);
        return snapshot;
      })
      .finally(() => {
        this.inflightRefresh = null;
      });

    return this.inflightRefresh;
  }

  private async fetchSnapshot(): Promise<FxSnapshot> {
    const response = await fetch(this.buildRatesUrl(), {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Open Exchange Rates error ${response.status}: ${message}`);
    }

    const payload = (await response.json()) as RatesPayload;
    const fetchedAtMs = Date.now();
    const expiresAtMs = fetchedAtMs + this.ttlMs;

    return {
      fetchedAtMs,
      fetchedAt: new Date(fetchedAtMs).toISOString(),
      expiresAtMs,
      expiresAt: new Date(expiresAtMs).toISOString(),
      rates: {
        USD,
        PKR: payload.rates.PKR,
        AED: payload.rates.AED
      }
    };
  }

  private buildRatesUrl(): string {
    const symbols = SUPPORTED_CURRENCIES.join(',');

    return (
      `https://openexchangerates.org/api/latest.json?app_id=${encodeURIComponent(this.appId)}` +
      `&symbols=${encodeURIComponent(symbols)}`
    );
  }

  private buildSpread(midRate: number) {
    const spreadFraction = this.spreadBps / 10_000;

    return {
      pct: Number((spreadFraction * 100).toFixed(4)),
      bid: Number((midRate * (1 - spreadFraction / 2)).toFixed(6)),
      ask: Number((midRate * (1 + spreadFraction / 2)).toFixed(6))
    };
  }

  private buildQuote(
    snapshot: FxSnapshot,
    base: SupportedCurrency,
    counter: SupportedCurrency
  ): QuoteResponse {
    const midRate = this.convertRate(snapshot.rates, base, counter);
    const spread = this.buildSpread(midRate);

    return {
      pair: `${base}/${counter}`,
      mid: Number(midRate.toFixed(6)),
      bid: spread.bid,
      ask: spread.ask,
      spread: {
        bps: this.spreadBps,
        pct: spread.pct
      },
      validity: {
        windowMs: this.ttlMs,
        quotedAt: snapshot.fetchedAt,
        expiresAt: snapshot.expiresAt,
        expiresAtMs: snapshot.expiresAtMs
      }
    };
  }

  private convertRate(
    rates: Record<SupportedCurrency, number>,
    base: SupportedCurrency,
    counter: SupportedCurrency
  ): number {
    if (base === counter) {
      return USD;
    }

    if (base === 'USD') {
      return rates[counter];
    }

    if (counter === 'USD') {
      return 1 / rates[base];
    }

    return rates[counter] / rates[base];
  }
}
