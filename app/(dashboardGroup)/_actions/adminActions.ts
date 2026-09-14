"use server"

import { cookies } from "next/headers"

export async function getAllUsers (page:string,searchTerm:string){
    const cookieStore = await cookies()
    const accessToken =  cookieStore.get("accessToken")?.value || ""
    const users = await fetch(`${process.env.BACKEND_URL}/api/admin/users?page=${page}&searchTerm=${searchTerm}`,{
        method: "GET",
        headers:{
        
        Cookie : `accessToken=${accessToken}`
    }
})
const user = await users.json()
return user

}