import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AssetPortfolio from './pages/AssetPortfolio';
import KTwin from './pages/assets/KTwin';
import TwinTree from './pages/assets/TwinTree';
import Ssamzigil from './pages/assets/Ssamzigil';
import Annyeong from './pages/assets/Annyeong';
import NewAssets from './pages/assets/NewAssets';
import ExecutionPlan from './pages/ExecutionPlan';
import Membership from './pages/Membership';
import DataRoom from './pages/DataRoom';

import LegacyApp from './LegacyApp';

export default function App() {
  if (window.location.pathname.startsWith('/sbd-bid')) {
    return <LegacyApp />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<AssetPortfolio />} />
          <Route path="assets/k-twin" element={<KTwin />} />
          <Route path="assets/twin-tree" element={<TwinTree />} />
          <Route path="assets/ssamzigil" element={<Ssamzigil />} />
          <Route path="assets/annyeong" element={<Annyeong />} />
          <Route path="assets/new-assets" element={<NewAssets />} />
          <Route path="execution" element={<ExecutionPlan />} />
          <Route path="membership" element={<Membership />} />
          <Route path="data" element={<DataRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
