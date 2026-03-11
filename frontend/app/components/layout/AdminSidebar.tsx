"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const navItems = [
    {
      href: '/admin/dashboard',
      icon: 'solar:document-add-bold-duotone',
      label: 'Nova Notícia',
    },
    {
      href: '/admin/arquivo',
      icon: 'solar:archive-minimalistic-bold-duotone',
      label: 'Postagens Antigas',
    },
  ];

  return (
    <aside className="w-64 bg-[#1B1B3A] text-white hidden md:flex flex-col fixed h-full shadow-xl">
      <div className="p-8 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#F97D0E] rounded-lg flex items-center justify-center">
          <Icon icon="solar:bengal-bold" className="text-white text-xl" />
        </div>
        <span className="font-black text-lg tracking-tighter italic">
          ADMIN<span className="text-[#F97D0E]">PANEL</span>
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-[#F97D0E]/20 to-transparent text-[#F97D0E] border-l-4 border-[#F97D0E]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon
                icon={item.icon}
                className={`text-xl ${
                  isActive ? '' : 'group-hover:scale-110 transition-transform'
                }`}
              />
              <span className="font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <Icon icon="solar:logout-3-bold-duotone" />
          <span className="font-medium">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}
