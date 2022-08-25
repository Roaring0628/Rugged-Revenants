import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
console.log("API_URL", API_URL)
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default {
    async baseApi(subUrl, method, jsonData, cb) {
        const startTime = Date.now()
        try {
            const request = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL + subUrl}`,
            data: jsonData,
            };
            
            axios(request)
            .then((response) => {
                console.log(`API[${method}] ${subUrl} - ${Date.now() - startTime} (1)`)
                if(cb)
                cb(null, response.data);
            })
            .catch((error) => {
                console.log(`API[${method}] ${subUrl} - ${Date.now() - startTime} (2)`)
                if(cb)
                cb(error, null);
            });
        } catch (error) {
            console.log(`API[${method}] ${subUrl} - ${Date.now() - startTime} (3)`)
            if(cb)
            cb(error);
        }
    },
    getRuggedAccount(account, cb){
        this.baseApi('/players?player_account=' + account, 'GET', {}, cb)
    },
    addRuggedAccount(data, cb){
        this.baseApi('/players', 'POST', data, cb)
    },
    getRugTokenAccount(account, cb){
        this.baseApi('/rug-token-accounts', 'GET', {player_account: account}, cb)
    },
    addRugTokenAccount(data, cb){
        this.baseApi('/rug-token-accounts', 'POST', data, cb)
    },
    getUpgradeTasks(cb){
        this.baseApi('/upgrade-tasks', 'GET', {}, cb)
    },
    async mintNft(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/mintNft', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async mintGenesisNft(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/mintGenesisNft', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async mintLootboxNft(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/mintLootboxNft', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async updateNftMeta(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/updateNftMeta', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async updateNftMetaData(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/updateNftMetaData', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async updatePlayableNftMeta(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/updatePlayableNftMeta', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async transferPremiumNft(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/transferPremiumNft', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async getOrCreateAssociatedTokenAccount(key){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/getOrCreateAssociatedTokenAccount', 'POST', {key}, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async getOrCreateAssociatedBurnTokenAccount(key){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/getOrCreateAssociatedBurnTokenAccount', 'POST', {key}, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async unstake(playerAccount, tokenAccount){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/unstake', 'POST', {playerAccount, tokenAccount}, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async getRuggedWhitelistAuthorities(){
        return new Promise((resolve, reject)=>{
            this.baseApi('/rugged-whitelists?type=simple', 'GET', {}, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async getRuggedWhitelist(){
        return new Promise((resolve, reject)=>{
            this.baseApi('/rugged-whitelists', 'GET', {}, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async filterRuggedWhitelist(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/rugged-whitelists/filter', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async openLootBox(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/openLootBox', 'POST', data, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },
    async getGlobalSetting(){
        return new Promise((resolve, reject)=>{
            this.baseApi('/setting', 'GET', {}, (err, ret)=>{
                if(err) {
                    reject()
                } else {
                    resolve(ret)
                }
            })
        })
    },

    get1KinUrl(url) {
        if(url.startsWith('https://ipfs.infura.io/')) {
            return url.replace('https://ipfs.infura.io/', 'https://1kin.mypinata.cloud/')
        } else {
            return url
        }
    },

    randomString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}