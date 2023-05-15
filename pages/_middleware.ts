import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { SecurePaths, UnsecurePaths } from "./data/paths";

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  const isLoggedIn = false;
  const { pathname, origin }: any = req.nextUrl
  const login = `${origin}${UnsecurePaths.login}`;
  // console.log(Object.values(SecurePaths).some((r: any)=> Object.values(SecurePaths).includes(r)))
  NextResponse.next()
  // if (Object.values(UnsecurePaths).includes(pathname)) {
  //   if (isLoggedIn) {
  //     try {
  //       return NextResponse.redirect(`${origin}${SecurePaths.dashboard}`)
  //     } catch (e) {
  //       return NextResponse.redirect(login)
  //     }
  //   }
  // }

  // if (Object.values(SecurePaths).includes(pathname)) {
  //   if (!isLoggedIn) {
  //     return NextResponse.redirect(login)
  //   } 
  //   try {
  //     return NextResponse.next()
  //   } catch (e) {
  //     return NextResponse.redirect(login)
  //   }
  // }
  // return NextResponse.next()
}
