# RUN SDK - 0.6.43 beta

[![tests](https://github.com/runcraft-bitcoin/run-sdk/workflows/tests/badge.svg)](https://github.com/runcraft-bitcoin/run-sdk/actions) [![codecov](https://codecov.io/gh/runcraft-bitcoin/run-sdk/branch/master/graph/badge.svg?token=VPXTBV9CQP)](https://codecov.io/gh/runcraft-bitcoin/run-sdk/)

**Note: This project is only lightly supported with limited ressources for now by the team at https://runcraft.io. Feel free to contribute.**


RUN is a token protocol to build whatever you dream up. A world of interactive apps and tokens.

To give it a go, visit https://wiki.runcraft.io/ for tutorials and docs.

## Versions and migrations

### version 0.6.43b

- upgrade most of dependencies
- upgrade to chai 5.1.2 by using a wrapper (chai went full esm after v5)
- upgrade to node v20

### version 0.6.42

- removes support for Run Connect API which was configured as default and got deprecated. It was replaced with the whatsonchain API as default, be aware that they have rate limits.

**migration guide:** this means you cannot pass "run" as the api config anymore, or you will get an error. Instead you can just remove it to use the default, pass "whatsonchain" or use a custom api of your own.

## Installation

We recommend using `nvm` to have the proper node version. Run-SDK requires Node 16 or higher.
Check with `node --version`, and for example switch with `nvm use 16.20.2`.

Run `npm install` to install node dependencies.

Then run `npm run build` to build the browser and node libraries.

## Community

Join us in our Telegram at https://t.me/+sow9kFf8f4Y4ZTg0. Here you'll meet other developers using Run, hear about cool projects launching, and know right away when there are new announcements.

## Getting Help

Post what's on your mind in the telegram channel.

## Commands

- `npm run lint` - Lint and automatically fix errors
- `npm run build` - Build outputs
- `npm run test` - Test library quickly
- `npm run test:node` - Test the minified node build
- `npm run test:browser` - Test the minified browser build (Chrome default)
- `npm run test:cover` - Collect code coverage
- `npm run test test/plugins/local-purse.js` - Run just the purse tests

## Configuring the tests

Various environment variables may be used to configure the tests:

| Name              | Description                                     | Possible Values                                | Default     |
|-------------------|-------------------------------------------------|------------------------------------------------|-------------|
| `NETWORK`         | Network to test on                              | `mock`, `main`, `test`, `stn`                  | `mock`      |
| `BROWSER`         | Browser used for testing                        | `chrome`, `firefox`, `safari`, `MicrosoftEdge` | `chrome`    |
| `STRESS`          | Whether to run the stress tests                 | `true`, `false`                                | `false`     |
| `PURSE_[network]` | Purse key used on a specific network            | your string privkey                            | `undefined` |
| `API`             | Blockchain API when not using the mock network  | `whatsonchain`                          | `undefined` |
| `APIKEY_[api]`    | API key used with a specific blockchain API     | your string api key                            | `undefined` |
| `LOGGER`          | Whether to log internal messages to the console | `true`, `false`                                | `false`     |

### Examples

- `env BROWSER=safari npm run test:browser` - Test the browser build on Safari
- `env STRESS=1 npm run test` - Test library with stress tests
- `env NETWORK=test env PURSE=<funded_private_key> npm run test` - Run all tests on testnet

### .env file

For ease of use, you may also store these variables in a `.env` file where the tests are run. Here's a sample:

```
BROWSER=safari
PURSE_MAIN=<your priate key>
PURSE_TEST=<your private key>
APIKEY_WHATSONCHAIN=<your api key>
```
