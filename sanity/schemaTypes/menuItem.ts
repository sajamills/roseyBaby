import { defineField, defineType } from "sanity";
export const menuItem = defineType({ name:"menuItem", title:"Menu Items", type:"document", fields:[
  defineField({name:"name",title:"Name",type:"string",validation:r=>r.required()}),
  defineField({name:"slug",title:"Slug",type:"slug",options:{source:"name"},validation:r=>r.required()}),
  defineField({name:"description",title:"Description",type:"text",validation:r=>r.required()}),
  defineField({name:"category",title:"Category",type:"reference",to:[{type:"menuCategory"}],validation:r=>r.required()}),
  defineField({name:"price",title:"Internal price",description:"Stored for printed menus and staff use; hidden on the public website.",type:"string"}),
  defineField({name:"ingredients",title:"Ingredients",type:"array",of:[{type:"string"}]}),
  defineField({name:"allergens",title:"Allergens",type:"array",of:[{type:"string"}]}),
  defineField({name:"dietaryLabels",title:"Dietary labels",type:"array",of:[{type:"string"}],options:{list:["Vegetarian","Vegan","Gluten-aware"]}}),
  defineField({name:"spiceLevel",title:"Spice level",type:"number",validation:r=>r.min(0).max(3)}),
  defineField({name:"seasonal",title:"Seasonal",type:"boolean",initialValue:false}),
  defineField({name:"available",title:"Available",type:"boolean",initialValue:true}),
  defineField({name:"searchSynonyms",title:"Search synonyms",type:"array",of:[{type:"string"}]}),
  defineField({name:"image",title:"Image",type:"image",options:{hotspot:true},fields:[{name:"alt",title:"Alt text",type:"string"}]}),
  defineField({name:"verifiedAt",title:"Last verified",type:"datetime"}),
]});
