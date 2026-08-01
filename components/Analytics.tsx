"use client";
import Script from "next/script";
import { useEffect } from "react";

declare global { interface Window { dataLayer?:unknown[]; gtag?:(...args:unknown[])=>void } }

export default function Analytics(){const id=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;useEffect(()=>{if(!id)return;const track=(event:MouseEvent)=>{const anchor=(event.target as Element)?.closest?.("a") as HTMLAnchorElement|null;if(!anchor)return;const href=anchor.href;let name="outbound_click";if(href.startsWith("tel:"))name="phone_call";else if(href.includes("opentable.com"))name="reservation_click";else if(href.includes("typeform.com"))name="catering_lead";else if(href.includes("/order"))name="order_click";window.gtag?.("event",name,{link_url:href,link_text:anchor.textContent?.trim()});};document.addEventListener("click",track);return()=>document.removeEventListener("click",track);},[id]);if(!id)return null;return <><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}</Script></>}
