# exp-proxy

Expanse mining proxy with web-interface.

**Proxy feature list:**

* Rigs availability monitoring
* Keep track of accepts, rejects, blocks stats
* Easy detection of sick rigs
* Daemon failover list

### Setup Instructions in README.text or scroll down for build instructions.

![Demo](https://cloud.githubusercontent.com/assets/4833541/10272128/9efc7310-6b66-11e5-868c-4b983a4de891.jpg)

### Installation

Dependencies:

  * go >= 1.4
  * gexp

GOPATH:
 * mkdir /home/user/gosrc
  * Run and Add to your .bashrc
  * export GOPATH=/home/user/gosrc

Install required packages:

    go get github.com/nrpatten/ethash
    go get github.com/expanse-project/go-expanse/common
    go get github.com/goji/httpauth
    go get github.com/gorilla/mux
    go get github.com/yvasiyarov/gorelic

Compile:

    go build -o ether-proxy main.go

### Configuration

Configuration is self-describing, just copy *config.example.json* to *config.json* and specify endpoint URL and upstream URLs.

#### Running

    ./ether-proxy config.json

#### Mining

    ethminer -F http://x.x.x.x:3333/miner/5/gpu-rig -G
    ethminer -F http://x.x.x.x:3333/miner/0.1/cpu-rig -C

### TODO

**Currently it's solo-only solution.**

* Report block numbers
* Report average luck
* Report luck per rig
* Add support for pools
* ~~Maybe add more stats~~
* Maybe add charts

### Donations

* **ETH**: [0xb85150eb365e7df0941f0cf08235f987ba91506a](https://etherchain.org/account/0xb85150eb365e7df0941f0cf08235f987ba91506a)

* **BTC**: [1PYqZATFuYAKS65dbzrGhkrvoN9au7WBj8](https://blockchain.info/address/1PYqZATFuYAKS65dbzrGhkrvoN9au7WBj8)

### License

The MIT License (MIT).
