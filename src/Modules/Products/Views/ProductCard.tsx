import { Button } from "@/components/ui/button";
import type { Product } from "../Repo/Products";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useRequireAuth } from "@/Modules/Admin/Hooks/useRequiredAuth";
import { useCart } from "@/Modules/Cart/Context/CardContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: Product }) => {
  const { requireAuth } = useRequireAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuth("Please log in to add items to your cart", () => {
      toast.success("Item added to cart!");
      addToCart({
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image?.url,
        quantity: 1,
      });
    });
  };

  const imageUrl =
    product.image?.url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop";

  const formattedPrice = product.price?.toFixed(2) || "99.99";

  return (
    <article className="group flex flex-col rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md">
      {/* Image Container - neutral gray background helps unify different image qualities */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-100 cursor-pointer"
        onClick={() => {
          navigate({
            to: "/products/$productId",
            params: { productId: product._id },
          });
        }}
      >
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3
          className="font-medium text-foreground line-clamp-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => {
            navigate({
              to: "/products/$productId",
              params: { productId: product._id },
            });
          }}
        >
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart - always visible */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-lg font-semibold text-foreground">
            ${formattedPrice}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
