import axios from "axios";

export const getUsersTokens = async (senderAddress) => {
        try{
            const usersTokens = await axios.post("http://localhost:3000/getUserTokens", {
                sender_address: senderAddress
                })
            return usersTokens;
        }
        catch(error){
            return error
        }
};

export const getTokenInformation = async (tokenAddress) => {
    try{
        const tokenInformation = await axios.post("http://localhost:3000/getTokenInformation", {
            token_address:tokenAddress
        })
        return tokenInformation;
    }
    catch(error){
        return error
    }
};

export const createToken = async (senderAddress,network,tokenAddress,tokenType) => {
        try{
            const res = await axios.post("http://localhost:3000/create", {
                sender_address: senderAddress,
                network: network,
                token_address: tokenAddress,
                token_type: tokenType,
            })
            return res;
        }
        catch(error){
            return error
        }
};
