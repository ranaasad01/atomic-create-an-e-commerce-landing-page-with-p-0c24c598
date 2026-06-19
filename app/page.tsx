"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, RefreshCw, Headphones, Sparkles, ChevronRight, Mail, Check } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CATEGORIES, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 249,
    originalPrice: 349,
    rating: 4.8,
    reviewCount: 2341,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/0c24c598-1ae8-46f7-b6a4-1c6870a1563e/0da5acd20340497cbdd6938680205b89.png",
    badge: "Best Seller",
    isSale: true,
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    category: "Fashion",
    price: 189,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 876,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/0c24c598-1ae8-46f7-b6a4-1c6870a1563e/a3b68ee755104c92845824f1e69af8cb.png",
    badge: "New",
    isNew: true,
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Coffee Set",
    category: "Home & Living",
    price: 79,
    originalPrice: 110,
    rating: 4.7,
    reviewCount: 1204,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    isSale: true,
  },
  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    category: "Beauty",
    price: 58,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 3102,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/0c24c598-1ae8-46f7-b6a4-1c6870a1563e/4b3408a542bf431f983244caadecb15d.png",
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "Ultralight Running Shoes",
    category: "Sports",
    price: 135,
    originalPrice: 180,
    rating: 4.8,
    reviewCount: 654,
    image: "https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/64/best-lightweight-running-shoes-001-22300149-main.jpg",
    badge: "Sale",
    isSale: true,
  },
  {
    id: 6,
    name: "Linen Oversized Blazer",
    category: "Fashion",
    price: 215,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 432,
    image: "https://magiclinen.com/cdn/shop/products/HEBER-blazer-in-natural-melage-ROME-pants-in-natural-melange-OLINDA-top-in-white-1.jpg?v=1717593916&width=1946",
    badge: "New",
    isNew: true,
  },
  {
    id: 7,
    name: "Smart Desk Lamp with USB-C",
    category: "Electronics",
    price: 89,
    originalPrice: 120,
    rating: 4.7,
    reviewCount: 987,
    image: "https://m.media-amazon.com/images/I/61XSwuYF6-L.jpg",
    badge: "Sale",
    isSale: true,
  },
  {
    id: 8,
    name: "Bamboo Yoga Mat Premium",
    category: "Sports",
    price: 68,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 1567,
    image: "https://i.ebayimg.com/images/g/ImEAAOSwZ91gbdVi/s-l1200.jpg",
    badge: "Eco Pick",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia Laurent",
    role: "Interior Designer",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sophia_Loren_-_1959.jpg/250px-Sophia_Loren_-_1959.jpg",
    rating: 5,
    text: "Lumière has completely transformed how I shop. Every product I've ordered has exceeded my expectations — the quality is simply unmatched.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Tech Entrepreneur",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and products that actually live up to the hype. I've recommended Lumière to everyone I know.",
  },
  {
    id: 3,
    name: "Amara Osei",
    role: "Wellness Coach",
    avatar: "https://www.stay4skill.com/_next/image?url=https%3A%2F%2Fwugqzhebdtnnuxlxtwlt.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Favatars%2Famara-osei.jpg&w=3840&q=75",
    rating: 5,
    text: "The curation here is incredible. I trust Lumière to only carry things that are genuinely worth buying — it saves me so much time.",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "Complimentary shipping on all orders over $75. Delivered in 2–4 business days.",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Every product is backed by our comprehensive warranty and quality guarantee.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love? Return anything within 30 days for a full, no-questions-asked refund.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our expert team is always here to help — via chat, email, or phone.",
  },
];

