"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: any;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
        } catch (error) {
            console.error('Logout API call failed', error);
        } finally {
            setUser(null);
            router.push('/login');
            router.refresh(); // Ensure middleware re-runs if needed
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
