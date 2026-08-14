import { createBrowserRouter, Navigate } from 'react-router';
import Login from '../auth/components/Login';
import Register from '../auth/components/Register';
import Home from '../notes/component/Home';
import ProtectedRoute from './ProtectedRoute';

export const Approuter = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/login' replace />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/home',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    }
]);


