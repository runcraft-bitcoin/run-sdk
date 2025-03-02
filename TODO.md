
I used this by commenting/uncommenting each trust to test it for now, but we need to add them as proper tests

```js
// dist/test.js
const Run = require('./run.node.js')

const log = console.log

async function main() {
    let run = new Run({
        network: 'mock',
        // with no trust, it used to fail, now it works
        // trust: ['state'],        // work
        // trust: ['*', 'state'],   // work
        // trust: "state",          // work
        // trust: 'cache',          // work // deprecated
        // trust: ['cache'],        // work // deprecated
        // trust: ['*'],            // work (previous fail)
        // trust: '*',              // work (previous fail)
        // trust: [],               // fail
        // trust: "lol",            // fail
    })
    let balance = await run.purse.balance()
    log("balance:", balance)

    class Dollar extends Token { }
    Dollar.decimals = 2
    Dollar.currency = 'USD'
    run.deploy(Dollar)
    // await run.sync()
    log("Dollar:", Dollar)

    let coin = Dollar.mint(100000)
    await coin.sync()
    log("coin:", coin)
    log("Dollar:", coin.constructor)
}

main()
```