// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TaskReport = () => {
//   const [report, setReport] = useState(null);

//   const fetchReport = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/tasks/report');
//       setReport(data);
//     } catch (err) {
//       console.error('Failed to fetch report:', err);
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Task Summary Report</h1>
//       {report ? (
//         <div>
//           <p>Total Tasks: {report.totalTasks}</p>
//           <p>Completed Tasks: {report.completedTasks}</p>
//           <p>Pending Tasks: {report.pendingTasks}</p>
//           <p>Overdue Tasks: {report.overdueTasks}</p>
//         </div>
//       ) : (
//         <p>Loading report...</p>
//       )}
//     </div>
//   );
// };

// export default TaskReport;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskReport = () => {
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token'); // Fetch the token from localStorage
  
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const { data } = await axios.get('http://localhost:5000/api/tasks/report', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log(data);
      
      setReport(data);
      
      
    } catch (err) {
      console.error('Failed to fetch report:', err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Summary Report</h1>
      {report ? (
        report.map((rep)=>(
           <div key={rep._id}>
          <p>Total Tasks: {rep.totalTasks}</p>
          <p>Completed Tasks: {rep.completedTasks}</p>
          <p>Pending Tasks: {rep.pendingTasks}</p>
          <p>Overdue Tasks: {rep.overdueTasks}</p>
        </div>
        ))
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default TaskReport;
