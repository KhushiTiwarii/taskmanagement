import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({ title: '', description: '', priority: '', status: '' });
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '' });

  const token = localStorage.getItem('token'); // Fetch the token from localStorage

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('https://taskmanagement-eosin.vercel.app/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  // Create a new task
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://taskmanagement-eosin.vercel.app/api/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskData({ title: '', description: '', priority: '', status: '' }); // Reset form
      fetchTasks(); // Refresh tasks list
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  // Update a task
  const updateTask = async (id) => {
    try {
      await axios.put(`https://taskmanagement-eosin.vercel.app/api/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh tasks list
      setSelectedTask(null); // Deselect task
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://taskmanagement-eosin.vercel.app/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh tasks list
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-700">Task Manager</h1>

      {/* Task Creation Form */}
      <form onSubmit={createTask} className="mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskData.description}
          onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Priority"
          value={taskData.priority}
          onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
          required
          className="border p-2 mr-2 "
        />
        <select
          value={taskData.status}
          onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create Task</button>
      </form>

      {/* Task List */}
      <h2 className="text-xl mb-2">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="p-4 mb-2 border rounded">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <button className="bg-yellow-500 text-white px-2 py-1 mr-2" onClick={() => {
              setTaskData({ title: task.title, description: task.description, priority: task.priority, status: task.status });
              setSelectedTask(task._id);
            }}>Edit</button>
            <button className="bg-red-500 text-white px-2 py-1" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Update Task Button */}
      {selectedTask && (
        <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={() => updateTask(selectedTask)}>Update Selected Task</button>
      )}
    </div>
  );
};

export default TaskManager;
