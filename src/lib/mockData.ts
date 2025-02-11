export const mockPosts = [
  {
    id: "1",
    content:
      "Just harvested a fresh batch of premium organic tomatoes! 🍅 Our sustainable greenhouse practices ensure the highest quality produce. Bulk orders available for restaurants and distributors. #OrganicFarming #FreshProduce",
    media_url: ["https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e"],
    media_type: "image",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    profiles: {
      full_name: "David Mthembu",
      business_type: "Farmer",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=farmer1",
    },
    likes: [{ count: 24 }],
  },
  {
    id: "2",
    content:
      "New sustainable packaging solution for our premium fruit exports! 📦 Reduces waste by 40% while maintaining freshness. Download our sustainability report for more details.",
    media_url: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2340&fit=crop",
    ],
    media_type: "image",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    profiles: {
      full_name: "Sarah Johnson",
      business_type: "Distributor",
      avatar_url:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=distributor1",
    },
    likes: [{ count: 18 }],
  },
  {
    id: "3",
    content:
      "Market update: Grain prices trending upward due to increased international demand. Check out our latest market analysis report.",
    media_url: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2340&fit=crop",
    ],
    media_type: "image",
    created_at: new Date(Date.now() - 10800000).toISOString(),
    profiles: {
      full_name: "Michael Chen",
      business_type: "Analyst",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=analyst1",
    },
    likes: [{ count: 42 }],
  },
  {
    id: "4",
    content:
      "Excited to announce our new partnership with local farmers! 🤝 Supporting sustainable agriculture and bringing fresh produce directly to your tables. #LocalFarming #FarmToTable",
    media_url: [
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2340&fit=crop",
    ],
    media_type: "image",
    created_at: new Date(Date.now() - 14400000).toISOString(),
    profiles: {
      full_name: "Emma Davis",
      business_type: "Retailer",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=retailer1",
    },
    likes: [{ count: 56 }],
  },
];

export const mockStories = [
  {
    id: "1",
    user_id: "farmer1",
    media_url:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2340&fit=crop",
    caption: "Fresh harvest ready for distribution! 🌾",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    expires_at: new Date(Date.now() + 82800000).toISOString(),
    profile: {
      id: "farmer1",
      full_name: "Fresh Farms",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=farm1",
      business_type: "farmer",
    },
  },
  {
    id: "2",
    user_id: "dist1",
    media_url:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2340&fit=crop",
    caption: "New eco-friendly packaging launched today! 📦",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    expires_at: new Date(Date.now() + 79200000).toISOString(),
    profile: {
      id: "dist1",
      full_name: "Global Distribution",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=dist1",
      business_type: "distributor",
    },
  },
];
