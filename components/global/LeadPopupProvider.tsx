'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import type { PackageValue } from '@/lib/validators';

const LeadPopup = dynamic(() => import('./LeadPopup').then((m) => m.LeadPopup), { ssr: false });

type Ctx = {
  isOpen: boolean;
  presetPackage: PackageValue;
  openPopup: (preset?: PackageValue) => void;
  closePopup: () => void;
};

const LeadPopupContext = createContext<Ctx | null>(null);

export function LeadPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetPackage, setPresetPackage] = useState<PackageValue>('consult');

  const openPopup = useCallback((preset?: PackageValue) => {
    if (preset) setPresetPackage(preset);
    setIsOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ isOpen, presetPackage, openPopup, closePopup }),
    [isOpen, presetPackage, openPopup, closePopup],
  );

  return (
    <LeadPopupContext.Provider value={value}>
      {children}
      <LeadPopup />
    </LeadPopupContext.Provider>
  );
}

export function useLeadPopup() {
  const ctx = useContext(LeadPopupContext);
  if (!ctx) {
    throw new Error('useLeadPopup must be used within LeadPopupProvider');
  }
  return ctx;
}
