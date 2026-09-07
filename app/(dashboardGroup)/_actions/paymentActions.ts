"use server"

import { cookies } from "next/headers"



export async function create (rentalId : string){
    const cookieStore = await cookies()
    const accessToken =  cookieStore.get("accessToken")?.value || ""
    const data = await fetch(`${process.env.BACKEND_URL}/api/payments/create`,{
        method: "POST",
        headers:{
        'Content-Type': 'application/json',
        Cookie : `accessToken=${accessToken}`
        },
        body: JSON.stringify({rentalId})
    })
    const result = await data.json()
    console.log("19", result)
    return result.data.paymentUrl
}