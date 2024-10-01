import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ task, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    status: task?.status || 'To Do',
    priority: task?.priority || 'Medium',
    assignedUser: task?.assignedUser || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="p-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">{task ? 'Edit Task' : 'Create Task'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border p-2 w-full mb-4"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2 w-full mb-4"
      />
      <input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="border p-2 w-full mb-4"
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="border p-2 w-full mb-4"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        className="border p-2 w-full mb-4"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="text"
        placeholder="Assigned User"
        value={formData.assignedUser}
        onChange={(e) => setFormData({ ...formData, assignedUser: e.target.value })}
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">{task ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
