import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import Navigation from "../components/Navigation";
import AuthModal from "../components/AuthModal";
import BudgetModal from "../components/BudgetModal";
import LocationModal from "../components/LocationModal";
import PreferencesModal from "../components/PreferencesModal";
import VouchersModal from "../components/VouchersModal";

export default function HomePage() {
  const navigate = useNavigate();
  const {
    user,
    budget,
    budgetRemaining,
    endOfMonthMode,
    toggleEndOfMonthMode,
    restaurants,
    cart,
    addToCart,
    vouchers,
  } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">(
    "login",
  );
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showLocationModal, setShowLocationModal] =
    useState(false);
  const [showPrefsModal, setShowPrefsModal] = useState(false);
  const [showVouchersModal, setShowVouchersModal] =
    useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "🍽️ All",
    "🍕 Pizza",
    "🍛 Biryani",
    "🍖 BBQ",
    "🥗 Healthy",
    "🍔 Burgers",
    "🥙 Fast Food",
  ];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      searchQuery === "" ||
      r.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      r.cuisine
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "🍽️ All" ||
      r.cuisine
        .toLowerCase()
        .includes(
          selectedCategory.split(" ")[1]?.toLowerCase() || "",
        );
    return matchesSearch && matchesCategory;
  });

  const promos = [
    {
      id: 1,
      title: "30% off\nyour order",
      code: "POCKET30",
      badge: "Flash Deal",
      emoji: "⚡",
      gradient: "from-[#667eea] to-[#764ba2]",
    },
    {
      id: 2,
      title: "Free delivery\nall week",
      code: "Student special",
      badge: "Student",
      emoji: "🎓",
      gradient: "from-[#f093fb] to-[#f5576c]",
    },
    {
      id: 3,
      title: "15% off\nwith HBL",
      code: "Selected restaurants",
      badge: "Card Deal",
      emoji: "💳",
      gradient: "from-[#4facfe] to-[#00f2fe]",
    },
    {
      id: 4,
      title: "Combo builder\nfrom Rs.600",
      code: "Mix restaurants freely",
      badge: "New!",
      emoji: "🍱",
      gradient: "from-[#43e97b] to-[#38f9d7]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FEFAF5]">
      <Navigation
        onAuthClick={(mode) => {
          setAuthMode(mode);
          setShowAuthModal(true);
        }}
      />

      {/* Search Section */}
      <div className="px-9 pt-9 flex gap-2.5 items-center">
        <div className="flex-1 max-w-[520px] relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search restaurants, cuisines, dishes…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-4 rounded-2xl border-[1.5px] border-[#F0EBE3] bg-white text-sm font-semibold text-[#1A1A2E] outline-none transition-all focus:border-[#FF6B35] focus:shadow-[0_0_0_4px_rgba(255,107,53,0.1)]"
          />
        </div>
        <button
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border-[1.5px] border-[#F0EBE3] bg-white text-[13px] font-bold text-[#4A4560] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all whitespace-nowrap"
        >
          📍 {user?.location || "Set location"}
        </button>
      </div>

      {/* Budget Banner - UC-07, UC-08, UC-09 */}
      {user && (
        <div className="mx-9 mt-5 bg-gradient-to-br from-[#FF6B35] to-[#FF8C5A] rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4 shadow-[0_8px_28px_rgba(255,107,53,0.25)] flex-wrap">
          <div className="flex items-center gap-3">
            <div className="text-3xl md:text-4xl">🤖</div>
            <div>
              <h3 className="font-serif text-base md:text-lg font-semibold text-white mb-0.5">
                AI Budget Mode active
              </h3>
              <p className="text-xs text-white/80 font-medium">
                Showing meals within your monthly budget
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div>
              <div className="text-[10px] text-white/70 font-bold tracking-wider uppercase mb-0.5">
                Remaining
              </div>
              <div className="font-serif text-2xl md:text-3xl font-semibold text-white">
                Rs.{budgetRemaining.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="py-2 px-4 rounded-xl bg-white border-none text-xs font-bold text-[#FF6B35] hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Edit Budget
            </button>
            <button
              onClick={toggleEndOfMonthMode}
              className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl border-none text-[11px] font-bold text-white transition-all whitespace-nowrap ${endOfMonthMode ? "bg-white/40" : "bg-white/20"}`}
            >
              {endOfMonthMode
                ? "✓ EOM Active"
                : "⚡ End-of-Month"}
            </button>
          </div>
        </div>
      )}

      {/* Categories - UC-10 */}
      <div className="px-9 pt-7">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E] mb-4">
          What are you craving?
        </h2>
        <div className="flex gap-2 flex-wrap mb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-4 rounded-3xl text-[13px] font-bold border-[1.5px] transition-all ${
                selectedCategory === cat
                  ? "bg-[#FFF0E8] border-[rgba(255,107,53,0.3)] text-[#FF6B35]"
                  : "bg-white border-[#F0EBE3] text-[#4A4560] hover:bg-[#FFF0E8] hover:text-[#FF6B35]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Promos - UC-14, UC-15 */}
      <div className="px-9 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E]">
            Today's Promos
          </h2>
          <button className="text-[13px] font-bold text-[#FF6B35]">
            See all
          </button>
        </div>
        <div className="flex gap-3.5 overflow-x-auto pb-1 scrollbar-hide">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`min-w-[240px] rounded-2xl p-4 md:p-5 relative overflow-hidden flex-shrink-0 cursor-pointer hover:-translate-y-1 transition-transform bg-gradient-to-br ${promo.gradient}`}
            >
              <div className="inline-block bg-white/20 rounded-lg px-2.5 py-0.5 text-[10px] font-extrabold text-white tracking-wider uppercase mb-2">
                {promo.badge}
              </div>
              <h4 className="font-serif text-lg md:text-xl font-semibold text-white mb-1 leading-tight whitespace-pre-line">
                {promo.title}
              </h4>
              <p className="text-xs text-white/80 font-semibold">
                {promo.code}
              </p>
              <div className="absolute bottom-0 right-2.5 text-5xl md:text-6xl opacity-30">
                {promo.emoji}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Picks - UC-20 */}
      <div className="px-9 pt-6">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E] mb-4">
          AI Picks for You
        </h2>
        <div className="bg-gradient-to-br from-[#0F0F23] to-[#1A1A3E] rounded-2xl p-5 md:p-6 flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(106,90,205,0.25),transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-serif text-lg md:text-xl font-semibold text-white mb-1">
              ✨ Personalised just for you
            </h3>
            <p className="text-[13px] text-white/50 font-medium mb-2.5">
              Based on your budget, location and taste
              preferences
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="py-1 px-3 rounded-3xl bg-white/10 text-[11px] font-bold text-white/65">
                🥦 Halal
              </span>
              <span className="py-1 px-3 rounded-3xl bg-white/10 text-[11px] font-bold text-white/65">
                💰 Under Rs.800
              </span>
              <span className="py-1 px-3 rounded-3xl bg-white/10 text-[11px] font-bold text-white/65">
                ⭐ 4.5+ rated
              </span>
              <span className="py-1 px-3 rounded-3xl bg-white/10 text-[11px] font-bold text-white/65">
                📍 Under 2km
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowPrefsModal(true)}
            className="relative z-10 py-3 px-5 md:px-6 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] border-none text-[13px] font-bold text-white hover:-translate-y-0.5 transition-all whitespace-nowrap flex-shrink-0 shadow-[0_4px_18px_rgba(102,126,234,0.4)]"
          >
            Get My Picks →
          </button>
        </div>
      </div>

      {/* Restaurants - UC-11 */}
      <div className="px-9 pt-7 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E]">
            Restaurants near you
          </h2>
          <button
            onClick={() => navigate("/restaurants")}
            className="text-[13px] font-bold text-[#FF6B35]"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRestaurants.slice(0, 8).map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() =>
                navigate(`/restaurant/${restaurant.id}`)
              }
              className="bg-white rounded-2xl border border-[#F0EBE3] overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)]"
            >
              <div className="h-32 flex items-center justify-center text-5xl md:text-6xl relative bg-gradient-to-br from-orange-50 to-orange-100">
                {restaurant.emoji}
                {restaurant.isNew && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-extrabold py-1 px-2.5 rounded-lg bg-[#E8FFF5] text-[#06D6A0] border border-[#06D6A0]">
                    New
                  </span>
                )}
                {restaurant.hasDeal && (
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-extrabold py-1 px-2.5 rounded-lg bg-[#FFF0E8] text-[#FF6B35] border border-[#FF6B35]">
                    Deal
                  </span>
                )}
                {restaurant.isBudgetFriendly && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-extrabold py-1 px-2.5 rounded-lg bg-[#E8FFF5] text-[#06D6A0] border border-[#06D6A0]">
                    ✓ Budget
                  </span>
                )}
              </div>
              <div className="p-3.5">
                <h4 className="text-sm font-extrabold text-[#1A1A2E] mb-1">
                  {restaurant.name}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-[#9B96B0] font-semibold mb-2.5">
                  <span className="text-[#FFB020]">★</span>
                  {restaurant.rating} ·{" "}
                  {restaurant.deliveryTime} ·{" "}
                  {restaurant.cuisine}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#06D6A0]">
                    From Rs.{restaurant.priceFrom}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (restaurant.menu[0]) {
                        addToCart(
                          restaurant.id,
                          restaurant.name,
                          restaurant.menu[0],
                        );
                      }
                    }}
                    className="w-7 h-7 rounded-lg bg-[#FFF0E8] border-none text-base text-[#FF6B35] font-extrabold flex items-center justify-center hover:bg-[#FF6B35] hover:text-white hover:scale-110 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vouchers - UC-16, UC-17, UC-18 */}
      <div className="px-9 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E]">
            Your Vouchers
          </h2>
          <button
            onClick={() => setShowVouchersModal(true)}
            className="text-[13px] font-bold text-[#FF6B35]"
          >
            View all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {vouchers.slice(0, 4).map((voucher) => (
            <div
              key={voucher.id}
              className="min-w-[180px] bg-white border-[1.5px] border-dashed border-[rgba(255,107,53,0.4)] rounded-2xl p-3.5 flex-shrink-0 cursor-pointer hover:bg-[#FFF0E8] hover:-translate-y-0.5 transition-all relative"
            >
              <div
                className={`absolute top-2.5 right-2.5 text-[9px] font-extrabold py-0.5 px-2 rounded-md ${
                  voucher.category === "student"
                    ? "bg-[#EEF2FF] text-[#6366F1]"
                    : "bg-[#FFF0E8] text-[#FF6B35]"
                }`}
              >
                {voucher.category?.toUpperCase()}
              </div>
              <div className="font-serif text-3xl font-semibold text-[#FF6B35] leading-none mb-1">
                {voucher.type === "percentage"
                  ? `${voucher.discount}%`
                  : `Rs.${voucher.discount}`}
              </div>
              <div className="text-xs font-bold text-[#1A1A2E] mb-0.5">
                {voucher.description}
              </div>
              <div className="text-[10px] text-[#9B96B0] font-semibold">
                {voucher.expiresIn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Ordering - UC-22, UC-23, UC-24, UC-25 */}
      <div className="px-9 pt-4 pb-9">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E] mb-4">
          Group Ordering
        </h2>
        <div className="bg-white rounded-2xl border border-[#F0EBE3] p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="flex">
              {["Y", "A", "M", "+2"].map((letter, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full border-[2.5px] border-white flex items-center justify-center text-xs font-extrabold text-white ${i > 0 ? "-ml-2.5" : ""}`}
                  style={{
                    backgroundColor: [
                      "#FF6B35",
                      "#667eea",
                      "#06D6A0",
                      "#f5576c",
                    ][i],
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#1A1A2E] mb-0.5">
                Friday lunch group
              </h4>
              <p className="text-xs text-[#9B96B0] font-medium">
                5 members · Budget: Rs.5,000 total
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right font-serif text-[13px] text-[#4A4560]">
              Each pays
              <span className="block text-xl font-semibold text-[#FF6B35]">
                Rs.1,000
              </span>
            </div>
            <button
              onClick={() => navigate("/group-order")}
              className="py-2 px-5 rounded-xl bg-[#FF6B35] border-none text-[13px] font-bold text-white hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(255,107,53,0.3)]"
            >
              Customise my share
            </button>
          </div>
        </div>
      </div>
      {/* Cross-Restaurant Combo - UC-21 */}
      <div className="px-9 pt-4 pb-9">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#1A1A2E] mb-4">
          Cross-Restaurant Combo
        </h2>
        <div className="bg-white rounded-2xl border border-[#F0EBE3] p-5 md:p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <div className="flex">
              {["🍕", "🍔", "🌮", "🍜"].map((emoji, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full border-[2.5px] border-white flex items-center justify-center text-sm bg-[#FFF0E8] ${i > 0 ? "-ml-2.5" : ""}`}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#1A1A2E] mb-0.5">
                Mix & match your favourites
              </h4>
              <p className="text-xs text-[#9B96B0] font-medium">
                Order from multiple restaurants in one go
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/combo")}
              className="py-2 px-5 rounded-xl bg-[#FF6B35] border-none text-[13px] font-bold text-white hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(255,107,53,0.3)]"
            >
              Build a Combo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] px-9 py-9 flex items-center justify-between gap-4 flex-wrap">
        <div className="font-serif text-xl md:text-2xl font-semibold text-white">
          Pocket<span className="text-[#FF6B35]">Plate</span>
        </div>
        <div className="flex gap-4 md:gap-5 flex-wrap text-xs font-semibold text-white/40">
          <a
            href="#"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Browse Restaurants
          </a>
          <a
            href="#"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Daily Updates
          </a>
          <a
            href="#"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Order History
          </a>
          <a
            href="#"
            className="hover:text-[#FF6B35] transition-colors"
          >
            Help
          </a>
        </div>
        <div className="text-[11px] text-white/20 font-medium">
          AI-powered budget food ordering
        </div>
      </footer>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(m) => setAuthMode(m)}
        />
      )}
      {showBudgetModal && (
        <BudgetModal
          onClose={() => setShowBudgetModal(false)}
        />
      )}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
        />
      )}
      {showPrefsModal && (
        <PreferencesModal
          onClose={() => setShowPrefsModal(false)}
        />
      )}
      {showVouchersModal && (
        <VouchersModal
          onClose={() => setShowVouchersModal(false)}
        />
      )}
    </div>
  );
}