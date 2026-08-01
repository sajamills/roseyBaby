import { cateringService } from "./cateringService";
import { crawfishStatus } from "./crawfishStatus";
import { event } from "./event";
import { faq } from "./faq";
import { menuCategory } from "./menuCategory";
import { menuItem } from "./menuItem";
import { page } from "./page";
import { restaurantSettings } from "./restaurantSettings";
import { blogPost } from "./blogPost";
import { syncStatus } from "./syncStatus";

export const schemaTypes = [restaurantSettings, menuCategory, menuItem, crawfishStatus, event, blogPost, cateringService, faq, page, syncStatus];
