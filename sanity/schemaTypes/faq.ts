import { defineField, defineType } from "sanity";
export const faq = defineType({ name:"faq", title:"FAQs", type:"document", fields:[
  defineField({name:"question",title:"Question",type:"string",validation:r=>r.required()}), defineField({name:"answer",title:"Answer",type:"text",validation:r=>r.required()}),
  defineField({name:"category",title:"Category",type:"string"}), defineField({name:"order",title:"Display order",type:"number"}), defineField({name:"verifiedAt",title:"Last verified",type:"datetime"}),
]});
