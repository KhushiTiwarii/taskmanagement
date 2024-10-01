import { useContext } from 'react';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import AuthContext from '../components/context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl">Welcome, {user?.name}</h1>
                <button onClick={logout} className="bg-red-500 text-white p-2 rounded-md">Logout</button>
            </div>
            <div className="mt-6">
                <TaskForm />
            </div>
            <div className="mt-6">
                <TaskList />
            </div>
        </div>
    );
};

export default Dashboard;
