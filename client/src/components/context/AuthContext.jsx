import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Ensure this is inside a Router context

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setUser(data.user);
        navigate('/dashboard'); // Example of using useNavigate for redirect after login
    };

    const logout = () => {
        setUser(null);
        navigate('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
