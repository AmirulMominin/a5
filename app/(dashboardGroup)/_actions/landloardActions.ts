
"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
const cookieStore = await cookies()
const accessToken =  cookieStore.get("accessToken")?.value || ""
console.log("accessToken from landloard", accessToken)
const categoryIdObject = {
    "FLAT" : "4be5d085-9555-4301-b909-4a661d12c89f",
    "HOUSE" : "1fb450e0-5efc-4200-b565-23922048d4d5",
    "PLOT" : "d17fcef8-681e-40b7-88a5-08dff7b2ce67"

}
export async function getProperty(){
//     const cookieStore = await cookies()
//     const accessToken =  cookieStore.get("accessToken")?.value || ""
// console.log("accessToken from landloard", accessToken)
   
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

//    "name" : "18 katha plot",
//     "rent": 905888,
//     "details": "Banani exclusive plot",
//     "categoryId" : "d17fcef8-681e-40b7-88a5-08dff7b2ce67",
//     "type": "PLOT",
//     "location": "Banani",
//     "image" : "https://images.pexels.com/photos/28463539/pexels-photo-28463539.jpeg"

export async function createNewProperty(prevState, formData: FormData){
    let categoryId
    const type =  formData.get("type")
    if(type === "PLOT"){
        categoryId = categoryIdObject.PLOT
    }else if(type === "HOUSE"){
        categoryId = categoryIdObject.HOUSE
    }
    else if(type === "FLAT"){
        categoryId = categoryIdObject.FLAT
    }
    const payload = {
        name: formData.get("name"),
        details: formData.get("description"),
        rent: formData.get("rent"),
        type: type,
        location: formData.get("location"),
        image: formData.get("image") ,
        categoryId
        
    }
    console.log(payload)

    const data = await fetch(`${process.env.BACKEND_URL}/api/landlord/properties`,{
        method: "POST",
        headers:{
        'Content-Type': 'application/json',
        Cookie : `accessToken=${accessToken}`
        },
        body: JSON.stringify(payload)
    })
    const result =  await data.json()
    if(result.success){
        revalidatePath("/landloard/properties");
    }
    return {
        success : result.success,
        message: result.message
    }
}



export async function updateProperty(propertyId,prevState, formData: FormData){
    let categoryId
    const type =  formData.get("type")
    if(type === "PLOT"){
        categoryId = categoryIdObject.PLOT
    }else if(type === "HOUSE"){
        categoryId = categoryIdObject.HOUSE
    }
    else if(type === "FLAT"){
        categoryId = categoryIdObject.FLAT
    }
    const payload = {
        name: formData.get("name") || "",
        details: formData.get("description") || "",
        rent: formData.get("rent") || "",
        type: type,
        location: formData.get("location") || "",
        image: formData.get("image") || "" ,
        categoryId
        
    }
    console.log(payload)

    const data = await fetch(`${process.env.BACKEND_URL}/api/landlord/properties/${propertyId}`,{
        method: "PUT",
        headers:{
        'Content-Type': 'application/json',
        Cookie : `accessToken=${accessToken}`
        },
        body: JSON.stringify(payload)
    })
    const result =  await data.json()
    if(result.success){
        revalidatePath("/landloard/properties");
    }
    return {
        success : result.success,
        message: result.message
    }
}


export  async function deleteProperty(propertyId: string){
  const data = await fetch(`${process.env.BACKEND_URL}/api/landlord/properties/${propertyId}`,{
        method: "DELETE",
        headers:{
        Cookie : `accessToken=${accessToken}`
        }
        
    }) 
    const result = await data.json()
    if(result.success){
        revalidatePath("/landloard/properties");
    }
    return result.success
}

export async function getAllRequests() {
    const result =await fetch(`${process.env.BACKEND_URL}/api/landlord/properties/requests`,{
        method: "GET",
        headers:{
            
        Cookie : `accessToken=${accessToken}`
        },
        
    }) 
        const data = await result.json()
        return data
}


export async function requestsDecision(status: string, propertyId: string) {
    const result =await fetch(`${process.env.BACKEND_URL}/api/landlord/properties/requests/${propertyId}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json',
        Cookie : `accessToken=${accessToken}`
        },
        body: JSON.stringify({status})
    }) 
        revalidatePath('/landloard/requests')
        const data = await result.json()
        return data
}