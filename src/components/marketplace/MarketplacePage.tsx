import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import { Plus, Filter, Search } from "lucide-react";

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Meat",
  "Other",
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Quantity Available", value: "quantity" },
];

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [category, sortBy]);

  const loadProducts = async () => {
    try {
      const { data } = await getProducts(
        category !== "all" ? category : undefined,
      );
      let sortedData = [...(data || [])];

      switch (sortBy) {
        case "price_asc":
          sortedData.sort((a, b) => a.price_per_unit - b.price_per_unit);
          break;
        case "price_desc":
          sortedData.sort((a, b) => b.price_per_unit - a.price_per_unit);
          break;
        case "quantity":
          sortedData.sort((a, b) => b.quantity - a.quantity);
          break;
        default:
          sortedData.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
      }

      setProducts(sortedData);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Button onClick={() => setActiveTab("sell")}>
          <Plus className="w-4 h-4 mr-2" /> List Product
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="browse">Browse Products</TabsTrigger>
          <TabsTrigger value="sell">Sell Products</TabsTrigger>
          <TabsTrigger value="demands">Demand Board</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-4">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.toLowerCase()}
                        value={cat.toLowerCase()}
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg space-y-4">
                {/* Additional filters can be added here */}
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sell">
          <ProductForm onSuccess={() => setActiveTab("browse")} />
        </TabsContent>

        <TabsContent value="demands">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Coming Soon</h3>
            <p className="text-muted-foreground">
              The demand board feature is under development.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplacePage;
