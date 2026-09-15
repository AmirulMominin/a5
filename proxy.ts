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
    }else if(userRole === "AUTHOR"){
        return NextResponse.redirect(new URL('/authorDashboard', request.url))
    }else if(userRole === "USER"){
        return NextResponse.redirect(new URL('/Dashboard', request.url))
    }else{
        return NextResponse.redirect(new URL('/', request.url))
    }
}
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)']
}