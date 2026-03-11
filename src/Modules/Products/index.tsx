import { useFilteringProductsByCategory } from "./Hooks/useProducts";
import ProductCard from "./Views/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import Loading from "./Views/Loading";
import ErrorPage from "./Views/ErrorPage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGetAllCategories } from "../Categories/Hooks/useCategory";
import { ListFilter } from "lucide-react";
import top from "@/Utils/top";

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Index = () => {
  top();
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState("All products");
  const { products, isLoading, error } = useFilteringProductsByCategory(
    categoryId,
    page,
    8,
  );
  const { categories, error: errorCategories } = useGetAllCategories();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      if (categoryId !== "All products") {
        const response = await fetch(
          `http://localhost:5000/api/products/categories/${categoryId}`,
        );
        const data = await response.json();
        setCount(data.pageCount);
        return;
      }
      const response = await fetch("http://localhost:5000/api/products/count");
      const data = await response.json();
      setCount(data.pageCount);
    };
    fetchCount();
  }, [categoryId]);

  if (isLoading) return <Loading card={8} />;
  if (error) return <ErrorPage />;

  if (products.length === 0 && categoryId === "All products") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            No Products Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check back later for new products!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Our Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover our amazing collection
            </p>
          </div>

          {!errorCategories ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  {categoryId === "All products"
                    ? "All products"
                    : (categories.find((c) => c._id === categoryId)?.title ??
                      "All products")}
                  <ListFilter />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-900 border rounded shadow-md z-50"
              >
                <DropdownMenuItem
                  onClick={() => {
                    setCategoryId("All products");
                    setPage(1);
                  }}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  All products
                </DropdownMenuItem>

                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category._id}
                    onClick={() => {
                      setCategoryId(category._id);
                      setPage(1);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {category.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <p className="text-red-500 text-sm">
              Something went wrong while fetching categories.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Hide pagination when a category filter is active */}
      {count > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                  scrollTop();
                }}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: count }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum} className="cursor-pointer">
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pageNum);
                    scrollTop();
                  }}
                  isActive={page === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (page < count) setPage(page + 1);
                  scrollTop();
                }}
                className={
                  page === count
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Index;
