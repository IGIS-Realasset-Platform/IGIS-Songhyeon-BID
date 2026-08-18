import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TaskBoard from './pages/TaskBoard';
import MapActivities from './pages/MapActivities';
import AssetPortfolio from './pages/AssetPortfolio';
import KTwin from './pages/assets/KTwin';
import TwinTree from './pages/assets/TwinTree';
import Ssamzigil from './pages/assets/Ssamzigil';
import Annyeong from './pages/assets/Annyeong';
import NewAssets from './pages/assets/NewAssets';
import MarketData from './pages/assets/MarketData';
import UsCases from './pages/UsCases';
import JapanCases from './pages/JapanCases';
import ServiceHypotheses from './pages/ServiceHypotheses';
import TaskFeed from './pages/TaskFeed';
import DataRoom from './pages/DataRoom';
import SonghyeonScheduleGate from './components/iota-songhyeon/pmo/SonghyeonScheduleGate';
import Login from './pages/Login';
import SonghyeonInternal from './pages/governance/SonghyeonInternal';
import SonghyeonPrinciples from './pages/governance/SonghyeonPrinciples';
import SonghyeonInterfaces from './pages/governance/SonghyeonInterfaces';
import SonghyeonOperations from './pages/governance/SonghyeonOperations';
import SonghyeonAnalytics from './pages/admin/SonghyeonAnalytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate replace to="/tasks" />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="map-activities">
            <Route index element={<Navigate replace to="integrated-map" />} />
            <Route path="integrated-map" element={<MapActivities />} />
            <Route path="boundary" element={<MapActivities />} />
            <Route path="assets-leases" element={<MapActivities />} />
            <Route path="igis-retail" element={<MapActivities />} />
            <Route path="market-activities" element={<MapActivities />} />
            <Route path="hotel" element={<MapActivities />} />
            <Route path="institutions-community" element={<MapActivities />} />
          </Route>
          <Route path="assets" element={<AssetPortfolio />} />
          <Route path="assets/k-twin" element={<KTwin />} />
          <Route path="assets/twin-tree" element={<TwinTree />} />
          <Route path="assets/ssamzigil" element={<Ssamzigil />} />
          <Route path="assets/annyeong" element={<Annyeong />} />
          <Route path="assets/new-assets" element={<NewAssets />} />
          <Route path="assets/market-data" element={<MarketData />} />
          <Route path="cases/us" element={<UsCases />} />
          <Route path="cases/japan" element={<JapanCases />} />
          <Route path="milestones" element={<SonghyeonScheduleGate />} />
          <Route path="hypotheses" element={<ServiceHypotheses />} />
          <Route path="membership" element={<Navigate replace to="/hypotheses" />} />
          <Route path="feed" element={<TaskFeed />} />
          <Route path="data" element={<DataRoom />} />
          <Route path="governance/internal" element={<SonghyeonInternal />} />
          <Route path="governance/principles" element={<SonghyeonPrinciples />} />
          <Route path="governance/interfaces" element={<SonghyeonInterfaces />} />
          <Route path="governance/operations" element={<SonghyeonOperations />} />
          <Route path="admin/analytics" element={<AdminRoute><SonghyeonAnalytics /></AdminRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
