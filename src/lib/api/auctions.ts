import { supabase } from "../supabase";
import { Auction } from "../types/auction";

export async function getAuctions(status?: "upcoming" | "active" | "ended") {
  let query = supabase
    .from("products")
    .select(
      `
      *,
      seller:profiles(*)
    `,
    )
    .eq("category", "auction");

  if (status) {
    query = query.eq(
      "available_from",
      status === "upcoming" ? "future" : "past",
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createAuction(auctionData: Partial<Auction>) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name: auctionData.title,
        description: auctionData.description,
        category: "auction",
        price_per_unit: auctionData.start_price || 0,
        quantity: 1,
        unit: "piece",
        available_from: auctionData.start_time || new Date().toISOString(),
        available_until: auctionData.end_time,
        user_id: user.user.id,
        status: auctionData.status || "active",
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function placeBid(productId: string, amount: number) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("orders")
    .insert({
      product_id: productId,
      buyer_id: user.user.id,
      seller_id: "", // This will be set by a trigger
      quantity: 1,
      total_price: amount,
      status: "bid",
    })
    .select();

  if (error) throw error;
  return data;
}
