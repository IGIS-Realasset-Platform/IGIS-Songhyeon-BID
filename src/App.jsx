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
import CityPartnership from './pages/cases/CityPartnership';
import GlobalEvaluation from './pages/cases/GlobalEvaluation';
import OperatingInsights from './pages/cases/OperatingInsights';
import TaskFeed from './pages/TaskFeed';
import DataRoom from './pages/DataRoom';
import DataRoomDetail from './pages/DataRoomDetail';
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
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Navigate replace to="/" />} />
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
          <Route path="cases" element={<Navigate replace to="/cases/city-partnership" />} />
          <Route path="cases/city-partnership" element={<CityPartnership />} />
          <Route path="cases/global-evaluation" element={<GlobalEvaluation />} />
          <Route path="cases/operating-insights" element={<OperatingInsights />} />
          <Route path="cases/songhyeon-place-thesis" element={<Navigate replace to="/cases/operating-insights" />} />
          <Route path="cases/songhyeon-application" element={<Navigate replace to="/cases/operating-insights" />} />
          <Route path="cases/us" element={<Navigate replace to="/cases/city-partnership" />} />
          <Route path="cases/japan" element={<Navigate replace to="/cases/city-partnership" />} />
          <Route path="milestones" element={<SonghyeonScheduleGate />} />
          <Route path="hypotheses" element={<Navigate replace to="/#how-we-work" />} />
          <Route path="membership" element={<Navigate replace to="/#how-we-work" />} />
          <Route path="feed" element={<TaskFeed />} />
          <Route path="feed/:postId" element={<TaskFeed />} />
          <Route path="data" element={<DataRoom />} />
          <Route path="data/:documentId" element={<DataRoomDetail />} />
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
