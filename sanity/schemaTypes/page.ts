import { defineField, defineType } from "sanity";
export const page = defineType({ name:"page", title:"Pages", type:"document", fields:[
  defineField({name:"title",title:"Title",type:"string",validation:r=>r.required()}), defineField({name:"slug",title:"Slug",type:"slug",options:{source:"title"},validation:r=>r.required()}),
  defineField({name:"eyebrow",title:"Eyebrow",type:"string"}), defineField({name:"intro",title:"Introduction",type:"text"}),
  defineField({name:"body",title:"Body",type:"array",of:[{type:"block"},{type:"image",options:{hotspot:true}}]}),
  defineField({name:"seo",title:"SEO",type:"object",fields:[{name:"title",type:"string"},{name:"description",type:"text",rows:3},{name:"image",type:"image"},{name:"noIndex",type:"boolean"}]}),
  defineField({name:"lastReviewedAt",title:"Last reviewed",type:"datetime"}),
]});
