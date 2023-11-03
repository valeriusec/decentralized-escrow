# Alchemy University Escrow DApp

This decentralized application (DApp) for Alchemy University facilitates an escrow system, enabling users to initiate and approve transactions involving Ether (ETH) between a depositor, an arbiter, and a beneficiary.

## Description

The Alchemy University Escrow DApp allows users to:

- **Insert Addresses and Amount:**
  - Provide the addresses for the depositor, arbiter, and beneficiary.
  - Specify the amount of Ether to be transferred.

- **Approval by Arbiter:**
  - Initiate the escrow and require approval from the arbiter's wallet.

## Getting Started

To run this application on your localhost, follow these steps:

1. **Clone the Git Repository:**
   ```bash
   git clone https://github.com/your-username/alchemy-university-escrow-dapp.git
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   cd web3
   npm install
   ```

3. **Compile the Contracts:**
   ```bash
   npx hardhat compile
   ```

4. **Run a Local Blockchain Node:**
   ```bash
   npx hardhat node
   ```

5. **Connect Wallets to Local Hardhat Addresses:**
   Choose three addresses from the Hardhat output and connect them to a wallet.

6. **Add Custom Network to Wallet:**
   Add a custom network in the wallet settings using the following parameters:
   - **RPC URL:** `http://localhost:8545`
   - **Chain ID:** `31337`

7. **Run the Application:**
   Once the local blockchain is set up, the application should function as expected.

## Usage

1. **Insert Addresses and Amount:**
   - Input the addresses for the arbiter and beneficiary.
   - Specify the amount of Ether to transfer.

2. **Approve Escrow with Arbiter Wallet:**
   - Initiate the escrow and await approval from the arbiter's wallet.

## Troubleshooting

If you encounter any issues, ensure that the dependencies are correctly installed, the local blockchain is running, and the wallet is connected to the custom network (localhost:8545) with the correct chain ID (31337).
