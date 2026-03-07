import { Camera, Lock, Trash2, User, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useProtectedLoggedUserPage from "@/Utils/useProtectedLoggedUserPage";
import { useGetCurrentUser } from "@/Utils/useGetDataForCurrentUser";
import { useNavigate } from "@tanstack/react-router";

const UserProfilePage = () => {
    useProtectedLoggedUserPage();
    const navigate=useNavigate();

    const {data,isLoading} =useGetCurrentUser();
    if(isLoading){
      return <div>Loading...</div>
    }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          My Profile
        </h1>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          
          {/* Profile Image Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative">
                {/* <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">
                    JD
                  </div>
                </div> */}
                <img src={data?.userImage.url} alt="user profile image" className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden" />
                {/* Update Image Button */}
                <Button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors ">
                  <Input type="file" className="hidden"  accept="image/*"/>
                  <Camera className="h-4 w-4"  />
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Click the camera icon to update your photo
              </p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue={data?.firstName}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue={data?.lastName}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Email (read-only example) */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    defaultValue={data?.email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="mt-4 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Changes
              </Button>
            </div>
          </div>

          {/* Privacy & Security Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Privacy & Security
            </h2>
            
            <div className="space-y-3">
              {/* Change Password */}
              <Button className="w-full flex items-center justify-between p-6 h-16 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={()=>{navigate({to:"/profile/change-password"})}}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Change Password
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your password regularly for security
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </Button>

  

              {/* Delete Account */}
              <Button className="w-full flex items-center justify-between p-3 h-16 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                      Delete Account
                    </p>
                    <p className="text-xs text-red-500 dark:text-red-400/80">
                      Permanently delete your account and data
                    </p>
                  </div>
                </div>
                <span className="text-red-400">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;