import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TodoDashboard from './components/todos/TodoDashboard';
import TodayTodos from './components/todos/TodayTodos';
import UpcomingTodos from './components/todos/UpcomingTodos';
import ImportantTodos from './components/todos/ImportantTodos';
import CategoryTodos from './components/todos/CategoryTodos';
import Settings from './components/settings/Settings';
import NotFound from './components/common/NotFound';
import Loading from './components/common/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loading />;
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <TodoDashboard />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/today" element={
        <PrivateRoute>
          <Layout>
            <TodayTodos />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/upcoming" element={
        <PrivateRoute>
          <Layout>
            <UpcomingTodos />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/important" element={
        <PrivateRoute>
          <Layout>
            <ImportantTodos />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/category/:category" element={
        <PrivateRoute>
          <Layout>
            <CategoryTodos />
          </Layout>
        </PrivateRoute>
      } />
      
      <Route path="/settings" element={
        <PrivateRoute>
          <Layout>
            <Settings />
          </Layout>
        </PrivateRoute>
      } />

      {/* 404 Route */}
      <Route path="*" element={
        <Layout>
          <NotFound />
        </Layout>
      } />
    </Routes>
  );
};

export default AppRoutes;