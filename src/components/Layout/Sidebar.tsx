import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Calendar,
  Trophy,
  Users,
  BarChart3,
  Settings,
  Bell,
  Contact,
  Plus,
  Eye } from
'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, onPageChange }) => {
  const { user, hasRole } = useAuth();

  const menuItems = [
  { id: 'dashboard', label: 'الرئيسية', icon: Home, roles: ['admin', 'race_organizer', 'horse_owner', 'judge', 'public_viewer'] },
  { id: 'races', label: 'إدارة السباقات', icon: Trophy, roles: ['admin', 'race_organizer'] },
  { id: 'horses', label: 'إدارة الخيول', icon: Users, roles: ['admin', 'horse_owner'] },
  { id: 'registration', label: 'تسجيل الخيول', icon: Plus, roles: ['horse_owner'] },
  { id: 'schedule', label: 'الجدولة والمواعيد', icon: Calendar, roles: ['admin', 'race_organizer', 'horse_owner', 'judge', 'public_viewer'] },
  { id: 'results', label: 'النتائج', icon: Trophy, roles: ['admin', 'judge', 'public_viewer'] },
  { id: 'statistics', label: 'الإحصائيات', icon: BarChart3, roles: ['admin', 'race_organizer'] },
  { id: 'notifications', label: 'الإشعارات', icon: Bell, roles: ['admin', 'race_organizer', 'horse_owner', 'judge'] },
  { id: 'browse', label: 'تصفح النتائج', icon: Eye, roles: ['public_viewer'] },
  { id: 'contact', label: 'الدعم والتواصل', icon: Contact, roles: ['admin', 'race_organizer', 'horse_owner', 'judge', 'public_viewer'] }];


  const visibleItems = menuItems.filter((item) =>
  item.roles.includes(user?.role || 'public_viewer')
  );

  return (
    <aside className={cn(
      "bg-gray-900 text-white w-64 min-h-screen transition-transform duration-300 fixed md:relative z-20",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )} dir="rtl" data-id="o2rjsx2l5" data-path="src/components/Layout/Sidebar.tsx">
      <div className="p-6" data-id="9fa4po3i4" data-path="src/components/Layout/Sidebar.tsx">
        <div className="flex items-center gap-2 mb-8" data-id="uc62wjj4d" data-path="src/components/Layout/Sidebar.tsx">
          <div className="text-3xl" data-id="07zbzebvs" data-path="src/components/Layout/Sidebar.tsx">🏇</div>
          <div data-id="klxsd6omg" data-path="src/components/Layout/Sidebar.tsx">
            <h2 className="text-lg font-bold" data-id="sofg77ver" data-path="src/components/Layout/Sidebar.tsx">نظام إدارة السباقات</h2>
            <p className="text-sm text-gray-400" data-id="1479u6hhw" data-path="src/components/Layout/Sidebar.tsx">المنصة الشاملة</p>
          </div>
        </div>

        <nav className="space-y-2" data-id="609i3ksjt" data-path="src/components/Layout/Sidebar.tsx">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-right",
                  currentPage === item.id && "bg-blue-600 text-white hover:bg-blue-700"
                )}
                onClick={() => onPageChange(item.id)} data-id="sttsli4qj" data-path="src/components/Layout/Sidebar.tsx">

                <Icon className="h-5 w-5 ml-3" data-id="lrlvpwuf8" data-path="src/components/Layout/Sidebar.tsx" />
                {item.label}
              </Button>);

          })}
        </nav>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg" data-id="s37i83o0s" data-path="src/components/Layout/Sidebar.tsx">
          <h3 className="text-sm font-semibold mb-2" data-id="io917v1kh" data-path="src/components/Layout/Sidebar.tsx">إحصائيات سريعة</h3>
          <div className="space-y-2 text-sm text-gray-300" data-id="cilegtsx5" data-path="src/components/Layout/Sidebar.tsx">
            <div className="flex justify-between" data-id="x1uf9u2pe" data-path="src/components/Layout/Sidebar.tsx">
              <span data-id="ijj9zsx6c" data-path="src/components/Layout/Sidebar.tsx">السباقات القادمة</span>
              <span className="text-blue-400" data-id="pxa2rizrt" data-path="src/components/Layout/Sidebar.tsx">5</span>
            </div>
            <div className="flex justify-between" data-id="t38tkv1nv" data-path="src/components/Layout/Sidebar.tsx">
              <span data-id="5xp3u8m9m" data-path="src/components/Layout/Sidebar.tsx">الخيول المسجلة</span>
              <span className="text-green-400" data-id="hahmfmo3b" data-path="src/components/Layout/Sidebar.tsx">23</span>
            </div>
          </div>
        </div>
      </div>
    </aside>);

};

export default Sidebar;