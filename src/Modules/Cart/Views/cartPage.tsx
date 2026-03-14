import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCurrentUser } from "@/Modules/profile/Hooks/useGetDataForCurrentUser";
import { useCart } from "../Context/CardContext";
import { useAddOrder } from "../Hooks/useOrder";

import { Form } from "@/components/ui/form";
import ValidationInput from "@/components/Inputs/ValidationInput";

import PaymentForm from "../../Payment/Views/PaymentForm";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import {
  checkoutSchema,
  type CheckoutSchemaType,
} from "../Validations/checkOut";
import { Link } from "@tanstack/react-router";
import CartItem from "./CartItem";

const CartPage = () => {
  const { cartItems, totalPrice } = useCart();
  const { data: currentUser } = useGetCurrentUser();
  const { mutateAsync: addOrder, isPending: isSubmitting } = useAddOrder();
  const [orderId, setOrderId] = useState<string | null>(null);
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const grandTotal = totalPrice + shipping;

  const form = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerEmail: currentUser?.email || "",
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (currentUser) {
      form.setValue("customerEmail", currentUser.email);
    }
  }, [currentUser]);

  const onSubmit = async (data: CheckoutSchemaType) => {
    try {
      const order = await addOrder({
        ...data,
        user: currentUser?._id || "",
        orderItemsId: cartItems.map((item) => ({
          product: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: grandTotal,
        status: "pending",
      });

      if (order._id) setOrderId(order._id);
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  if (orderId) {
    return (
      <PaymentForm
        orderId={orderId}
        onSuccess={() => {
          setOrderId(null);
        }}
      />
    );
  }

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

  return orderId ? (
    <PaymentForm
      orderId={orderId}
      onSuccess={() => {
        setOrderId(null);
      }}
    />
  ) : (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag
              size={24}
              className="text-gray-700 dark:text-gray-300"
            />
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                    noValidate
                  >
                    {/* Email */}

                    <div>
                      <ValidationInput<CheckoutSchemaType>
                        fieldTitle="Enter email"
                        nameInSchema="customerEmail"
                        placeholder="example@example.com"
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        disabled
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <ValidationInput<CheckoutSchemaType>
                        fieldTitle="Enter your phone number"
                        nameInSchema="phone"
                        placeholder="e.g., +1234567890"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-1.5">
                      <ValidationInput<CheckoutSchemaType>
                        fieldTitle="Enter your address"
                        nameInSchema="address"
                        placeholder="e.g.,Street 123, City, Country"
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !form.formState.isValid}
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
