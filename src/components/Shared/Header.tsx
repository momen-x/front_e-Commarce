import { useState } from "react";
import { useTheme } from "@/Modules/Theme";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ProfileDropDown } from "./ProfileDropDown";
import { ModeToggle } from "@/Modules/Theme/Views";
import { Menu, X, ShoppingCart } from "lucide-react";
import DarkLogo from "../../../public/DarkLogo.jpeg";
import lightLogo from "../../../public/lightLogo.jpeg";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useCart } from "@/Modules/Cart/Context/CardContext";
import { Link, useNavigate, useLocation } from "@tanstack/react-router"; // Remove useRouter, add useMatch
import { NavHeaderArray, AdminLinks, UserOrderLinks } from "../../Data/data";

const NavOrder = () => {
  return (
    <li>
      <Link
        to={UserOrderLinks.href}
        className={`${UserOrderLinks.className} ${
          location.pathname === UserOrderLinks.href
            ? "!text-primary font-semibold border-b-2 border-primary"
            : ""
        } pb-1`}
      >
        <UserOrderLinks.Icon
          className={`w-4 h-4 ${location.pathname === UserOrderLinks.href ? "text-primary" : ""}`}
        />
        <span>{UserOrderLinks.title}</span>
      </Link>
    </li>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { totalItems } = useCart();
  const { data: userinfo, isLoading } = useGetCurrentUser();
  const location = useLocation();

  // Default className from your code
  const defaultClassName =
    "flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-foreground">
              <img
                src={theme === "light" ? lightLogo : DarkLogo}
                alt="logo"
                className="w-12 h-12 rounded-full"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {NavHeaderArray.map(({ href, title, Icon }, index) => {
                const isActive = location.pathname === href;
                return (
                  <li key={index}>
                    <Link
                      to={href}
                      className={`${defaultClassName} ${
                        isActive
                          ? "!text-primary font-semibold border-b-2 border-primary"
                          : ""
                      } pb-1`}
                    >
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-primary" : ""}`}
                      />
                      <span>{title}</span>
                    </Link>
                  </li>
                );
              })}
              {!isLoading && userinfo && <NavOrder />}
              {userinfo?.isAdmin && (
                <li>
                  <Link
                    to={AdminLinks.href}
                    className={`${defaultClassName} ${
                      location.pathname === AdminLinks.href
                        ? "!text-primary font-semibold border-b-2 border-primary"
                        : ""
                    } pb-1`}
                  >
                    <AdminLinks.Icon
                      className={`w-4 h-4 ${location.pathname === AdminLinks.href ? "text-primary" : ""}`}
                    />
                    <span>{AdminLinks.title}</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {!isLoading && userinfo ? (
              <>
                <div className="relative inline-block">
                  <ShoppingCart
                    className="h-6 w-6 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => {
                      navigate({ to: "/cart" });
                    }}
                  />
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </div>
                <ProfileDropDown />
              </>
            ) : (
              <div className="flex space-x-4">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    navigate({ to: "/login" });
                  }}
                >
                  log in
                </Button>
                <Button
                  variant={"default"}
                  onClick={() => {
                    navigate({ to: "/register" });
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <ul className="flex flex-col space-y-3">
              {NavHeaderArray.map(({ href, title, Icon }, index) => {
                const isActive = location.pathname === href;

                return (
                  <li key={index}>
                    <Link
                      to={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`${defaultClassName} w-full ${
                        isActive
                          ? "!text-primary bg-primary/10 border-l-4 border-primary pl-3"
                          : ""
                      } py-2 px-4 rounded-r-lg`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive ? "text-primary" : ""}`}
                      />
                      <span>{title}</span>
                    </Link>
                  </li>
                );
              })}
              {!isLoading && userinfo && <NavOrder />}
              {userinfo?.isAdmin && (
                <li>
                  <Link
                    to={AdminLinks.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${defaultClassName} w-full ${
                      location.pathname === AdminLinks.href
                        ? "!text-primary bg-primary/10 border-l-4 border-primary pl-3"
                        : ""
                    } py-2 px-4 rounded-r-lg`}
                  >
                    <AdminLinks.Icon
                      className={`w-5 h-5 ${location.pathname === AdminLinks.href ? "text-primary" : ""}`}
                    />
                    <span>{AdminLinks.title}</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
