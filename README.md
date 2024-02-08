# Example Token Bridge UI

This repository is a fork of Wormhole's [example Token Bridge
UI](https://wormhole-foundation.github.io/example-token-bridge-ui/). Support for
Base Sepolia, Optimism Sepolia and Arbitrum Sepolia was added.

Deployed code can be used to attest/register tokens on L2 chains (when deloyed
locally, this can be done from http://localhost:3000/#/register) and to bridge
tokens between chains (http://localhost:3000/#/transfer).

## Local deploy:

To deploy locally, execute:

```bash
nvm use 18
npm ci
npm start
```

## Deploy using `serve`:

To deploy using `serve` as a static server, execute:

```bash
nvm use 18
npm ci
npm run build
serve -s build -l 4000
```

