import React, { Suspense } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useRoutes,
} from "react-router-dom";
import routes from "tempo-routes";
import MainLayout from "./components/layout/MainLayout";
import FeedPage from "./components/feed/FeedPage";
import LoginPage from "./components/auth/LoginPage";
import { AuthProvider, useAuth } from "./lib/AuthContext";

// Lazy load components
const MessagesPage = React.lazy(
  () => import("./components/messages/MessagesPage"),
);
const ProfilePage = React.lazy(
  () => import("./components/profile/ProfilePage"),
);
const SettingsPage = React.lazy(
  () => import("./components/settings/SettingsPage"),
);
const AnalyticsPage = React.lazy(
  () => import("./components/analytics/AnalyticsPage"),
);
const OrdersPage = React.lazy(() => import("./components/orders/OrdersPage"));
const ShipmentsPage = React.lazy(
  () => import("./components/shipments/ShipmentsPage"),
);
const PartnersPage = React.lazy(
  () => import("./components/partners/PartnersPage"),
);
const StorePage = React.lazy(() => import("./components/store/StorePage"));
const CustomersPage = React.lazy(
  () => import("./components/customers/CustomersPage"),
);
const TrackOrderPage = React.lazy(
  () => import("./components/orders/TrackOrderPage"),
);
const FindStoresPage = React.lazy(
  () => import("./components/store/FindStoresPage"),
);
const DealsPage = React.lazy(() => import("./components/deals/DealsPage"));
const SupplyChainPage = React.lazy(
  () => import("./components/supply-chain/SupplyChainPage"),
);
const AuctionsPage = React.lazy(
  () => import("./components/auctions/AuctionsPage"),
);

const MarketplacePage = React.lazy(
  () => import("./components/marketplace/MarketplacePage"),
);
const InventoryPage = React.lazy(
  () => import("./components/inventory/InventoryPage"),
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login while preserving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={null}>
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO && useRoutes(routes)}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/feed" />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="auctions" element={<AuctionsPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="products" element={<InventoryPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="supply-chain" element={<SupplyChainPage />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="store" element={<StorePage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="track" element={<TrackOrderPage />} />
            <Route path="stores" element={<FindStoresPage />} />
            <Route path="deals" element={<DealsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
