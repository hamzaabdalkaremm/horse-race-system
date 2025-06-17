import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import Navbar from '@/components/Layout/Navbar';
import Sidebar from '@/components/Layout/Sidebar';
import DashboardHome from '@/components/Dashboard/DashboardHome';
import RaceManagement from '@/components/Races/RaceManagement';
import HorseManagement from '@/components/Horses/HorseManagement';
import HorseRegistration from '@/components/Registration/HorseRegistration';
import RaceSchedule from '@/components/Schedule/RaceSchedule';
import ResultsManagement from '@/components/Results/ResultsManagement';
import StatisticsDashboard from '@/components/Statistics/StatisticsDashboard';
import ContactSupport from '@/components/Contact/ContactSupport';
import './App.css';

const queryClient = new QueryClient();

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm data-id="f7z5sa2e1" data-path="src/App.tsx" />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome data-id="35cwslgz4" data-path="src/App.tsx" />;
      case 'races':
        return <RaceManagement data-id="jjtdkr2dm" data-path="src/App.tsx" />;
      case 'horses':
        return <HorseManagement data-id="n0rvw4n6i" data-path="src/App.tsx" />;
      case 'registration':
        return <HorseRegistration data-id="9eo34idbc" data-path="src/App.tsx" />;
      case 'schedule':
        return <RaceSchedule data-id="8gndvyvct" data-path="src/App.tsx" />;
      case 'results':
      case 'browse':
        return <ResultsManagement data-id="aova0hd8f" data-path="src/App.tsx" />;
      case 'statistics':
        return <StatisticsDashboard data-id="ela3u41fb" data-path="src/App.tsx" />;
      case 'notifications':
        return <DashboardHome data-id="jd22u3h6r" data-path="src/App.tsx" />; // Placeholder
      case 'contact':
        return <ContactSupport data-id="mkead4hd4" data-path="src/App.tsx" />;
      default:
        return <DashboardHome data-id="dyqe489x1" data-path="src/App.tsx" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl" data-id="gsf58mrry" data-path="src/App.tsx">
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onPageChange={setCurrentPage} data-id="dogiqdtxi" data-path="src/App.tsx" />

      
      <div className="flex-1 flex flex-col overflow-hidden" data-id="1my5sgb9c" data-path="src/App.tsx">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} data-id="x95aeptd7" data-path="src/App.tsx" />
        
        <main className="flex-1 overflow-y-auto" data-id="psqb0jkgq" data-path="src/App.tsx">
          {renderCurrentPage()}
        </main>
      </div>
      
      {sidebarOpen &&
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        onClick={() => setSidebarOpen(false)} data-id="v5jhhrziy" data-path="src/App.tsx" />

      }
    </div>);

};

function App() {
  return (
    <QueryClientProvider client={queryClient} data-id="np07m4vok" data-path="src/App.tsx">
      <BrowserRouter data-id="4netrz002" data-path="src/App.tsx">
        <TooltipProvider data-id="9vno8ipp8" data-path="src/App.tsx">
          <AuthProvider data-id="76mopnxz4" data-path="src/App.tsx">
            <MainApp data-id="now62kqim" data-path="src/App.tsx" />
            <Toaster data-id="nz3j1x025" data-path="src/App.tsx" />
          </AuthProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>);

}

export default App;