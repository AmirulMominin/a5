"use server"
export async function getAllProperties (t: string) {
    
    const result = await fetch(`${process.env.BACKEND_URL}/api/properties/?searchTerm=${t}`,{
        method : "GET"
    })
    const properties = await result.json()
    return properties
}