import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { siteUrl } from "@/lib/seo";

export async function POST(request:NextRequest){
  if(!process.env.SANITY_WEBHOOK_SECRET||request.headers.get("authorization")!==`Bearer ${process.env.SANITY_WEBHOOK_SECRET}`)return Response.json({success:false,error:"Unauthorized"},{status:401});
  const body=await request.json().catch(()=>({})) as {_type?:string;slug?:{current?:string}};
  const route=body._type==="blogPost"&&body.slug?.current?`/blog/${body.slug.current}`:body._type==="event"&&body.slug?.current?`/events/${body.slug.current}`:"/";
  revalidatePath(route);revalidatePath("/sitemap.xml");if(body._type==="event")revalidatePath("/events");if(body._type==="blogPost")revalidatePath("/blog");
  const key=process.env.INDEXNOW_KEY;
  if(key){await fetch("https://api.indexnow.org/indexnow",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({host:new URL(siteUrl).host,key,keyLocation:`${siteUrl}/api/indexnow-key`,urlList:[`${siteUrl}${route}`,`${siteUrl}${body._type==="event"?"/events":"/blog"}`]})});}
  return Response.json({success:true,revalidated:route,indexNow:Boolean(key)});
}
