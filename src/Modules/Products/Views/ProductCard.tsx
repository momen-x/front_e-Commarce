import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "../Repo/Products";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useRequireAuth } from "@/Modules/Admin/Hooks/useRequiredAuth";
import { useCart } from "@/Modules/Cart/Context/CardContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: Product }) => {
  const { requireAuth } = useRequireAuth();

const { addToCart } = useCart();

const handleAddToCart = () => {
  requireAuth(
    "Please log in to add items to your cart 🛒",
    () => {
      toast.success("Item added to cart!");
      addToCart({
        productId: product._id,       
        title: product.title,
        price: product.price,
        image: product.image?.url,
        quantity: 1,
      });
    }
  );
};

  const imageUrl =
    product.image?.url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop";
  const navigate = useNavigate();
  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={() => {
        navigate({
          to: "/products/$productId",
          params: { productId: product._id },
        });
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Price Tag */}
        <div className="absolute top-3 right-3">
          <Badge variant="default" className="bg-blue-600 text-white">
            ${product.price?.toFixed(2) || "99.99"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500 dark:text-gray-400"></span>
        </div>
        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3"></CardContent>

      <CardFooter>
        <Button
          className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
