import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Truck, ShieldCheck, Headphones } from "lucide-react";
import { useFilteringProductsByCategory } from "../../Products/Hooks/useProducts";
import ProductCard from "../../Products/Views/ProductCard";
import { FeaturesAboutUsArray, ReviewsArray } from "@/Data/data";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const goToProductsPage = () => {
    navigate({
      to: "/products",
    });
  };

  const { products } = useFilteringProductsByCategory("All products", 1, 8);
  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-stone-900 px-3 py-1.5 rounded-full text-sm text-stone-600 dark:text-stone-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Free shipping on orders over $50
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Discover Products You Will Love
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Shop the latest trends with unbeatable prices. Quality products,
                fast delivery, and exceptional customer service.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  className="gap-2 text-base"
                  onClick={goToProductsPage}
                >
                  Shop Now
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base"
                  onClick={goToProductsPage}
                >
                  Browse Collection
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-6 border-t border-border mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-background"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">10k+</span>
                    <span className="text-muted-foreground">
                      {" "}
                      happy customers
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-sm font-medium text-foreground ml-1">
                    4.9
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Featured Image Grid */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop"
                      alt="Fashion collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
                      alt="Product showcase"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
                      alt="Sneakers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl bg-stone-200 dark:bg-stone-800 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop"
                      alt="Clothing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits bar */}
        <div className="border-y border-border bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="flex items-center gap-3 py-4 px-2">
                <Truck className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-foreground">
                    Free Shipping
                  </p>
                  <p className="text-xs text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-4 px-2">
                <ShieldCheck className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-foreground">
                    Secure Payment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    100% protected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-4 px-2">
                <Headphones className="size-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm text-foreground">
                    24/7 Support
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Dedicated help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We provide the best shopping experience with quality and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FeaturesAboutUsArray.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {<feature.Icon className="size-5 text-primary" />}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Our most popular picks this season
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2 self-start sm:self-auto"
              onClick={goToProductsPage}
            >
              View All
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ReviewsArray.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-foreground font-medium">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Ready to Start Shopping?
          </h2>
          <p className="text-background/70 mb-8 max-w-lg mx-auto">
            Join thousands of happy customers and discover quality products at
            great prices
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            onClick={goToProductsPage}
          >
            Shop Now
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
