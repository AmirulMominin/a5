/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken"




const verifyToken = (token: string, secret: string) =>{
    try {
        const verifiedUser = jwt.verify(token, secret)
        return {
            success: true,
            data: verifiedUser
        }
    } catch (error: any) {

       return {
        success: false,
        error: error.message
       }
    }
}

export const utilsJwt = {

    verifyToken
}