import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  isPro?: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser && storedUser !== 'undefined') {
          try {
            setUser(JSON.parse(storedUser));
          } catch (parseError) {
            console.error('Failed to parse storedUser:', parseError);
            setUser(null);
            localStorage.removeItem('user');
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const updateSubscriptionStatus = async (isPro: boolean) => {
    try {
      const token = getToken();
      if (!token) throw new Error('No authentication token');

      console.log('Updating subscription status:', { isPro, token: token.substring(0, 10) + '...' });

      const response = await fetch('http://localhost:5001/api/users/subscription', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isPro }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Subscription update failed:', data);
        throw new Error(data.message || 'Failed to update subscription');
      }

      console.log('Subscription update successful:', data);

      const updatedUser = { ...user, isPro };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      console.error('Subscription update error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update subscription',
      };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    getToken,
    isAuthenticated: !!user,
    updateSubscriptionStatus,
  };
}; 