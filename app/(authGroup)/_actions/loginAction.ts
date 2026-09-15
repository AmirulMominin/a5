"use server"
import { registerPrvStateType } from "@/types/types"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
export async function loginAction (prevState : registerPrvStateType,formData : FormData){
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

    const decode = jwt.decode(result.data.accessToken) as JwtPayload
    console.log("accesstoken from auth",result.data.accessToken)

    const cookieStore = await cookies()
    if(result.success && result.data.accessToken){
        cookieStore.set("accessToken",result.data.accessToken,{
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        }
 )
    }
    if(decode.role === "Admin"){
        redirect('/dashboard/admin')
    }else if (decode.role === "Landlord"){
        redirect('/dashboard/landloard')
    }
    else if (decode.role === "Tenant"){
        redirect('/dashboard/tenant')
    }else(
        redirect('/')
    )

    return {
        success: result.success,
        message: result.message
    }
}