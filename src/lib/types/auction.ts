export interface Auction {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  category: string;
  start_price: number;
  reserve_price?: number;
  min_increment: number;
  start_time: string;
  end_time: string;
  status: "upcoming" | "active" | "ended" | "cancelled";
  media_urls?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AuctionBid {
  id: string;
  auction_id: string;
  bidder_id: string;
  amount: number;
  created_at: string;
}
