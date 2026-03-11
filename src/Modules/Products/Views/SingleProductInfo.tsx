import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useGetProductById } from "../Hooks/useProducts";
import { useParams, useNavigate } from "@tanstack/react-router";
import top from "@/Utils/top";
import { useCart } from "@/Modules/Cart/Context/CardContext";
import { useRequireAuth } from "@/Modules/Admin/Hooks/useRequiredAuth";
import { toast } from "react-toastify";

const SingleProduct = () => {
  top();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { requireAuth } = useRequireAuth();
  const { productId } = useParams({ from: "/products/$productId" });
  const { product, isLoading, error } = useGetProductById(productId);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    requireAuth("Please log in to add items to your cart", () => {
      addToCart({
        productId: product._id,
        title: product.title,
        price: product.price,
        image: product.image?.url ?? "",
        quantity: quantity,
      });
      toast.success(`${product.title} added to cart!`);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <AlertCircle className="size-6 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Product Not Found
          </h2>
          <p className="text-muted-foreground text-sm">
            This product doesn't exist or has been removed.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/products" })}
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const total = (quantity * product.price).toFixed(2);

  return (
    <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button
          onClick={() => navigate({ to: "/products" })}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to products
        </Button>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={product.image?.url}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Category */}
            {product.categoryId?.title && (
              <span className="text-sm text-muted-foreground mb-2">
                {product.categoryId.title}
              </span>
            )}

            {/* Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold text-foreground mb-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="mb-8">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  Quantity
                </span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2.5 hover:bg-muted transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-foreground">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 hover:bg-muted transition-colors"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: ${total}
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full gap-2"
              >
                <ShoppingCart className="size-4" />
                Add to Cart
              </Button>
            </div>

            {/* Simple info */}
            <div className="border-t border-border pt-6 mt-auto space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck className="size-4" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RotateCcw className="size-4" />
                <span>30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
