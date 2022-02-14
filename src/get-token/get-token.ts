import axios from "axios"
import { SolanaRequest, SolanaTokenData, SolanaTransaction, TokenImageData, TokenIndex, TokenMetaData } from "./solana-types";


const solanaUrl = process.env.REACT_APP_SOLANA_RPC_HOST!;
const solscanUrl = process.env.REACT_APP_SOLSCAN_HOST!; 

const SolanaUtilities = {

    getTransaction : (txn: string) => {
        return axios.post<any, SolanaTransaction, SolanaRequest>(solanaUrl, {
            id: 1,
            jsonrpc: "2.0",
            method: "getTransaction",
            params: [
                txn
            ],
        });
    },

    getTokenAccountByOwner : (tokenId: string, walletKey: string) => {
        return axios.post<any, SolanaTokenData, SolanaRequest>(solanaUrl, {
            id: 1,
            jsonrpc: "2.0",
            method: "getTokenAccountsByOwner",
            params: [
                walletKey, 
                {
                    mint: tokenId
                },
                {
                    encoding: "jsonParsed"
                }
            ]
        })
    },

    getTokenId : (res: SolanaTransaction) => {
        return res.data.result.meta.postTokenBalances[0].mint;
    },

    getTokenUrl : (tokenId: string) => {
        return axios.get<any, TokenMetaData>(`${solscanUrl}/account?address=${tokenId}`);
    },

    getArweaveUrlOne : (url: string) => {
        return axios.get<any, TokenImageData>(url);
    },

    getTokenImageSourceUrl : (url: string) => {
        return axios.get<any, string>(url);
    },

    getFinalImageUrl : async (txn: string) => {
        let transactionInfo = await SolanaUtilities.getTransaction(txn) 
        while(transactionInfo.data.result === null) {
            transactionInfo = await SolanaUtilities.getTransaction(txn)
        }
        const tokenMetadata = await SolanaUtilities.getTokenUrl(transactionInfo.data.result.meta.postTokenBalances[0].mint);
        const arweaveUrlOne = await SolanaUtilities.getArweaveUrlOne(tokenMetadata.data.data.metadata.data.uri);

        return arweaveUrlOne.data.image;
    }
};


export default SolanaUtilities;