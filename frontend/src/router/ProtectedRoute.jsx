import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      try {
        await axios.get(
          "https://notes-app-seven-lyart.vercel.app/notesApp/auth/verify",
          {
            withCredentials: true,
          },
        );

        if (isMounted) {
          setIsAuthorized(true);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthorized(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111827',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}>
        <h2>Checking session...</h2>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#111827',
        color: '#fff',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1>Unauthorized</h1>
          <p>Please login to access this page.</p>
          <Link
            to="/login"
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              color: '#60a5fa',
              textDecoration: 'underline',
              fontWeight: '600',
            }}
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
