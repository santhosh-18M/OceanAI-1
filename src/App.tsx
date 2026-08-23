import { useState } from 'react';
import type { ViewId } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { SOSOverlay } from '@/components/SOSOverlay';
import { DashboardView } from '@/views/DashboardView';
import { FamilyView } from '@/views/FamilyView';
import { BorderView } from '@/views/BorderView';
import { WeatherView } from '@/views/WeatherView';
import { RecommendView } from '@/views/RecommendView';
import { ForecastView } from '@/views/ForecastView';
import { MapView } from '@/views/MapView';

function App() {
  const [view, setView] = useState<ViewId>('dashboard');
  const [sosOpen, setSosOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardView />;
      case 'family':
        return <FamilyView />;
      case 'border':
        return <BorderView />;
      case 'weather':
        return <WeatherView />;
      case 'recommend':
        return <RecommendView />;
      case 'forecast':
        return <ForecastView />;
      case 'map':
        return <MapView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-ocean-radial">
      <Sidebar active={view} onSelect={setView} />
      <div className="pl-64">
        <Topbar view={view} onSOS={() => setSosOpen(true)} />
        <main key={view} className="animate-fade-in px-6 py-6 lg:px-8">
          {renderView()}
        </main>
      </div>
      <SOSOverlay open={sosOpen} onClose={() => setSosOpen(false)} />
    </div>
  );
}

export default App;
