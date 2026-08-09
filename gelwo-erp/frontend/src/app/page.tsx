'use client';

import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: 'Hello, John! 👋 How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sidebarLinks = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'CRM', icon: '👥' },
    { name: 'Quotations', icon: '📝' },
    { name: 'Sales & Orders', icon: '🛒' },
    { name: 'Projects', icon: '🏗️' },
    { name: 'Invoices & Payments', icon: '💳' },
    { name: 'Inventory', icon: '📦' },
    { name: 'Procurement', icon: '🚚' },
    { name: 'Services', icon: '⚙️' },
    { name: 'Expenses', icon: '💰' },
    { name: 'Human Resource', icon: '👔' },
    { name: 'Fleet Management', icon: '🚜' },
    { name: 'Reports & Analytics', icon: '📈' },
    { name: 'Documents', icon: '📁' },
    { name: 'Settings', icon: '⚙️' },
  ];

  const recentQuotations = [
    { id: 'QTN-2026-0048', client: 'County Government', amount: 'KSh 1,250,000', status: 'Pending', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'QTN-2026-0047', client: 'NGO Organization', amount: 'KSh 850,000', status: 'Sending', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'QTN-2026-0046', client: 'School Institution', amount: 'KSh 620,000', status: 'Draft', bg: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
    { id: 'QTN-2026-0045', client: 'Company Ltd', amount: 'KSh 2,450,000', status: 'Approved', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'QTN-2026-0044', client: 'Individual', amount: 'KSh 135,000', status: 'Sent', bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  ];

  const activeProjects = [
    { id: 'PRJ-2026-001', name: 'CCTV Installation - Kakamega County', progress: 60 },
    { id: 'PRJ-2026-002', name: 'Solar System - School Project', progress: 40 },
    { id: 'PRJ-2026-003', name: 'Office Complex - Construction', progress: 25 },
    { id: 'PRJ-2026-004', name: 'ICT Infrastructure Upgrade', progress: 75 },
  ];

  const upcomingTasks = [
    { title: 'Follow up on quotation QTN-2026-0048', time: '10:00 AM' },
    { title: 'Site visit - Solar Project', time: '12:00 PM' },
    { title: 'Invoice INV-2026-0032 due tomorrow', time: '2:30 PM' },
    { title: 'Team meeting', time: '4:00 PM' },
  ];

  const notifications = [
    { text: 'New quotation request received', time: '2 mins ago' },
    { text: 'Payment received from County Govt', time: '15 mins ago' },
    { text: 'Project PRJ-2026-001 updated', time: '1 hour ago' },
    { text: 'New user registered: Silas Wakesa', time: '2 hours ago' },
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputMessage('');

    setTimeout(() => {
      let response = "I've analyzed your ERP database query. Everything is operating within normal parameters.";
      if (userMsg.toLowerCase().includes('delayed')) {
        response = "Currently 1 project is behind schedule: PRJ-2026-003 (Office Complex) due to cement supply logistics.";
      } else if (userMsg.toLowerCase().includes('selling') || userMsg.toLowerCase().includes('services')) {
        response = "Top selling services this month: 1. Solar Energy Solutions (30%), 2. CCTV & Security Systems (25%), 3. Electrical Services (18%).";
      } else if (userMsg.toLowerCase().includes('pending') || userMsg.toLowerCase().includes('invoices')) {
        response = "There are 32 pending invoices totaling KSh 4,120,000 across 12 institutional clients.";
      } else if (userMsg.toLowerCase().includes('report')) {
        response = "Generated Sales Summary Report for August 2026: Total Revenue KSh 12,450,000 with +12.5% MoM growth.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: response }]);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-[#070B19] text-white overflow-hidden font-sans">
      {/* Left ERP Sidebar */}
      <aside className="w-64 bg-[#0A0F1D] border-r border-slate-800 flex flex-col justify-between flex-shrink-0 hidden md:flex">
        <div>
          {/* Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-cyan-500/20">
              G
            </div>
            <div>
              <span className="text-sm font-extrabold text-white font-heading block leading-none">GELWO</span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold block mt-0.5">Technologies ERP</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto">
            {sidebarLinks.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
          GELWO ERP v4.2 • Admin Access
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-[#0A0F1D]/90 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center space-x-3 w-72">
            <span className="text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs">
              🌐 EN
            </button>
            <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs relative">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                4
              </span>
            </button>

            {/* Profile Badge */}
            <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-white text-xs">
                JG
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block leading-none">John Griffin</span>
                <span className="text-[10px] text-cyan-400 block mt-0.5">System Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* Welcome Header */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">Dashboard</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, John! Here's what's happening with your business today.
            </p>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Total Revenue</span>
                <span className="text-emerald-400 font-bold">↑ 12.5%</span>
              </div>
              <span className="text-2xl font-extrabold text-white font-heading block">KSh 12,450,000</span>
              <span className="text-[10px] text-slate-500 mt-1 block">from last month</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>New Quotations</span>
                <span className="text-emerald-400 font-bold">↑ 20%</span>
              </div>
              <span className="text-2xl font-extrabold text-white font-heading block">24</span>
              <span className="text-[10px] text-slate-500 mt-1 block">from last month</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Active Projects</span>
                <span className="text-emerald-400 font-bold">↑ 8%</span>
              </div>
              <span className="text-2xl font-extrabold text-white font-heading block">18</span>
              <span className="text-[10px] text-slate-500 mt-1 block">from last month</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Pending Invoices</span>
                <span className="text-red-400 font-bold">↓ 5%</span>
              </div>
              <span className="text-2xl font-extrabold text-white font-heading block">32</span>
              <span className="text-[10px] text-slate-500 mt-1 block">from last month</span>
            </div>
          </div>

          {/* Charts Row: Revenue Overview & Sales by Service */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Revenue Overview Chart */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white font-heading">Revenue Overview</h3>
                <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  This Month ▾
                </span>
              </div>

              {/* Line Chart Visualization */}
              <div className="h-52 w-full flex items-end justify-between pt-6 px-2 gap-2 border-b border-slate-800 pb-2">
                {[35, 45, 60, 50, 75, 90, 85, 100, 95, 110, 125, 130].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm transition-all hover:opacity-80"
                      style={{ height: `${(val / 130) * 100}%` }}
                    />
                    <span className="text-[9px] text-slate-500 font-mono">
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales by Service Donut Chart */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0E1528] border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white font-heading mb-4">Sales by Service</h3>

                {/* Donut Simulation */}
                <div className="flex items-center justify-center my-4 relative">
                  <div className="w-36 h-36 rounded-full border-[14px] border-blue-600 border-t-cyan-400 border-r-amber-400 border-l-purple-500 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-xs text-slate-400 block font-mono">Total</span>
                      <span className="text-sm font-extrabold text-white font-heading">KSh 12.45M</span>
                    </div>
                  </div>
                </div>

                {/* Legend List */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>Solar Solutions (30%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span>CCTV & Security (25%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Electrical (18%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>ICT Solutions (15%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Row: Recent Quotations & Active Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Quotations */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white font-heading">Recent Quotations</h3>
                <span className="text-xs text-cyan-400 hover:underline cursor-pointer">View All</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-500 border-b border-slate-800 text-[10px] uppercase font-mono">
                    <tr>
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Client</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {recentQuotations.map((q, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-2.5 font-mono text-cyan-300">{q.id}</td>
                        <td className="py-2.5 font-medium text-slate-200">{q.client}</td>
                        <td className="py-2.5 font-bold text-white">{q.amount}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${q.bg}`}>
                            {q.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Projects */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-white font-heading">Active Projects</h3>
                <span className="text-xs text-cyan-400 hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-4">
                {activeProjects.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0A0F1D] border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono text-cyan-400 font-bold">{p.id}</span>
                      <span className="font-bold text-emerald-400">{p.progress}%</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{p.name}</p>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Grid: Tasks, Notifications & AI Business Assistant */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Upcoming Tasks */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <h3 className="text-sm font-bold text-white font-heading mb-4">Upcoming Tasks</h3>
              <div className="space-y-3">
                {upcomingTasks.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0A0F1D] border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-300">{t.title}</span>
                    <span className="text-cyan-400 font-mono text-[10px] bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      {t.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0E1528] border border-slate-800">
              <h3 className="text-sm font-bold text-white font-heading mb-4">Notifications</h3>
              <div className="space-y-3">
                {notifications.map((n, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0A0F1D] border border-slate-800 text-xs">
                    <p className="text-slate-200">{n.text}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive AI Business Assistant */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0E1528] border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🤖</span>
                    <h3 className="text-sm font-bold text-white font-heading">AI Business Assistant</h3>
                  </div>
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-mono">ERP Live</span>
                </div>

                {/* Prompt Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    "Show me projects delayed this month",
                    "What are our top selling services?",
                    "Show me pending invoices",
                    "Generate sales report"
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[10px] text-slate-300 text-left"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Chat Feed */}
                <div className="h-44 overflow-y-auto space-y-2 p-2 bg-[#0A0F1D] rounded-xl border border-slate-800 text-xs mb-3">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl text-xs max-w-[85%] ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-slate-900 text-cyan-200 border border-slate-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => handleSendMessage(inputMessage)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
