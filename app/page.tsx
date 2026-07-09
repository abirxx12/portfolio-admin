"use client";

import { useEffect, useState } from "react";
import PortfolioView from "@/components/PortfolioView";
import AdminPanel from "@/components/AdminPanel";
import { defaultPortfolioData } from "@/lib/defaultData";
import { loadPortfolioData } from "@/lib/storage";
import { PortfolioData } from "@/lib/types";

export default function Home() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    setData(loadPortfolioData(defaultPortfolioData));
  }, []);

  return (
    <>
      <PortfolioView data={data} onOpenAdmin={() => setIsAdminOpen(true)} />
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        initialData={data}
        onDataChange={setData}
      />
    </>
  );
}