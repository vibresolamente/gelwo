'use client';

import React, { useState } from 'react';
import {
  FiGrid, FiFileText, FiShoppingBag, FiFolder, FiCreditCard,
  FiDollarSign, FiFile, FiHelpCircle, FiUser, FiLogOut,
  FiSearch, FiBell, FiSettings, FiPlus, FiArrowRight, FiCheckCircle,
  FiDownload, FiTruck, FiSmartphone, FiChevronRight, FiClock
} from 'react-icons/fi';

export default function CustomerPortal() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showMobileMockups, setShowMobileMockups] = useState(true);

  const sidebarLinks = [
    { name: 'Dashboard', icon: FiGrid },
    { name: 'My Quotations', icon: FiFileText },
    { name: 'My Orders', icon: FiShoppingBag },
    { name: 'My Projects', icon: FiFolder },
    { name: 'Invoices', icon: FiCreditCard },
    { name: 'Payments', icon: FiDollarSign },
    { name: 'Documents', icon: FiFile },
    { name: 'Support Tickets', icon: FiHelpCircle },
    { name: 'My Profile', icon: FiUser },
  ];

  const recentProjects = [
    { name: 'Solar Installation - Kilimani Property', status: 'In Progress', progress: 68, badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { name: 'CCTV System - Office Building', status: 'In Progress', progress: 35, badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { name: 'ICT Equipment Supply', status: 'Planning', progress: 10, badgeBg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  ];

  const recentInvoices = [
    { id: 'INV-2026-0021', amount: 'KSh 250,000', status: 'Paid', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'INV-2026-0103', amount: 'KSh 125,000', status: 'Pending', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'INV-2026-0020', amount: 'KSh 75,000', status: 'Paid', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  ];

  return (
    <div className="flex h-screen bg-[#070B19] text-white overflow-hidden font-sans">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0A0F1D] border-r border-slate-800 flex flex-col justify-between flex-shrink-0 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-800/80 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-base">
              G
            </div>
            <div>
              <span className="text-base font-extrabold text-white font-heading block leading-none">GELWO</span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold block mt-0.5">Customer Portal</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
            <FiLogOut className="text-base" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-[#0A0F1D]/90 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <h1 className="text-sm sm:text-base font-bold font-heading text-white">Customer Portal</h1>
            <span className="text-xs text-slate-500 hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 hidden sm:inline">Account #GLW-88902</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMobileMockups(!showMobileMockups)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              <FiSmartphone />
              <span>{showMobileMockups ? 'Hide Mobile Views' : 'Show Mobile Views'}</span>
            </button>

            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-2.5 text-slate-500 text-sm" />
              <input
                type="text"
                placeholder="Search portal..."
                className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48"
              />
            </div>

            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400">
              <FiBell />
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
                EO
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block leading-none">Erick Otieno</span>
                <span className="text-[10px] text-cyan-400 block mt-0.5">Verified Client</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Area */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Welcome User Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E172C] via-[#0A0F1D] to-[#0E1528] border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Welcome, Erick Otieno! 👋
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Here’s an overview of your account, active projects, quotes, and billing statement.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center space-x-1.5">
                <FiPlus />
                <span>Request New Quote</span>
              </button>
            </div>
          </div>

          {/* 4 Stat Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-heading block">3</span>
                <span className="text-xs text-slate-400">Active Projects</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-heading block">2</span>
                <span className="text-xs text-slate-400">Pending Invoices</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-heading block">1</span>
                <span className="text-xs text-slate-400">Approved Quotes</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-heading block">5</span>
                <span className="text-xs text-slate-400">Completed Orders</span>
              </div>
            </div>
          </div>

          {/* Tables Section: Projects & Invoices */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* My Recent Projects */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white font-heading">My Recent Projects</h3>
                <span className="text-xs text-blue-400 hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-4">
                {recentProjects.map((prj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0A0F1D] border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-heading">{prj.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${prj.badgeBg}`}>
                        {prj.status}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Progress Status</span>
                        <span className="font-mono text-cyan-400 font-bold">{prj.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${prj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Recent Invoices */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white font-heading">My Recent Invoices</h3>
                <span className="text-xs text-blue-400 hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-3">
                {recentInvoices.map((inv, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0F1D] border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold font-mono text-white block">{inv.id}</span>
                      <span className="text-xs font-bold text-cyan-400">{inv.amount}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${inv.bg}`}>
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 rounded-xl bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 text-center transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                <FiPlus />
              </div>
              <span className="text-xs font-bold text-white block">Request New Quote</span>
            </button>

            <button className="p-4 rounded-xl bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 text-center transition-all group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                <FiTruck />
              </div>
              <span className="text-xs font-bold text-white block">Track My Order</span>
            </button>

            <button className="p-4 rounded-xl bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 text-center transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                <FiCreditCard />
              </div>
              <span className="text-xs font-bold text-white block">Make a Payment</span>
            </button>

            <button className="p-4 rounded-xl bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 text-center transition-all group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                <FiDownload />
              </div>
              <span className="text-xs font-bold text-white block">Download Documents</span>
            </button>
          </div>

          {/* Interactive Mobile UI Previews Section */}
          {showMobileMockups && (
            <div className="p-6 rounded-2xl bg-[#0E1528] border border-cyan-500/30 pt-6">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">
                  Mobile App & Customer Experience
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1">
                  Mobile Account, Quotation & Project Tracking
                </h3>
              </div>

              {/* 3 Phone Screen Mockup Frames */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Mobile Frame 1: Account & Projects Overview */}
                <div className="border-[6px] border-slate-800 rounded-[32px] bg-[#070B19] p-4 text-white shadow-2xl relative">
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4" />
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400">Welcome back,</span>
                      <h4 className="text-sm font-bold text-white font-heading">Erick Otieno</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">EO</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-600/30">
                    <span className="text-[10px] text-blue-200 block">Total Outstanding</span>
                    <span className="text-lg font-extrabold font-heading block mt-0.5">KSh 125,000</span>
                    <button className="mt-3 w-full py-1.5 bg-white text-blue-600 rounded-xl text-xs font-bold">
                      Make Payment
                    </button>
                  </div>

                  <span className="text-xs font-bold text-white block mb-2 font-heading">My Projects</span>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Solar Installation</span>
                        <span className="text-amber-400 font-bold">60%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-amber-400" />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>CCTV System</span>
                        <span className="text-blue-400 font-bold">30%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-blue-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Frame 2: Quotation Details Screen */}
                <div className="border-[6px] border-slate-800 rounded-[32px] bg-[#070B19] p-4 text-white shadow-2xl relative">
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4" />
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold font-heading">Quotation Details</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Approved
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono block">QTN-2026-0048</span>
                  <h4 className="text-sm font-bold text-cyan-300 font-heading mb-1">Solar Energy Solutions</h4>
                  <span className="text-lg font-extrabold text-white block mb-3 font-heading">KSh 1,250,000</span>

                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] mb-4">
                    <div className="flex justify-between text-slate-400">
                      <span>Solar Panels 10kW</span>
                      <span className="text-white font-mono">KSh 650,000</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Inverter 10kW</span>
                      <span className="text-white font-mono">KSh 250,000</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Batteries 10kWh</span>
                      <span className="text-white font-mono">KSh 180,000</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5">
                    <FiDownload />
                    <span>Download Quote</span>
                  </button>
                </div>

                {/* Mobile Frame 3: Track Project Screen */}
                <div className="border-[6px] border-slate-800 rounded-[32px] bg-[#070B19] p-4 text-white shadow-2xl relative">
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4" />
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                    <span className="text-xs font-bold font-heading">Track Project</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                      In Progress
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono block">PRJ-2026-001</span>
                  <h4 className="text-xs font-bold text-white font-heading mb-3">CCTV Installation - Kakamega County</h4>

                  <div className="space-y-3 pl-2 border-l-2 border-slate-800 text-[11px] relative mb-2">
                    <div className="relative pl-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -left-[18px] top-0.5" />
                      <span className="font-bold text-emerald-400 block">Project Initiated</span>
                      <span className="text-[9px] text-slate-500">20 Apr 2026</span>
                    </div>

                    <div className="relative pl-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -left-[18px] top-0.5" />
                      <span className="font-bold text-emerald-400 block">Site Survey Completed</span>
                      <span className="text-[9px] text-slate-500">25 Apr 2026</span>
                    </div>

                    <div className="relative pl-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute -left-[18px] top-0.5 animate-ping" />
                      <span className="font-bold text-cyan-300 block">Installation In Progress</span>
                      <span className="text-[9px] text-slate-400">05 May 2026</span>
                    </div>

                    <div className="relative pl-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700 absolute -left-[18px] top-0.5" />
                      <span className="text-slate-500 block">Testing & Handover</span>
                      <span className="text-[9px] text-slate-600">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

