export async function getPropertyById (id: string) {
    const result = await fetch(`${process.env.BACKEND_URL}/api/properties/${id}`)
    const property = await result.json()
    return property
}