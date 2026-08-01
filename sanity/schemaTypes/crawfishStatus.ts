import { defineField, defineType } from "sanity";
export const crawfishStatus = defineType({ name:"crawfishStatus", title:"Crawfish Status", type:"document", fields:[
  defineField({name:"status",title:"Status",type:"string",options:{list:["Available today","Call for availability","Sold out","Out of season"]},validation:r=>r.required()}),
  defineField({name:"message",title:"Customer message",type:"text"}),
  defineField({name:"startsAt",title:"Starts",type:"datetime"}), defineField({name:"endsAt",title:"Expires",type:"datetime"}),
]});
