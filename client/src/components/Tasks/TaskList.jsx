
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const [filters, setFilters] = useState({ status: '', priority: '', assignedUser: '' });
//   const [page, setPage] = useState(1);
//   const navigate = useNavigate();

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem('token');  // Fetch the token from localStorage
  
//       if (!token) {
//         console.error('No token found');
//         return;
//       }
  
//       const { data } = await axios.get('https://taskmanagement-eosin.vercel.app/api/tasks', {
//         params: { ...filters, page },
//         headers: {
//           Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
//         },
//       });
//       console.log(data);
      
//       setTasks(data);
      
//     } catch (err) {
//       console.error('Failed to fetch tasks:', err);
//     }
//   };
  
//   useEffect(() => {
//     fetchTasks();
//   }, [filters, page]);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 text-center">Your Tasks</h1>
//       <div className="mb-4 flex justify-center">
//         <input
//           type="text"
//           placeholder="Filter by status"
//           className="border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Filter by priority"
//           className="border border-gray-300 p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//         />
//       </div>
//       <ul className="grid grid-cols-1 gap-4">
//         {tasks.map((task) => (
//           <li key={task._id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
//             <h2 className="text-xl font-semibold">{task.title}</h2>
//             <p className="text-gray-600">{task.description}</p>
//             <p className="text-gray-500">Status: <span className="font-medium">{task.status}</span></p>
//             <p className="text-gray-500">Priority: <span className="font-medium">{task.priority}</span></p>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4 flex justify-between">
//         <button 
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//         >Previous</button>
//         <button 
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           onClick={() => setPage((prev) => prev + 1)}
//         >Next</button>
//       </div>
//       <div className="mt-4 flex justify-center">
//         <button 
//           className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
//           onClick={() => navigate('/tasksmanager')}
//         >Manage Your Tasks</button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'; // Importing icons from react-icons

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '' }); // Removed assignedUser as it's not in use
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');  // Fetch the token from localStorage
  
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const { data } = await axios.get('https://taskmanagement-eosin.vercel.app/api/tasks', {
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Tasks</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Filter by status"
          className="border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by priority"
          className="border border-gray-300 p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        />
      </div>
      <ul className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <li key={task._id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-gray-500">Status: <span className="font-medium">{task.status}</span></p>
            <p className="text-gray-500">Priority: <span className="font-medium">{task.priority}</span></p>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          <HiChevronLeft className="mr-2" /> {/* Previous icon */}
        </button>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center"
          onClick={() => setPage((prev) => prev + 1)}
        >
          <HiChevronRight className="mr-2" /> {/* Next icon */}
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <button 
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          onClick={() => navigate('/tasksmanager')}
        >
          Manage Your Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskList;
