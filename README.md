# Sample Hardhat 3 Beta Project (`node:test` and `viem`)

This project showcases a Hardhat 3 Beta project using the native Node.js test runner (`node:test`) and the `viem` library for Ethereum interactions.

To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3). To share your feedback, join our [Hardhat 3 Beta](https://hardhat.org/hardhat3-beta-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new) in our GitHub issue tracker.

## Project Overview

This example project includes:

- A simple Hardhat configuration file.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using [`node:test`](nodejs.org/api/test.html), the new Node.js native test runner, and [`viem`](https://viem.sh/).
- Examples demonstrating how to connect to different types of networks, including local simulation and Sepolia deployment.

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
pnpm run test
```

You can also selectively run the Solidity or `node:test` tests:

```shell
pnpm hardhat test solidity
pnpm hardhat test nodejs
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
pnpm hardhat ignition deploy ignition/modules/TipPost.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
pnpm hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
pnpm hardhat ignition deploy --network sepolia ignition/modules/TipPost.ts
```

### Root deploy environment (.env)

Create a root `.env` file and set these values before deploying:

```dotenv
# You can get free test ETH from faucets like Alchemy, Infura, or QuickNode.
# To get the URL, sign up for a provider (Alchemy or Infura) and create a Sepolia API endpoint/key.
SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/your-key"

# They key from your wallet (e.g. MetaMask)
SEPOLIA_PRIVATE_KEY="your-wallet-private-key-without-0x"

# To get this, Go to Etherscan.io, sign in, and create a new API key token.
ETHERSCAN_API_KEY="your-etherscan-api-key"
```

## Frontend (React + wagmi + shadcn)

The repository now includes a React frontend in the frontend folder.

### Frontend environment

Use the root `.env` file for frontend values as well. Set:

- VITE_CONTRACT_ADDRESS: deployed TipPost address
- VITE_CHAIN_ID: target chain ID (Sepolia is 11155111)
- VITE_SEPOLIA_RPC_URL: Sepolia RPC URL

### Frontend local development

From repository root:

```shell
pnpm run frontend:dev
```

### Frontend production build

From repository root:

```shell
pnpm run frontend:build
```

### Vercel deployment

Use these Vercel settings:

- Root Directory: frontend
- Build Command: pnpm run build
- Output Directory: dist

Set these Vercel environment variables:

- VITE_CONTRACT_ADDRESS
- VITE_CHAIN_ID
- VITE_SEPOLIA_RPC_URL

### Docker + Cloudflared deployment

This repository includes:

- [docker-compose.yml](docker-compose.yml): runs the frontend and cloudflared proxy
- [frontend/Dockerfile](frontend/Dockerfile): builds the frontend and serves it with nginx
- [frontend/nginx.conf](frontend/nginx.conf): SPA routing + health endpoint

Before starting, ensure your variables are set in the root `.env` file. This compose setup uses
token-based tunnels, so `CLOUDFLARED_TUNNEL_TOKEN` is required. See more information about
tunneling with `cloudflared` [here](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).

For Docker builds, set these variables in the root `.env` file (used as compose build args):

- VITE_CONTRACT_ADDRESS
- VITE_CHAIN_ID
- VITE_SEPOLIA_RPC_URL

Run:

```shell
docker compose up --build -d
```

To stop:

```shell
docker compose down
```

## Contract

Deployed contract here: [https://sepolia.etherscan.io/address/0x9116fd59e673F1C10cE9030A31B96699Fff7ea85](https://sepolia.etherscan.io/address/0x9116fd59e673F1C10cE9030A31B96699Fff7ea85)

Address on Sepolia: `0x9116fd59e673F1C10cE9030A31B96699Fff7ea85`

Sample deployment URL: N/A
