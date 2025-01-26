import React from "react";
import { Metadata } from "next";
import Filters from "./_components/Filters";
import NavBreadCrumb from "@/components/NavBreadCrumb";
import MainContent from "./_components/main-content";

export const metadata: Metadata = {
  title: "Search Cars - Your Car Dealership",
  description: "Search and filter through our extensive collection of vehicles",
};

const breadcrumbItems = [
  { label: "Auto Hunt", href: "/" },
  { label: "94662 results cars found" },
];

const SearchPage = () => {
  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-3">
          {/* Breadcrumb */}
          <NavBreadCrumb breadcrumbItems={breadcrumbItems} />
          {/* Filters and Results Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Filters Sidebar */}
            <Filters />
            {/* Main Content */}
            <MainContent />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
