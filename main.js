const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, data, timestamp, previousHash){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("block mined: " + this.hash)
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
    }

    createGenesisBlock(){
        return new Block(0, '01/01/20', 'genesis block', '0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    isChainValid(){
        for( let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false
            }
        }
        return true
    }
}



let azCoin = new BlockChain()

console.log("mining block 1...")
azCoin.addBlock(new Block(1, "1/2/17", {amount: 5}))

console.log("mining block 2...")
azCoin.addBlock(new Block(2, "1/4/17", {amount: 10}))

// console.log("is blockchain valid?" + " " + azCoin.isChainValid())


// azCoin.chain[1].data = {amount: 100}
// azCoin.chain[1].hash = azCoin.chain[1].calculateHash()

// console.log("is blockchain valid?" + " " + azCoin.isChainValid())
// console.log(JSON.stringify(azCoin, null, 4))
