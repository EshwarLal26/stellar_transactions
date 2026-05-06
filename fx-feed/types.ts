export const SUPPORTED_CURRENCIES = ['USD', 'PKR', 'AED'] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export type RatesPayload = {
  base: 'USD';
  timestamp: number;
  rates: Record<string, number>;
};

export type FxSnapshot = {
  fetchedAtMs: number;
  fetchedAt: string;
  expiresAtMs: number;
  expiresAt: string;
  rates: Record<SupportedCurrency, number>;
};

export type QuoteResponse = {
  pair: string;
  mid: number;
  bid: number;
  ask: number;
  spread: {
    bps: number;
    pct: number;
  };
  validity: {
    windowMs: number;
    quotedAt: string;
    expiresAt: string;
    expiresAtMs: number;
  };
};

export type QuoteBundleResponse = {
  quotes: [QuoteResponse, QuoteResponse];
  validity: QuoteResponse['validity'];
};
