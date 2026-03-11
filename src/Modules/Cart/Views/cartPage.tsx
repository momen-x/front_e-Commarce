import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

import { toast } from "react-toastify";
import { useState } from "react";
import { useCart } from "../Context/CardContext";
import { useResCart } from "../Repo/resCart";
import {
  checkoutSchema,
  type CheckoutSchemaType,
} from "../Validations/checkOut";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { Link } from "@tanstack/react-router";
import CartItem from "./Cartitem";

const CartPage = () => {
  const { cartItems, totalPrice } = useCart();
  const { data: currentUser } = useGetCurrentUser();

  const { addOrder } = useResCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const grandTotal = totalPrice + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutSchemaType) => {
    try {
      // const { ids } = await addOrderItems();
      await addOrder({
        ...data,
        orderItemsId: cartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        user: currentUser?._id || "",
        totalPrice: grandTotal,
        status: "pending",
      });
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  // ── Order Success ──────────────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
            <Package size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Confirmed!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Your order has been placed. We'll send a confirmation to your email.
          </p>
          <Button onClick={() => setOrderPlaced(false)} className="mt-2">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // ── Empty Cart ─────────────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center flex flex-col items-center gap-4">
          <ShoppingBag size={56} strokeWidth={1} className="text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add some products to get started.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={24} className="text-gray-700 dark:text-gray-300" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Cart
          </h1>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {cartItems.reduce((s, i) => s + i.quantity, 0)} items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Left: Cart Items ── */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}

            {/* Free shipping bar */}
            {totalPrice < 100 ? (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300">
                Add{" "}
                <span className="font-bold">
                  ${(100 - totalPrice).toFixed(2)}
                </span>{" "}
                more for free shipping!
                <div className="mt-2 h-1.5 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((totalPrice / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-300 font-medium">
                🎉 You qualify for free shipping!
              </div>
            )}
          </div>

          {/* ── Right: Summary + Form ── */}
          <div className="flex flex-col gap-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-semibold" : ""
                    }
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-5">
                Delivery Info
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
                noValidate
              >
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="customerEmail"
                    className="flex items-center gap-1.5"
                  >
                    <Mail size={14} /> Email
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder="you@example.com"
                    {...register("customerEmail")}
                    className={errors.customerEmail ? "border-red-500" : ""}
                  />
                  {errors.customerEmail && (
                    <p className="text-xs text-red-500">
                      {errors.customerEmail.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="flex items-center gap-1.5">
                    <Phone size={14} /> Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+970 599 000 000"
                    {...register("phone")}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="address"
                    className="flex items-center gap-1.5"
                  >
                    <MapPin size={14} /> Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Street, City, Country"
                    {...register("address")}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 gap-2"
                >
                  {isSubmitting ? (
                    "Placing Order..."
                  ) : (
                    <>
                      Place Order <ChevronRight size={16} />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
