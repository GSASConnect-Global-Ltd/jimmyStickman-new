// C:\Next\j\project\jimmyStickman\components\products\ProductsList.tsx

"use client";
import { useSearchParams } from "next/navigation";

import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/product";
import { fetchProducts, filterProducts } from "@/lib/api/product"; 

const filtersList = ["Gender", "Category", "Size", "Color", "Price"];

const ProductsList = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<Record<string, any>>({
    gender: "",
    category: "",
    size: [],
    color: [],
    minPrice: "",
    maxPrice: "",
  });

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchProducts();
  //       setProducts(data); 
  //     } catch (err: any) {
  //       console.error(err);
  //       setError(err.message || "Failed to fetch products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getProducts();
  // }, []);


  useEffect(() => {
  const getProducts = async () => {
    try {
      setLoading(true);

      let data;
      if (searchQuery) {
        // If coming from search
        data = await filterProducts({ name: searchQuery });
      } else {
        data = await fetchProducts();
      }

      setProducts(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  getProducts();
}, [searchQuery]);


  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = async () => {
  try {
    setLoading(true);

    const query: Record<string, any> = {};

    if (filters.gender) query.gender = filters.gender;
    if (filters.category) query.category = filters.category;

    if (filters.size.length > 0) query.sizes = filters.size.join(",");
    if (filters.color.length > 0) query.colors = filters.color.join(",");

    if (filters.minPrice) query.minPrice = filters.minPrice;
    if (filters.maxPrice) query.maxPrice = filters.maxPrice;

    const data = await filterProducts(query);

    setProducts(data); // final filtered list
    setOpen(false); // close modal
  } catch (err: any) {
    setError(err.message || "Failed to apply filters");
  } finally {
    setLoading(false);
  }
};

const getActiveFilters = () => {
  const tags: string[] = [];

  if (filters.gender) tags.push(filters.gender);
  if (filters.category) tags.push(filters.category);

  filters.size.forEach((s: string) => tags.push(`Size: ${s}`));
  filters.color.forEach((c: string) => tags.push(`Color: ${c}`));

  if (filters.minPrice || filters.maxPrice) {
    tags.push(`₦${filters.minPrice || 0} - ₦${filters.maxPrice || "∞"}`);
  }

  return tags;
};



  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">
  {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
</h2>


      {/* Filter Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setOpen(true)}
          className="border px-4 py-2 text-sm hover:bg-gray-200"
        >
          🔍 All Filters
        </button>
      </div>

      {/* Active Filters */}
{getActiveFilters().length > 0 && (
  <div className="mb-4 flex flex-wrap gap-2 items-center">
    {getActiveFilters().map((tag, i) => (
      <span
        key={i}
        className="bg-red-100 text-red-600 px-3 py-1 text-sm rounded-full border border-red-300"
      >
        {tag}
      </span>
    ))}

    <button
      onClick={() =>
        setFilters({
          gender: "",
          category: "",
          size: [],
          color: [],
          minPrice: "",
          maxPrice: "",
        })
      }
      className="text-blue-600 text-sm underline ml-2"
    >
      Clear All
    </button>
  </div>
)}


      {/* Products Grid */}
      {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mt-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>


      {/* Filters Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-[300px] md:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Gender */}
            <div>
              <h3 className="font-semibold mb-2">Gender</h3>
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">All</option>
                <option value="Shoes">Shoes</option>
                <option value="Clothes">Clothes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              {["S", "M", "L", "XL"].map((size) => (
                <label key={size} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={filters.size.includes(size)}
                    onChange={(e) => {
                      if (e.target.checked)
                        handleFilterChange("size", [...filters.size, size]);
                      else
                        handleFilterChange(
                          "size",
                          filters.size.filter((s: string) => s !== size)
                        );
                    }}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              {["Red", "Blue", "Green", "Black"].map((color) => (
                <label key={color} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={filters.color.includes(color)}
                    onChange={(e) => {
                      if (e.target.checked)
                        handleFilterChange("color", [...filters.color, color]);
                      else
                        handleFilterChange(
                          "color",
                          filters.color.filter((c: string) => c !== color)
                        );
                    }}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>

            {/* Price */}
            <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="w-1/2 border px-2 py-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="w-1/2 border px-2 py-1 rounded"
                />
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Apply Filters
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductsList;
