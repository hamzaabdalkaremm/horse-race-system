import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'race_organizer' | 'horse_owner' | 'judge' | 'public_viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & {password: string;}) => Promise<boolean>;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: (User & {password: string;})[] = [
{ id: '1', name: 'أحمد العلي', email: 'admin@races.com', password: 'admin123', role: 'admin' },
{ id: '2', name: 'محمد السباق', email: 'organizer@races.com', password: 'org123', role: 'race_organizer' },
{ id: '3', name: 'فاطمة الخيل', email: 'owner@races.com', password: 'owner123', role: 'horse_owner' },
{ id: '4', name: 'علي الحكم', email: 'judge@races.com', password: 'judge123', role: 'judge' },
{ id: '5', name: 'زائر عام', email: 'viewer@races.com', password: 'viewer123', role: 'public_viewer' }];


export const AuthProvider: React.FC<{children: React.ReactNode;}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('horseRaceUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('horseRaceUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('horseRaceUser');
  };

  const register = async (userData: Omit<User, 'id'> & {password: string;}): Promise<boolean> => {
    // Mock registration - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role
    };
    setUser(newUser);
    localStorage.setItem('horseRaceUser', JSON.stringify(newUser));
    return true;
  };

  const hasRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    hasRole
  };

  return <AuthContext.Provider value={value} data-id="8al37esqe" data-path="src/contexts/AuthContext.tsx">{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};