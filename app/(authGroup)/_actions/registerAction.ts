"use server"
import { registerPrvStateType } from "@/types/types"

export async function registerAction (prevState: registerPrvStateType, formData:FormData){

    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role")
    }
    const result = await fetch(`${process.env.BACKEND_URL}/api/auth/register`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    const data = await result.json()
    return {
        success: data.success,
        message: data.message
    }
}