
# how USDC maintains its 1:1 peg
USDC maintains its 1:1 peg through a simple reserve-and-redemption model, not an algorithm.  when an approved Circle Mint client wires USD to Circle, Circle credits the reserve and mints the same amount of USDC to that client’s wallet. When the client redeems, Circle burns the USDC and wires back the corresponding USD. The peg holds because approved institutional clients can mint and redeem at par, which creates arbitrage pressure if the market price moves away from $1.
# Circle Reserve Model
Circle’s reserve model is also what makes that peg easier to trust. The text says USDC is backed 1:1 by U.S. dollars and short-duration U.S. Treasuries, with roughly 80%+ held in the BlackRock-managed Circle Reserve Fund (USDXX) at BNY Mellon and the remainder held as cash deposits at major banks. Circle publishes reserve composition on its transparency page, and Deloitte performs monthly agreed-upon-procedures attestations confirming that, at the reporting date, USDC in circulation matched reserve assets. In plain language: Circle is saying, “for every USDC outstanding, we hold an equal amount of liquid dollar assets,” and a major accounting firm checks that claim monthly.

# Monthly Proof Report 
Circle publishes monthly proof-of-reserves reports for USDC, providing independent attestation from Grant Thornton, a leading accounting firm. These reports confirm that every USDC in circulation is fully backed 1:1 by cash and short-term U.S. Treasuries held with regulated financial institutions. This ongoing transparency is a core part of Circle’s commitment to trust and regulatory compliance, giving customers and partners confidence in the stability and reliability of USDC.
# Banking Risk
For a bank risk committee, the easiest explanation is this: USDC is the cleaner fit for regulated banking integrations because the reserve assets are short-duration and highly liquid, the custody and fund structure are named and institution-grade, and the disclosure cadence is heavy. The text specifically points to monthly Deloitte attestations, MiCA compliance, NYDFS BitLicense status, and a broad native multi-chain footprint. That combination makes USDC easier to diligence from compliance, treasury, audit, and operational-risk perspectives.

# why Choose USDC over USDT

 For regulated banking integrations, USDC is usually the better choice than USDT because its control framework is easier for a bank to approve.
The core reason is not “crypto popularity.” It’s diligence. Circle’s own materials say USDC reserves are fully backed by highly liquid USD assets, disclosed weekly, and supported by monthly third-party assurance from a Big Four firm. Circle also says the majority of reserves sit in the Circle Reserve Fund (USDXX), an SEC-registered 2a-7 government money market fund managed by BlackRock, with reserve assets held for USDC holders’ benefit. That is a reserve story a bank treasury, audit, compliance, and model-risk committee can actually follow. Sources: Circle transparency, USDC page, and banks page:
https://www.circle.com/transparency
https://www.circle.com/usdc
https://www.circle.com/banks

By contrast, Tether’s own materials say its reserves include not just traditional currency and cash equivalents, but also “other assets,” including receivables from loans made to third parties, and that reserve information is typically published quarterly while circulation data is updated daily. That does not automatically make USDT unusable, but it is harder to defend in a regulated-bank setting because the reserve mix and assurance cadence are less bank-friendly. Sources:
https://tether.to/en/how-it-works
https://tether.to/en/transparency/?tab=usdt%29
https://tether.to/ru/faqs


Choose USDC because it is easier to evidence, easier to monitor, and easier to explain. Circle provides a cleaner reserve structure, more institution-grade transparency, and monthly third-party assurance. For a regulated bank, that reduces governance friction compared with a stablecoin whose reserve disclosures allow a broader asset mix and rely more heavily on quarterly reserve reporting.



# KINEXYS (JPMorgan) and IBM WORLD WIRE (Stellar)   

