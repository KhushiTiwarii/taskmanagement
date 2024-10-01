import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get('http://localhost:5000/api/tasks');
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const createTask = async (taskData) => {
        const { data } = await axios.post('http://localhost:5000/api/tasks', taskData);
        setTasks((prevTasks) => [...prevTasks, data]);
    };

    const updateTask = async (taskId, taskData) => {
        const { data } = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, taskData);
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task._id === taskId ? data : task))
        );
    };

    const deleteTask = async (taskId) => {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;
