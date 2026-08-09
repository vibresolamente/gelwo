'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'SW';
export type Theme = 'dark' | 'light';

export interface ERPNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'system' | 'project' | 'tender' | 'quote';
  read: boolean;
}

export interface InquiryItem {
  id: string;
  service: string;
  details: string;
  estimatedCost?: string;
}

interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (o: boolean) => void;
  isVoiceSearchOpen: boolean;
  setIsVoiceSearchOpen: (o: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (o: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (o: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (o: boolean) => void;
  notifications: ERPNotification[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
  inquiryCart: InquiryItem[];
  addToCart: (item: InquiryItem) => void;
  removeFromCart: (id: string) => void;
  accessibility: {
    highContrast: boolean;
    textScale: boolean;
    reduceMotion: boolean;
  };
  updateAccessibility: (key: 'highContrast' | 'textScale' | 'reduceMotion') => void;
  activeQuotationCategory: string | null;
  setActiveQuotationCategory: (cat: string | null) => void;
  triggerQuotationModal: (serviceName?: string) => void;
  isQuotationOpen: boolean;
  setIsQuotationOpen: (o: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialNotifications: ERPNotification[] = [
  {
    id: 'n1',
    title: 'Solar Grid ERP Update',
    message: '500kW Solar Installation in Nakuru County completed & commissioned.',
    time: '5 mins ago',
    type: 'project',
    read: false,
  },
  {
    id: 'n2',
    title: 'Government Tender Awarded',
    message: 'GELWO Technologies awarded National ICT Infrastructure Expansion project.',
    time: '1 hour ago',
    type: 'tender',
    read: false,
  },
  {
    id: 'n3',
    title: 'AI Quotation System',
    message: 'New automated quotation query generated for Commercial Security System.',
    time: '3 hours ago',
    type: 'quote',
    read: false,
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('EN');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);
  const [activeQuotationCategory, setActiveQuotationCategory] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<ERPNotification[]>(initialNotifications);
  const [inquiryCart, setInquiryCart] = useState<InquiryItem[]>([
    { id: 'i1', service: 'ICT & Security', details: 'Enterprise Fiber & CCTV System', estimatedCost: 'KSh 450,000' }
  ]);

  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    textScale: false,
    reduceMotion: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addToCart = (item: InquiryItem) => {
    setInquiryCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setInquiryCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateAccessibility = (key: 'highContrast' | 'textScale' | 'reduceMotion') => {
    setAccessibility((prev) => {
      const nextState = { ...prev, [key]: !prev[key] };
      const body = document.body;
      if (key === 'highContrast') {
        body.classList.toggle('high-contrast', nextState.highContrast);
      }
      if (key === 'textScale') {
        body.classList.toggle('large-text', nextState.textScale);
      }
      if (key === 'reduceMotion') {
        body.classList.toggle('reduce-motion', nextState.reduceMotion);
      }
      return nextState;
    });
  };

  const triggerQuotationModal = (serviceName?: string) => {
    if (serviceName) {
      setActiveQuotationCategory(serviceName);
    }
    setIsQuotationOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        isSearchOpen,
        setIsSearchOpen,
        isVoiceSearchOpen,
        setIsVoiceSearchOpen,
        isLoginOpen,
        setIsLoginOpen,
        isCartOpen,
        setIsCartOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        notifications,
        markNotificationRead,
        unreadCount,
        inquiryCart,
        addToCart,
        removeFromCart,
        accessibility,
        updateAccessibility,
        activeQuotationCategory,
        setActiveQuotationCategory,
        triggerQuotationModal,
        isQuotationOpen,
        setIsQuotationOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
