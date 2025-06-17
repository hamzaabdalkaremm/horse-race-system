import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, LogOut, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const getRoleLabel = (role: string) => {
    const roleLabels = {
      admin: 'مدير النظام',
      race_organizer: 'منظم السباقات',
      horse_owner: 'مالك خيول',
      judge: 'حكم',
      public_viewer: 'مشاهد عام'
    };
    return roleLabels[role as keyof typeof roleLabels] || role;
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between" dir="rtl" data-id="vzs663l5m" data-path="src/components/Layout/Navbar.tsx">
      <div className="flex items-center gap-4" data-id="bgv5bdf03" data-path="src/components/Layout/Navbar.tsx">
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="md:hidden" data-id="b685xzx9o" data-path="src/components/Layout/Navbar.tsx">
          <Menu className="h-5 w-5" data-id="jlr14sb8t" data-path="src/components/Layout/Navbar.tsx" />
        </Button>
        <div className="flex items-center gap-2" data-id="d1y395fmp" data-path="src/components/Layout/Navbar.tsx">
          <div className="text-2xl" data-id="v0wm7zo6w" data-path="src/components/Layout/Navbar.tsx">🏇</div>
          <h1 className="text-xl font-bold text-gray-900" data-id="8vp79ie6r" data-path="src/components/Layout/Navbar.tsx">إدارة سباق الخيل</h1>
        </div>
      </div>

      <div className="flex items-center gap-4" data-id="y2p1b5974" data-path="src/components/Layout/Navbar.tsx">
        <Button variant="ghost" size="sm" data-id="92xvt5ztr" data-path="src/components/Layout/Navbar.tsx">
          <Bell className="h-5 w-5" data-id="pce9vq4il" data-path="src/components/Layout/Navbar.tsx" />
          <Badge variant="destructive" className="text-xs ml-2" data-id="2v1o01vws" data-path="src/components/Layout/Navbar.tsx">3</Badge>
        </Button>

        <DropdownMenu data-id="dtl7ahwwk" data-path="src/components/Layout/Navbar.tsx">
          <DropdownMenuTrigger asChild data-id="ell0h2xqh" data-path="src/components/Layout/Navbar.tsx">
            <Button variant="ghost" className="flex items-center gap-2 p-2" data-id="w85i04xio" data-path="src/components/Layout/Navbar.tsx">
              <Avatar className="h-8 w-8" data-id="51poxwr13" data-path="src/components/Layout/Navbar.tsx">
                <AvatarFallback data-id="2w8ujk7ay" data-path="src/components/Layout/Navbar.tsx">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-right hidden md:block" data-id="uuoope324" data-path="src/components/Layout/Navbar.tsx">
                <div className="text-sm font-medium" data-id="nieiajx5n" data-path="src/components/Layout/Navbar.tsx">{user?.name}</div>
                <div className="text-xs text-gray-500" data-id="gongebr7t" data-path="src/components/Layout/Navbar.tsx">{getRoleLabel(user?.role || '')}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48" data-id="k1wdalzj0" data-path="src/components/Layout/Navbar.tsx">
            <DropdownMenuItem onClick={logout} className="text-red-600" data-id="i1l22f4t7" data-path="src/components/Layout/Navbar.tsx">
              <LogOut className="h-4 w-4 ml-2" data-id="18imqd216" data-path="src/components/Layout/Navbar.tsx" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>);

};

export default Navbar;