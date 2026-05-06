import 'dotenv/config';
import express, { Request, Response } from 'express';
import { FxRateService } from './fx-rate-service';
import { QuoteBundleResponse } from './types';

const app = express();
const port = Number(process.env.FX_PORT ?? 3000);
const fxRateService = new FxRateService();

app.get('/fx/quote', async (_req: Request, res: Response<QuoteBundleResponse | { error: string }>) => {
  try {
    res.json(await fxRateService.getPkrQuotes());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(502).json({ error: message });
  }
});

async function bootstrap(): Promise<void> {
  await fxRateService.start();

  app.listen(port, () => {
    console.log(`FX feed listening on http://localhost:${port}`);
    console.log(`Quote endpoint: http://localhost:${port}/fx/quote`);
  });
}

void bootstrap().catch((error) => {
  console.error('Unable to start FX feed:', error);
  process.exit(1);
});
