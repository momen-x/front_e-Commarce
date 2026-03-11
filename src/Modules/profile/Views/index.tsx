import { Camera, Lock, Trash2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import useProtectedLoggedUserPage from "@/Utils/useProtectedLoggedUserPage";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useNavigate } from "@tanstack/react-router";
import { useUploadImage } from "../Hooks/useUser";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import type { AddOrChangeUserImageType } from "../Validations/UpdateUserData";
import { Button } from "@/components/ui/button";
import top from "@/Utils/top";

const UserProfilePage = () => {
  top();
  const [userImage, setUserImage] = useState<AddOrChangeUserImageType | null>(
    null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useProtectedLoggedUserPage();
  const navigate = useNavigate();

  const { mutate: handleUploadImage, isPending } = useUploadImage(() => {
    toast.success("Profile photo updated successfully!");
    setUserImage(null);
    setPreviewUrl(null);
  });

  const { data, isLoading } = useGetCurrentUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImage({ image: file });
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    if (userImage) {
      handleUploadImage(userImage);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal information and account settings
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Profile Image Section - IMPROVED DESIGN */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image with better styling */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-full ring-4 ring-white dark:ring-gray-700 shadow-lg overflow-hidden">
                  <img
                    src={
                      previewUrl ||
                      data?.userImage?.url ||
                      "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hidden file input */}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Upload Button - improved positioning and style */}
                <Button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl border-2 border-white dark:border-gray-800"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Image upload status and actions */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {data?.firstName} {data?.lastName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {data?.email}
                </p>

                {previewUrl && (
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Button
                      size="sm"
                      onClick={handleUploadClick}
                      disabled={isPending}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isPending ? "Uploading..." : "Save new photo"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setPreviewUrl(null);
                        setUserImage(null);
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {!previewUrl && (
                  <p className="text-xs text-gray-400">
                    Click the camera icon to change your profile photo
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Privacy & Security Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Privacy & Security
            </h2>

            <div className="space-y-3">
              {/* Update user info */}
              <Button
                onClick={() => navigate({ to: "/profile/edit" })}
                className="w-full flex h-16 mb-3 items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
              >
                <div className="flex items-center">
                  <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <User className="h-5 w-5 text-green-300 dark:text-green-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Update your data
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your information regularly
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
            </div>
            <div className="space-y-3">
              {/* Change Password */}
              <Button
                onClick={() => navigate({ to: "/profile/change-password" })}
                className="w-full flex items-center  h-16 mb-3  justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group"
              >
                <div className="flex items-center">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Change Password
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Update your password regularly
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>

              {/* Delete Account */}
              <Button className="w-full  h-16 mb-3 flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all group">
                <div className="flex items-center">
                  <div className="p-2.5 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                      Delete Account
                    </p>
                    <p className="text-xs text-red-500 dark:text-red-400/80">
                      Permanently delete your account
                    </p>
                  </div>
                </div>
                <span className="text-red-400 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
