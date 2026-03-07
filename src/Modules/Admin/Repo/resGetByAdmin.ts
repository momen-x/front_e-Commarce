import {API_DOMAIN} from "@/Utils/domain"
import type { IGetByAdminAPI } from "./Admin"

export const resGetByAdminAPI : IGetByAdminAPI = {
    getAllUsers:async()=>{
        const response = await fetch(`${API_DOMAIN}/users`,{
          method:"GET",
      credentials: "include",
        }
          
        );
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        const data = await response.json();
        return data.users;
    
    },
    getAllProducts:async()=>{
        //be careful here exist pagination 
        const response = await fetch(`${API_DOMAIN}/products`);
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();
        return data;
    
    },
    getAllCategories:async()=>{
        const response = await fetch(`${API_DOMAIN}/categories`);
        if (!response.ok) {
          throw new Error("Error fetching categories");
        }
        const data = await response.json();
        return data;
    
    },
    deleteUser:async(id:string)=>{
        await fetch(`${API_DOMAIN}/users/${id}`,{
            method:"DELETE",
      credentials: "include",
      
    

})}

}