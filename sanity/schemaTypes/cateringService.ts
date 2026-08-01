import { defineField, defineType } from "sanity";
export const cateringService = defineType({ name:"cateringService", title:"Catering Services", type:"document", fields:[
  defineField({name:"title",title:"Title",type:"string",validation:r=>r.required()}), defineField({name:"slug",title:"Slug",type:"slug",options:{source:"title"}}),
  defineField({name:"summary",title:"Summary",type:"text"}), defineField({name:"formUrl",title:"Typeform URL",type:"url"}),
  defineField({name:"featured",title:"Featured",type:"boolean"}), defineField({name:"image",title:"Image",type:"image",options:{hotspot:true}}),
]});
