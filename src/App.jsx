import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';

import Login from './pages/Login';

import UserPage from './pages/UserPage';

import AdminPage from './pages/AdminPage';

import Manager from './pages/Manager';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<Register />} path='/' />
      <Route element={<Login />} path='/login' />

      {/* Protected Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user", "manager", "admin"]}>
            <UserPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <Manager />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
