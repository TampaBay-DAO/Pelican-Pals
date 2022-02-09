
export type SolanaRequest = {
    id: number
    jsonrpc: "2.0"
    method: SolanaMethod,
    params: Array<any>
}


//expand as we add new api methods
export type SolanaMethod = "getTransaction" | "getTokenAccountsByOwner"

export type SolanaResponse = {
    data: {
        id: number
        jsonrpc: "2.0"
        result: {}
    }

}

export type SolanaTransaction = SolanaResponse &
{
    data: {
        result: {
            meta: {
                postTokenBalances: [
                    {mint: string}
                ]
            }
        }
    }
}

export type SolanaTokenData = SolanaResponse &
{
    data: {
        result: {
            value: [
                {
                    pubkey: string
                }
            ]
        }
    }
}

export type TokenIndex ={
    data: {
        tokens: Array<{address: string, uri: string}>
    }
}

export type TokenMetaData = {
    data : {
        data : {
            metadata : {
                data : {
                    uri: string
                }
            }
        }
    }
}

export type TokenImageData = {
    data : {
        image: string
    }
}
