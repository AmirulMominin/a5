"use server"

import { revalidatePath } from "next/cache"
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

export async function banUnban (uid:string, data:string){
    let status
    if(data === "BANNED"){
        status = "BANNED"
    }else(
        status = "ACTIVE"
    )
    const cookieStore = await cookies()
    const accessToken =  cookieStore.get("accessToken")?.value || ""
    const users = await fetch(`${process.env.BACKEND_URL}/api/admin/users/${uid}`,{
        method: "PATCH",
        headers:{
        
        Cookie : `accessToken=${accessToken}`,
    'Content-Type': 'application/json',  
        },
        body: JSON.stringify({status})
})
const user = await users.json()
if(user.success){
    revalidatePath("/dashboard/admin/users");
}
return user

}

