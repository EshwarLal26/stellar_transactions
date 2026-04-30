import express, { Request, Response } from 'express';
import crypto from 'crypto';

type TransactionRequestBody = {
  amount: number | string;
  asset_code: string;
  asset_issuer?: string;
  sender_id: string;
  receiver_id: string;
  fields?: Record<string, unknown>;
};

const app = express();

app.use(express.json());

// SEP-31 POST /transactions endpoint
app.post('/transactions', async (req: Request<unknown, unknown, TransactionRequestBody>, res: Response) => {
  try {
    const {
      amount,
      asset_code,
      asset_issuer,
      sender_id,
      receiver_id,
      fields
    } = req.body;

    // Generate a transaction ID
    const transactionId = crypto.randomBytes(16).toString('hex');

    // Log the simulated Stellar payment details
    console.log('\n=== Simulated SEP-31 Payment ===');
    console.log(`Transaction ID: ${transactionId}`);
    console.log(`Amount: ${amount} ${asset_code}`);
    console.log(`Asset Issuer: ${asset_issuer ?? 'native'}`);
    console.log(`Sender ID: ${sender_id}`);
    console.log(`Receiver ID: ${receiver_id}`);
    console.log('Receiver Fields:', JSON.stringify(fields, null, 2));
    console.log('\n--- Simulating Stellar Network Payment ---');
    console.log(`✓ Payment submitted to Stellar network`);
    console.log(`✓ Transaction hash: ${crypto.randomBytes(32).toString('hex')}`);
    console.log(`✓ Status: pending_receiver`);
    console.log('================================\n');

    // Return SEP-31 compliant response
    res.status(201).json({
      id: transactionId,
      stellar_account_id: '',
      stellar_memo_type: 'hash',
      stellar_memo: crypto.randomBytes(32).toString('base64')
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error processing transaction:', error);
    res.status(400).json({ error: errorMessage });
  }
});

// SEP-31 GET /info endpoint (optional but useful)
app.get('/info', (_req: Request, res: Response) => {
  res.json({
    receive: {
      USD: {
        enabled: true,
        min_amount: 1,
        max_amount: 10000,
        fields: {
          transaction: {
            receiver_routing_number: { description: 'Bank routing number' },
            receiver_account_number: { description: 'Bank account number' }
          }
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SEP-31 Sending Anchor stub running on port ${PORT}`);
  console.log(`POST transactions to: http://localhost:${PORT}/transactions`);
});