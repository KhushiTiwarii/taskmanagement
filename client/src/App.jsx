import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './hooks/ProtectesRoute';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import TaskList from './components/Tasks/TaskList'
import TaskReport from './components/Tasks/TaskReport'
import TaskForm from './components/Tasks/TaskForm'
import TaskManager from './components/Tasks/TaskManager';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/tasks" element={<ProtectedRoute><TaskList /></ProtectedRoute>} />
        <Route path="/tasks/new" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        <Route path="/tasks/:id/edit" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        <Route path="/admin/report" element={<ProtectedRoute><TaskReport /></ProtectedRoute>} />
        <Route path="/tasksmanager" element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
