import type { Category } from "@/Modules/Categories/Repo/Category";
import type { Product } from "@/Modules/Products/Repo/Products";

export interface IUser{
     _id: string;
            firstName: string,
            lastName: string,
            userImage: {
                public_id: string,
                url: string
            },
            email:string,
            isAdmin: boolean,
            createdAt: Date,
            updatedAt: Date,
}

export interface IGetByAdminAPI{
    getAllUsers:()=>Promise<IUser[]>;
    getAllProducts:()=>Promise<Product[]>;
    getAllCategories:()=>Promise<Category[]>;
    deleteUser:(id:string)=>Promise<void>;
    //to do 
    // getAllOrders:()=>Promise<IUser[]>;
}