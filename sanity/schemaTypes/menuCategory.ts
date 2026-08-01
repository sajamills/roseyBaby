import { defineField, defineType } from "sanity";
export const menuCategory = defineType({ name:"menuCategory", title:"Menu Categories", type:"document", fields:[
  defineField({name:"name",title:"Name",type:"string",validation:r=>r.required()}),
  defineField({name:"slug",title:"Slug",type:"slug",options:{source:"name"},validation:r=>r.required()}),
  defineField({name:"description",title:"Description",type:"text"}),
  defineField({name:"order",title:"Display order",type:"number"}),
]});
