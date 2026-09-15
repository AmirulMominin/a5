import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { utilsJwt } from "./service/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function proxy(request: NextRequest) {
const AUTH_ROUTE = ['/login', '/registration']
const PUBLIC_ROUTE = ['/', '/properties','/login', '/registration']
const cookieStore = await cookies()
const  accessToken = request.cookies.get("accessToken")?.value as string
const decodedUser = accessToken ? utilsJwt.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) : null
console.log(decodedUser, "I am here")
const pathname = request.nextUrl.pathname
let userRole = null
if(decodedUser?.success && decodedUser.data){
    userRole = (decodedUser.data as JwtPayload).role
}
console.log("l18",userRole)
if(decodedUser?.success && AUTH_ROUTE.includes(pathname)){
    if(userRole === "Admin"){
        return NextResponse.redirect(new URL('/dashboard/admin', request.url))
    }else if(userRole === "Landlord"){
        return NextResponse.redirect(new URL('/dashboard/landloard', request.url))
    }else if(userRole === "Tenant"){
        return NextResponse.redirect(new URL('/dashboard/tenant', request.url))
    }else{
        return NextResponse.redirect(new URL('/', request.url))
    }
}

 if (pathname.startsWith('/dashboard/admin') && userRole !== "Admin"){
        return NextResponse.redirect(new URL('/not-found', request.url))
}else if (pathname.startsWith('/dashboard/tenant') && userRole !== "Tenant" ){
        return NextResponse.redirect(new URL('/not-found', request.url))
}else if (pathname.startsWith('/dashboard/landloard') && userRole !== "Landlord" ){
        return NextResponse.redirect(new URL('/not-found', request.url))
}


}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)']
}