┌─────────────────────────────────────────────────────────────────┐
│  KINEXYS (JPMorgan)              IBM WORLD WIRE (Stellar)        │
│                                                                   │
│  "Bring the bank onto blockchain"  "Build a blockchain for banks" │
│                                                                   │
│  Private permissioned chain        Public permissionless chain    │
│  JPMorgan controls the rails       Open network, anchors control  │
│  Deposit token (inside banking law) Bridge asset (stablecoin)     │
│  One bank, many clients            Many banks, open ecosystem     │
│  Still running (2026)              Open-sourced, discontinued     │
└─────────────────────────────────────────────────────────────────┘

# JPMorgan Kinexys
When JPMorgan launched JPM Coin in 2019 and later introduced Kinexys (formerly Onyx) in 2020 to expand blockchain-based settlement and wholesale payment capabilities, it was not about chasing trends — it was about solving fundamental inefficiencies in traditional payment systems for JPMorgan's own institutional clients. J.P. Morgan
The mandate was internal first — fix JPMorgan's own cross-border friction before opening to the world. The design goal: give JPMorgan's corporate treasury clients (Siemens, BlackRock, Ant International) a faster, cheaper, programmable settlement layer that stays within JPMorgan's existing banking relationships.
Kinexys combined the trust, scale, and resiliency of a global financial institution with the agility and composability of a technology provider — delivering innovative blockchain solutions with the stability and service of a world-class bank. 
# Kinexys — Private Permissioned Chain
Kinexys by JP Morgan has been at the forefront of innovation in financial services since 2015, offering clients on-chain deposit accounts through its private blockchain. Kinexys Digital Payments enables programmable payments where clients can programme automated payments with blockchain's unique capabilities.
KINEXYS ARCHITECTURE:

┌────────────────────────────────────────────────────┐
│           JPMORGAN PRIVATE PERMISSIONED CHAIN        │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │Blockchain│  │Blockchain│  │Blockchain│          │
│  │Deposit   │  │Deposit   │  │Deposit   │          │
│  │Account A │  │Account B │  │Account C │          │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘          │
│       └─────────────┼─────────────┘                 │
│                     │ Atomic settlement              │
│              JPMorgan operates all nodes            │
└────────────────────────────────────────────────────┘
         │                           │
  Traditional DDA              Traditional DDA
  (fiat on/off ramp)           (fiat on/off ramp)


# Key properties:

JPMorgan runs all validator nodes — complete control
Settlement instrument = deposit token (liability of JPMorgan)
Every participant must be a JPMorgan client
No public blockchain exposure






# IBM World Wire
World Wire was promoted by IBM as the first blockchain network of its kind to integrate payment messaging, clearing and settlement on a single unified platform. IBM created a new type of payment network designed to accelerate remittances and transform cross-border payments to facilitate the movement of money in countries that need it most. Stellar
The mandate was network first — build a neutral, open payment rail that any bank anywhere could connect to. IBM positioned itself as a network operator, not a bank. The design goal: replace correspondent banking globally by creating a shared public infrastructure.

# IBM World Wire — Public Stellar Network
IBM Blockchain World Wire was a real-time cross-border payments network that used the Stellar protocol. The project was created to shorten settlement times, lower costs, and let banks issue stablecoins or use digital assets for final settlement. World Wire launched into limited production in 2019 with several bank partners and pilot corridors. 
WORLD WIRE ARCHITECTURE:

Bank A (Philippines)              Bank B (Germany)
  │                                     │
  ▼                                     ▼
Sending Anchor                   Receiving Anchor
(licensed in PH)                 (licensed in DE)
  │ deposit PHP                  withdraw EUR │
  │ issue USDC                  burn USDC     │
  ▼                                     ▲
┌──────────────────────────────────────┐
│         STELLAR PUBLIC NETWORK        │
│   (decentralized, open validators)    │
│         3-5 second settlement         │
└──────────────────────────────────────┘
  Bilateral agreements between anchors
  IBM = network operator (not a bank)

# Key properties:

Stellar Foundation + independent validators run the network
Settlement instrument = USDC or other stablecoins (third-party liability)
Any bank can connect as an anchor with a bilateral agreement
Full public blockchain — anyone can inspect transactions

