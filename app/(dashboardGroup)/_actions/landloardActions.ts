
"use server"
import { cookies } from "next/headers"
// const cookieStore = await cookies()
// const accessToken =  cookieStore.get("accessToken") || ""
// console.log("accessToken from landloard", accessToken)
export async function getProperty(){
    const cookieStore = await cookies()
    const accessToken =  cookieStore.get("accessToken")?.value || ""
console.log("accessToken from landloard", accessToken)
    if(!accessToken){
        return {
            success: false,
            message: "No user logged in"
        }
    }
    const result = await fetch(`${process.env.BACKEND_URL}/api/landlord/properties/`,{
        method: "GET",
        headers: {
          Cookie : `accessToken=${accessToken}`
        },
    })
    const properties = await result.json()
    return properties 
}
