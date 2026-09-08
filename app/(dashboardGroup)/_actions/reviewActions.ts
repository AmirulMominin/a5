"use server"

import { cookies } from "next/headers"



export async function reviewAction (rentalId:string, propertyId:string,prevState,formData : FormData){
    const cookieStore = await cookies()
    const accessToken =  cookieStore.get("accessToken")?.value || ""

    console.log("line 11",rentalId, propertyId)
    const payload = {
        rentalId : rentalId,
        propertyId: propertyId,
        rating : Number(formData.get("rating")),
        review : formData.get("review"),
    }
    console.log(payload)
    const result = await fetch(`${process.env.BACKEND_URL}/api/review`,{
        method: "POST",
        headers:{
        'Content-Type': 'application/json',
        Cookie : `accessToken=${accessToken}`
        },
        body: JSON.stringify(payload)
    })
    return result.json()
}