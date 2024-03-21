import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { BoardsPage } from './pages/Boards/BoardsPage';
import { BoardPage } from './pages/Board/BoardPage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { CardDetailPage } from './pages/CardDetail/CardDetailPage';

export const Root: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<BoardsPage />} />
        <Route path="boards/:id" element={<BoardPage />} />
        <Route path="cards/:id" element={<CardDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
