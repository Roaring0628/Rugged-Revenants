import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
console.log("API_URL", API_URL)

export default {
    async baseApi(subUrl, method, jsonData, cb) {
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
                if(cb)
                cb(null, response.data);
            })
            .catch((error) => {
                if(cb)
                cb(error, null);
            });
        } catch (error) {
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
    async mintRugToken(data){
        return new Promise((resolve, reject)=>{
            this.baseApi('/players/mintRugToken', 'POST', data, (err, ret)=>{
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
}