"use server"
export async function getAllProperties () {
    const result = await fetch(`${process.env.BACKEND_URL}/api/properties/`,{
        method : "GET"
    })
    const properties = await result.json()
    return properties
}