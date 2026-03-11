import {
  BarcodeIcon,
  HouseIcon,
  Shield,
  ShieldUser,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface NavHeader {
  href: "/products" | "/" | "/admin";
  title: string;
  Icon: LucideIcon;
  className: string;
}
const className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200";
export const NavHeaderArray: NavHeader[] = [
  { href: "/", title: "Home", Icon: HouseIcon,className },
  { href: "/products", title: "Products", Icon: BarcodeIcon,className },
];

export const AdminLinks: NavHeader = {
  href: "/admin",
  title: "Admin",
  Icon: ShieldUser,
  className
};

interface IFeaturesAboutUs {
  Icon: LucideIcon;
  title: string;
  description: string;
  className: string;
}

export const FeaturesAboutUsArray: IFeaturesAboutUs[] = [
  {
    Icon: Zap,
    className: "w-8 h-8 text-yellow-500",
    title: "Fast Delivery",
    description: "Get your products delivered within 2-3 business days",
  },
  {
    Icon: Shield,
    className: "w-8 h-8 text-green-500",

    title: "Secure Payments",
    description: "100% secure transactions with encrypted payment methods",
  },
  {
    Icon: Star,
    className: "w-8 h-8 text-purple-500",
    title: "Premium Quality",
    description: "All products are carefully selected for quality",
  },
];
interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
}
export const ReviewsArray: Review[] = [
  {
    name: "Sarah Johnson",
    role: "Verified Buyer",
    content:
      "Amazing quality and fast shipping! I'm definitely coming back for more.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Verified Buyer",
    content:
      "Best customer service I've ever experienced. They went above and beyond!",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Verified Buyer",
    content: "The products exceeded my expectations. Highly recommended!",
    rating: 5,
  },
];
