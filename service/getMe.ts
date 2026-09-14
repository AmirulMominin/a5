"use server"
import { cookies } from "next/headers"

export const getMe = async()=>{
    
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || null
  
    if(!accessToken){
        return {
            success: false,
            message: "No logged in user found"
        }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/me`,{
        headers:{
            Cookie : `accessToken=${accessToken}`
        }
    })
    const result = await res.json()
   
    return result
}