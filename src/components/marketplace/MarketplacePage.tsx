import React, { useState, useEffect } from "react";
import { getProducts } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductForm from "./ProductForm";

const MarketplacePage = () => {
  const [category, setCategory] = useState("all");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await getProducts(category);
      if (!error && data) {
        setProducts(data);
      }
    };
    loadProducts();
  }, [category]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="vegetables">Vegetables</SelectItem>
            <SelectItem value="fruits">Fruits</SelectItem>
            <SelectItem value="grains">Grains</SelectItem>
            <SelectItem value="dairy">Dairy</SelectItem>
            <SelectItem value="meat">Meat</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ProductForm />
    </div>
  );
};

export default MarketplacePage;
