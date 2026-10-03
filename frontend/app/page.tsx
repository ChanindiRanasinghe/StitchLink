"use client";

import { useState } from "react";
import { Language } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GarmentCategoryShowcase from "@/components/GarmentCategoryShowcase";
import HowItWorksSection from "@/components/HowItWorksSection";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import MapLocationSection from "@/components/MapLocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import UserGuideModal from "@/components/UserGuideModal";
import ShopDashboardView from "@/components/ShopDashboardView";
import DressmakerDashboardView from "@/components/DressmakerDashboardView";
import AdminDashboardView from "@/components/AdminDashboardView";

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: "shop" | "dressmaker" | "admin";
  } | null>(null);

  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: "login" | "register";
    role: "shop" | "dressmaker" | "admin";
  }>({
    isOpen: false,
    mode: "login",
    role: "shop",
  });

  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const openAuth = (
    mode: "login" | "register",
    role: "shop" | "dressmaker" | "admin" = "shop"
  ) => {
    setAuthModal({ isOpen: true, mode, role });
  };

  const closeAuth = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  // If user is authenticated, render the role-specific dashboard
  if (currentUser) {
    if (currentUser.role === "shop") {
      return <ShopDashboardView onLogout={() => setCurrentUser(null)} />;
    }
    if (currentUser.role === "dressmaker") {
      return <DressmakerDashboardView onLogout={() => setCurrentUser(null)} />;
    }
    if (currentUser.role === "admin") {
      return <AdminDashboardView onLogout={() => setCurrentUser(null)} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] relative">
      
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={openAuth}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenGuide={() => setGuideModalOpen(true)}
      />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        <HeroSection onOpenAuth={openAuth} lang={currentLang} />
        <GarmentCategoryShowcase />
        <HowItWorksSection lang={currentLang} />
        <AIFeaturesSection />
        <BenefitsSection />
        <MapLocationSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenAdminAuth={() => openAuth("login", "admin")}
      />

      {/* Floating Beginner Guide & Help Button */}
      <button
        onClick={() => setGuideModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#2A9D8F] hover:bg-[#228479] text-white px-4 py-3 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 transition-transform hover:scale-105 border-2 border-white"
      >
        <span className="text-base">💡</span>
        <span>
          {currentLang === "si" ? "භාවිත මාර්ගෝපදේශය" : currentLang === "ta" ? "பயனர் வழிகாட்டி" : "Beginner Guide"}
        </span>
      </button>

      {/* Auth Modal Dialog */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuth}
        initialMode={authModal.mode}
        initialRole={authModal.role}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Beginner Guide Modal */}
      <UserGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        lang={currentLang}
      />

    </div>
  );
}
