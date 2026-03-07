import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";
import defaultImage from "../../../public/defaultUserImage.png"
import { useGetCurrentUser } from "@/Utils/useGetDataForCurrentUser";
import { useLogoutUser } from "@/Modules/Auth/Hooks/useLogOut";
import { toast } from "react-toastify";


export function ProfileDropDown() {
    const {data,isLoading}=useGetCurrentUser();

 
    const navigate = useNavigate();
    const {mutate:logout}=useLogoutUser(()=>{
        navigate({to:"/login"});
        toast.success("log out successfully");
    });

    const handleLogOut = () => {
       try {
           
           console.log("log out successfully");
           logout({});
       } catch (error) {
        console.error("error : ",error);
       }

    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full p-0 hover:opacity-80 transition-opacity"
                >
                    <img 
                        src={data?.userImage && !isLoading? data.userImage.url : defaultImage} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
                align="end" 
                className="w-56 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-lg"
            >
                <div className="px-2 py-1.5 text-sm text-gray-500 dark:text-gray-400">
                    {/* //to do  */}
                    Signed in as <span className="font-medium text-gray-900 dark:text-gray-100">{data?.firstName && !isLoading ?   (data.firstName +" "+data.lastName).length>7 ? (data.firstName +" "+data.lastName).substring(0,7) + "..." : (data.firstName +" "+data.lastName) : "Guest"}</span>
                </div>
                
                <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />
                
                <DropdownMenuItem 
                    onClick={() => navigate({ to: "/profile" })}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <User className="w-4 h-4" />
                    Profile
                </DropdownMenuItem>
                
          
                
                <DropdownMenuSeparator className="my-1 bg-gray-200 dark:bg-gray-800" />
                
                <DropdownMenuItem 
                    onClick={handleLogOut}
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                    <LogOut className="w-4 h-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}