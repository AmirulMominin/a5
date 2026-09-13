"use server"

import { cookies } from "next/headers"

export async function getAllUsers (){
    const cookieStore = await cookies()
    const accessToken =  cookieStore.get("accessToken")?.value || ""
    const users = await fetch(`${process.env.BACKEND_URL}/api/admin/users`,{
        method: "GET",
        headers:{
        
        Cookie : `accessToken=${accessToken}`
    }
})
const user = await users.json()
return user

}