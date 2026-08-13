import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TaskBoard from './pages/TaskBoard';
import AssetPortfolio from './pages/AssetPortfolio';
import KTwin from './pages/assets/KTwin';
import TwinTree from './pages/assets/TwinTree';
import Ssamzigil from './pages/assets/Ssamzigil';
import Annyeong from './pages/assets/Annyeong';
import NewAssets from './pages/assets/NewAssets';
import MarketData from './pages/assets/MarketData';
import UsCases from './pages/UsCases';
import JapanCases from './pages/JapanCases';
import ExecutionPlan from './pages/ExecutionPlan';
import ServiceHypotheses from './pages/ServiceHypotheses';
import DataRoom from './pages/DataRoom';
import SonghyeonScheduleGate from './components/iota-songhyeon/pmo/SonghyeonScheduleGate';
import Login from './pages/Login';
import SonghyeonInternal from './pages/governance/SonghyeonInternal';
import SonghyeonPrinciples from './pages/governance/SonghyeonPrinciples';
import SonghyeonInterfaces from './pages/governance/SonghyeonInterfaces';
import SonghyeonOperations from './pages/governance/SonghyeonOperations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="assets" element={<AssetPortfolio />} />
          <Route path="assets/k-twin" element={<KTwin />} />
          <Route path="assets/twin-tree" element={<TwinTree />} />
          <Route path="assets/ssamzigil" element={<Ssamzigil />} />
          <Route path="assets/annyeong" element={<Annyeong />} />
          <Route path="assets/new-assets" element={<NewAssets />} />
          <Route path="assets/market-data" element={<MarketData />} />
          <Route path="cases/us" element={<UsCases />} />
          <Route path="cases/japan" element={<JapanCases />} />
          <Route path="execution" element={<ExecutionPlan />} />
          <Route path="milestones" element={<SonghyeonScheduleGate />} />
          <Route path="hypotheses" element={<ServiceHypotheses />} />
          <Route path="membership" element={<Navigate replace to="/hypotheses" />} />
          <Route path="data" element={<DataRoom />} />
          <Route path="governance/internal" element={<SonghyeonInternal />} />
          <Route path="governance/principles" element={<SonghyeonPrinciples />} />
          <Route path="governance/interfaces" element={<SonghyeonInterfaces />} />
          <Route path="governance/operations" element={<SonghyeonOperations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
