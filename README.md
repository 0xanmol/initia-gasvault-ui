# Initia GasVault UI

## Overview

This repository contains the front-end user interface (UI) for interacting with the **GasVault** smart contract. The UI is built using React and leverages various hooks and components to allow users to seamlessly interact with the GasVault smart contract, enabling them to deposit, withdraw, and view their GAS token balances.

## Features

- **Deposit GAS Tokens**: Users can deposit GAS tokens into the vault.
- **Withdraw GAS Tokens**: Users can withdraw a specified amount of GAS tokens from the vault.
- **View Balance**: Users can view their deposited balance and the total amount of GAS tokens in the vault.

## File Structure

Here’s an overview of the key files and folders in this repository:

### 1. `components/VaultCard.tsx`

The `VaultCard` component is the core UI element for interacting with the GasVault. It allows users to:
- View their deposited GAS token balance.
- View the total GAS tokens deposited in the vault.
- Deposit or withdraw GAS tokens.

**Key Functions:**
- **useEffect Hook**: Fetches and displays the user's deposited balance, the total deposited balance in the vault, and the user's wallet balance.
- **initDeposit**: Initiates the deposit of a specified amount of GAS tokens into the vault.
- **initWithdraw**: Initiates the withdrawal of a specified amount of GAS tokens from the vault.

### 2. `hooks/useEthersSigner.tsx`

This hook converts a `viem` Wallet Client to an `ethers.js` Signer, enabling the execution of transactions.

**Key Functions:**
- **clientToSigner**: Converts a `viem` client to an `ethers.js` Signer.
- **useEthersSigner**: A hook that returns an `ethers.js` Signer for interacting with the smart contract.

### 3. `hooks/useWallet.tsx`

This hook provides various wallet-related functionalities, including connecting to a wallet, switching networks, and fetching the user's balance.

**Key Functions:**
- **switchNetwork**: Allows users to switch the connected network.
- **activeUserAddress**: Returns the currently connected user's address.
- **activeNetworkId**: Returns the current network ID.
- **showBalance**: Fetches and returns the user's current wallet balance.

### 4. `hooks/useVault.tsx`

This hook provides the main functionalities for interacting with the GasVault smart contract, including depositing, withdrawing, and reading balances.

**Key Functions:**
- **readUserDepositedBalance**: Reads the user's deposited balance from the vault contract.
- **initDeposit**: Initiates a deposit transaction into the vault.
- **initWithdraw**: Initiates a withdrawal transaction from the vault.
- **readTotalDepositedBalance**: Reads the total amount of GAS tokens deposited in the vault.

### 5. `utils/toasts.tsx`

This utility handles the display of toast notifications for success and failure events.

**Key Functions:**
- **showFailedMessage**: Displays a toast notification for failed transactions.
- **showSuccessMessage**: Displays a toast notification for successful transactions.

### 6. `utils/parseError.tsx`

This utility parses error messages from the smart contract or blockchain interactions and provides user-friendly error messages.

**Key Functions:**
- **parseError**: Parses and returns a user-friendly error message based on the error provided.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

```sh
git clone https://github.com/0xanmol/initia-gasvault-ui.git
cd initia-gasvault-ui
```

2. **Install dependencies:**

```
npm install

#or

yarn install
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at http://localhost:3000.

## Usage

Deposit GAS Tokens: Enter the amount of GAS tokens you wish to deposit and click the "Deposit" button.

Withdraw GAS Tokens: Enter the amount of GAS tokens you wish to withdraw and click the "Withdraw" button.

View Balances: The dashboard displays your deposited GAS balance and the total GAS tokens in the vault.