const categoryCards = [
  {
    label: "Electronics",
    description: "Cutting-edge tech",
    image: "https://betinasia.zendesk.com/hc/article_attachments/22178895521170",
    color: "from-blue-600/80 to-indigo-900/80",
  },
  {
    label: "Fashion",
    description: "Timeless style",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Arduino_ftdi_chip-1.jpg",
    color: "from-rose-500/80 to-pink-900/80",
  },
  {
    label: "Home & Living",
    description: "Elevate your space",
    image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90",
    color: "from-amber-500/80 to-orange-900/80",
  },
  {
    label: "Beauty",
    description: "Glow naturally",
    image: "https://media.designcafe.com/wp-content/uploads/2020/12/21184029/living-room-furniture-decor-ideas.jpg",
    color: "from-purple-500/80 to-violet-900/80",
  },
  {
    label: "Sports",
    description: "Perform at your best",
    image: "https://i.natgeofe.com/n/7d6772b3-19d0-440b-9516-cd587da5b4ee/modern-beauty-modest-fashion-week-makeup.jpg",
    color: "from-green-500/80 to-emerald-900/80",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">
        {rating.toFixed(1)} ({(count ?? 0).toLocaleString()})
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.isSale
                ? "bg-orange-500 text-white"
                : product.isNew
                ? "bg-emerald-500 text-white"
                : "bg-gray-900 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-600">
            -{discount}%
          </span>
        )}
        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-medium text-orange-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviewCount} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-20">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            {...(shouldReduceMotion ? {} : { initial: "hidden", animate: "visible" })}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: "#130901", backgroundColor: "#ffedd5" }}>
                <Sparkles className="w-3.5 h-3.5" />
                New Season coming soon
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-6"
            >
              {APP_NAME}
              <span className="block text-orange-500">Curated.</span>
              <span className="block">Crafted. Loved.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md"
            >
              {APP_TAGLINE}. Discover premium products handpicked by our experts — from cutting-edge electronics to timeless fashion and beyond.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-200 transition-colors duration-200"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#categories"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#categories")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-7 py-3.5 rounded-2xl border border-gray-200 shadow-sm transition-colors duration-200"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200"
            >
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "1,200+", label: "Premium Products" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right hero image grid */}
          <motion.div
            variants={shouldReduceMotion ? fadeIn : slideInRight}
            {...(shouldReduceMotion ? {} : { initial: "hidden", animate: "visible" })}
            className="relative hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
                <img
                  src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2Fsugarhill-spring-summer-2026-collection-python-rikuya-hayashi-intervew-000.jpg?fit=max&w=720&q=90"
                  alt="Curated fashion lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
                <img
                  src="https://image-cdn.hypb.st/https%3A%2F%2Fhbx.hypebeast.com%2Ffiles%2Fsugarhill-spring-summer-2026-collection-python-rikuya-hayashi-intervew-000.jpg?fit=max&w=720&q=90"
                  alt="Premium electronics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-xl">
                <img
                  src="https://www.hansonbuilders.com/blog/wp-content/uploads/2025/05/photo-0072-scaled.jpg"
                  alt="Home living essentials"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl">
                <img
                  src="https://www.hansonbuilders.com/blog/wp-content/uploads/2025/05/photo-0072-scaled.jpg"
                  alt="Beauty and skincare"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Just purchased</p>
                <p className="text-sm font-semibold text-gray-900">Leather Watch</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex items-start gap-4"
              >
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <vp.icon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{vp.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{vp.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Featured Products
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Handpicked for You
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto text-lg">
              Our editors select only the finest products across every category — quality you can feel, style you can trust.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={fadeIn}
            {...motionProps}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Product Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* View All */}
          <motion.div
            variants={fadeInUp}
            {...motionProps}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors duration-200"
            style={{ fontSize: "22px" }}
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Shop by Category
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontSize: "30px" }}>
              Find Your Style
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto text-lg">
              From the latest tech to everyday essentials — explore our curated categories and discover something new.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {categoryCards.map((cat) => (
              <motion.div
                key={cat.label}
                variants={scaleIn}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                onClick={() => {
                  setActiveCategory(cat.label as Category);
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-base leading-tight">{cat.label}</p>
                  <p className="text-white/80 text-xs mt-0.5">{cat.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-white/90 text-xs font-medium">
                    Shop now <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sale Banner ───────────────────────────────────────────────────── */}
      <section id="sale" className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={slideInLeft}>
              <p className="text-orange-100 text-sm font-semibold uppercase tracking-widest mb-4">
                Limited Time Offer
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
                Up to 40% Off<br />Summer Essentials
              </h2>
              <p className="text-orange-100 text-lg leading-relaxed mb-8 max-w-md">
                Don't miss our biggest sale of the season. Premium products at unbeatable prices — for a limited time only.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: "#fff" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setActiveCategory("All");
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl shadow-xl transition-colors duration-200"
              >
                Shop the Sale
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="grid grid-cols-2 gap-4"
            >
              {products
                .filter((p) => p.isSale)
                .slice(0, 4)
                .map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.04 }}
                    className="bg-white/15 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-white text-xs font-semibold line-clamp-1">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white font-bold text-sm">${p.price}</span>
                        {p.originalPrice && (
                          <span className="text-orange-200 text-xs line-through">${p.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Customer Love
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              What Our Customers Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-xl mx-auto text-lg">
              Thousands of happy customers trust Lumière for their everyday essentials and special finds.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            {...motionProps}
          >
            <motion.div
              variants={scaleIn}
              className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-8 h-8 text-orange-500" />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Stay in the Loop
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Get 15% Off Your First Order
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and curated style guides delivered straight to your inbox.
            </motion.p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-8 py-5"
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">You're subscribed!</p>
                  <p className="text-sm text-emerald-600">Check your inbox for your 15% discount code.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm text-gray-900 placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200 whitespace-nowrap shadow-lg shadow-orange-200"
                >
                  Subscribe & Save
                </motion.button>
              </motion.form>
            )}

            <motion.p variants={fadeInUp} className="text-xs text-gray-400 mt-4">
              No spam, ever. Unsubscribe at any time. We respect your privacy.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}