"use server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
export async function loginAction (prevState : {email: string, password: string},formData : FormData){
    const email = formData.get("email") 
    const password = formData.get("password") 
    

    const accessToken = await fetch(`${process.env.BACKEND_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    const result = await accessToken.json()

    const decode = jwt.decode(result.data.accessToken)
    console.log("accesstoken",result,decode)

    const cookieStore = cookies()
    if(result.success && result.data.accssToken){
        (await cookieStore).set("accessToken",result.data.accssToken,{
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        }
 )
    }
}