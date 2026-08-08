import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, ShoppingCart, type LucideIcon } from "lucide-react";

import { useTheme } from "@/Modules/Theme";
import { ModeToggle } from "@/Modules/Theme/Views";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useCart } from "@/Modules/Cart/Context/CardContext";

import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ProfileDropDown } from "./ProfileDropDown";

import DarkLogo from "../../../public/DarkLogo.jpeg";
import lightLogo from "../../../public/lightLogo.jpeg";
import { NavHeaderArray, AdminLinks, UserOrderLinks } from "../../Data/data";

interface NavLinkItem {
  href: string;
  title: string;
  Icon: LucideIcon;
}

interface NavItemProps {
  item: NavLinkItem;
  isMobile?: boolean;
  onNavigate?: () => void;
}

const NavItem = ({ item, isMobile = false, onNavigate }: NavItemProps) => {
  const { href, title, Icon } = item;

  return (
    <li>
      <Link
        to={href}
        onClick={onNavigate}
        className={`flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 ${
          isMobile ? "w-full py-2 px-4 rounded-r-lg" : "pb-1"
        }`}
        activeProps={{
          className: isMobile
            ? "!text-primary bg-primary/10 border-l-4 border-primary pl-3 font-semibold"
            : "!text-primary font-semibold border-b-2 border-primary",
        }}
      >
        {({ isActive }) => (
          <>
            <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
            <span>{title}</span>
          </>
        )}
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

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={theme === "light" ? lightLogo : DarkLogo}
                alt="Company Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {NavHeaderArray.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}

              {!isLoading && userinfo && <NavItem item={UserOrderLinks} />}

              {userinfo?.isAdmin && <NavItem item={AdminLinks} />}
            </ul>
          </nav>

          {/* Right Section Actions */}
          <div className="flex items-center space-x-4">
            <ModeToggle />

            {!isLoading && userinfo ? (
              <>
                <Link
                  to="/cart"
                  className="relative inline-flex items-center p-1"
                >
                  <ShoppingCart className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
                  <span className="sr-only">Shopping Cart</span>
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Link>

                <ProfileDropDown />
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: "/login" })}
                >
                  Log in
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate({ to: "/register" })}
                >
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
              {NavHeaderArray.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isMobile
                  onNavigate={handleCloseMenu}
                />
              ))}

              {!isLoading && userinfo && (
                <NavItem
                  item={UserOrderLinks}
                  isMobile
                  onNavigate={handleCloseMenu}
                />
              )}

              {userinfo?.isAdmin && (
                <NavItem
                  item={AdminLinks}
                  isMobile
                  onNavigate={handleCloseMenu}
                />
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
