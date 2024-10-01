import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', assignedUser: '' });
  const [page, setPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');  // Fetch the token from localStorage
  
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const { data } = await axios.get('http://localhost:5000/api/tasks', {
        params: { ...filters, page },
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
      });
      console.log(data);
      
      setTasks(data);
      

      
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };
  

  useEffect(() => {
    fetchTasks();
  }, [filters, page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by status"
          className="border p-2 mr-2"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by priority"
          className="border p-2"
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        />
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="p-4 mb-2 border rounded">
            <h2 className="text-xl">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 mr-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >Previous</button>
        <button 
          className="bg-blue-500 text-white px-4 py-2"
          onClick={() => setPage((prev) => prev + 1)}
        >Next</button>
      </div>
    </div>
  );
};

export default TaskList;


