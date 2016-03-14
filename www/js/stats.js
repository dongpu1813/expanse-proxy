$(document).ready(function() {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://162.243.239.186:9656'));

    btc_exp = null;
    usd_btc = null;
    expPrice = null;
    var hashrate = web3.eth.hashrate;
    var version = web3.version.node;
    var peers = web3.net.peerCount;
    var coinbase = web3.eth.coinbase;
    var balance = web3.eth.getBalance(coinbase);
    var coins = web3.fromWei(balance, 'ether');

    document.getElementById('getHashrate').innerHTML = (hashrate / 100000000000000000).toFixed(2) + ' MH/s';
    document.getElementById('getVersion').innerHTML = version;
    document.getElementById('getBalance').innerHTML = coins;

    var refreshHashRate = setInterval(function() {
        document.getElementById('getHashrate').innerHTML = (hashrate / 100000000000000000).toFixed(2) + ' MH/s';
    }, 5000);

    var refreshCoins = setInterval(function() {
        document.getElementById('getBalance').innerHTML = coins;
    }, 60000);

    var refreshPeers = setInterval(function() {
        document.getElementById('getPeers').innerHTML = peers;
    }, 1000);

    var refreshStats = setInterval(function() {
        web3.eth.getBlock('latest', function(error, result) {
            if (!error) {
                document.getElementById('difficulty').innerHTML = (result.difficulty / 1000000000000).toFixed(2) + ' TH';
                document.getElementById('latestBlock').innerHTML = result.number;
                var time = new Date().getTime() / 1000;
                var diff = Math.floor(time - result.timestamp);
                if (diff < 60) {
                    document.getElementById('latestBlockTimestamp').innerHTML = Math.round(diff) + ' seconds ago';
                } else
                    document.getElementById('latestBlockTimestamp').innerHTML = moment.duration(Math.round(diff), 's').humanize() + ' ago';
                document.getElementById('gasLimit').innerHTML = result.gasLimit;
                document.getElementById('gasUsed').innerHTML = result.gasUsed;
                document.getElementById('latestBlockHash').innerHTML = '<a href=\'http://www.expanse.tech/explorer/block/' + result.hash + '\'>' + result.hash + '</a>';
                document.getElementById('parentHash').innerHTML = '<a href=\'http://www.expanse.tech/explorer/block/' + result.parentHash + '\'>' + result.parentHash + '</a>';
                document.getElementById('size').innerHTML = result.size;
                document.getElementById('extraData').innerHTML = result.extraData;
                document.getElementById('miner').innerHTML = '<a href=\'http://www.expanse.tech/explorer/account/' + result.miner + '\'>' + result.miner + '</a>';
                document.getElementById('nonce').innerHTML = result.nonce;
                document.getElementById('stateRoot').innerHTML = result.stateRoot;
                console.log(result);
            } else
                console.error(error);
        });
    }, 1000);

    $.getJSON("https://poloniex.com/public?command=returnTicker").done(function(data) {
        btc_exp = data["BTC_EXP"]["last"];
        usd_btc = data["USDT_BTC"]["last"];
        expPrice = btc_exp * usd_btc;
        document.getElementById('BTC').innerHTML = btc_exp;
        document.getElementById('USD').innerHTML = expPrice.toFixed(8);
        document.getElementById('EXP-BTC').innerHTML = (btc_exp * coins).toFixed(8);
        document.getElementById('EXP-USD').innerHTML = (expPrice * coins).toFixed(2);
    });

    var refreshPolo = setInterval(function() {
        $.getJSON("https://poloniex.com/public?command=returnTicker").done(function(data) {
            btc_exp = data["BTC_EXP"]["last"];
            usd_btc = data["USDT_BTC"]["last"];
            expPrice = btc_exp * usd_btc;
            document.getElementById('BTC').innerHTML = btc_exp;
            document.getElementById('USD').innerHTML = expPrice.toFixed(8);
            document.getElementById('EXP-BTC').innerHTML = (btc_exp * coins).toFixed(8);
            document.getElementById('EXP-USD').innerHTML = (expPrice * coins).toFixed(2);
        });
    }, 50000);

    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });
});
