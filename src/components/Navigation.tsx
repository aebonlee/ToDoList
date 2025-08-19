import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  UserIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigationItems = [
  {
    name: '대시보드',
    href: '/',
    icon: HomeIcon,
    description: '메인 할일 관리'
  },
  {
    name: '내 프로젝트',
    href: '/projects',
    icon: DocumentTextIcon,
    description: '프로젝트별 할일 관리'
  },
  {
    name: '프로필',
    href: '/profile',
    icon: UserIcon,
    description: '개인 정보 관리'
  },
  {
    name: '설정',
    href: '/settings',
    icon: Cog6ToothIcon,
    description: '앱 설정 및 환경설정'
  },
  {
    name: '도움말',
    href: '/help',
    icon: InformationCircleIcon,
    description: '사용법 및 FAQ'
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-card border-b border-app shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-app">📝</span>
              <span className="ml-2 text-xl font-semibold text-app hidden sm:block">
                Enhanced TodoList
              </span>
              <span className="ml-3 text-sm bg-accent text-white px-2 py-1 rounded-full font-medium">
                {mode}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-accent text-white shadow-md'
                        : 'text-app hover:bg-accent-weak hover:scale-105'
                    }`
                  }
                  title={item.description}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-app hover:bg-accent-weak transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">메뉴 열기</span>
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-app bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1 fade-in">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-accent text-white shadow-md'
                          : 'text-app hover:bg-accent-weak'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-xs mt-0.5 ${
                        isActive ? 'text-white opacity-80' : 'text-muted'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}