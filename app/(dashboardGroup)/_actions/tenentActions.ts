"use server"

import { cookies } from "next/headers"

// const cookieStore = await cookies()
// const accessToken = cookieStore.get("accessToken")?.value || ""

// const cookieStore = await cookies()
// const accessToken =  cookieStore.get("accessToken")?.value || ""

export async function requestForRent (propertyId : string){
    const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
    const result = await fetch(`${process.env.BACKEND_URL}/api/rentals`,{
        method: "POST",
        headers:{
            Cookie : `accessToken=${accessToken}`,
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({propertyId})
    }
)
    const data = await result.json()
    console.log("tenent",data)
    return data
}



export async function isApplied (propertyId : string){
    const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
    const result = await fetch(`${process.env.BACKEND_URL}/api/rentals/isApplied`,{
        method: "POST",
        headers:{
            Cookie : `accessToken=${accessToken}`,
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({propertyId})
    }
)
    const data = await result.json()
    
    return data
}


export async function getAllRequest (){
    const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
    const result = await fetch(`${process.env.BACKEND_URL}/api/rentals`,{
        method: "GET",
        headers:{
            Cookie : `accessToken=${accessToken}`,
             
        },
        
    }
)
    const data = await result.json()
    
    return data
}