'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/authProvider';

const SignIn = () => {
    const [username, setUsername] = useState('emilys'); // Test user from DummyJSON
    const [password, setPassword] = useState('emilyspass');
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { login, isAuthenticated } = useAuth();

    console.log("login", login);
    console.log("isAuthenticated", isAuthenticated);
    

    // Watch for authentication change and redirect
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/profile');
        }
    }, [isAuthenticated, router]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer dummy', // your working fix
                },
                body: JSON.stringify({ username, password, expiresInMins: 30 }),
                credentials: 'omit',
            });
    
    
            if (res.ok) {
                const data = await res.json();
                console.log("Login success:", data);

                login(data.accessToken); 
                
                // Redirect to profile or dashboard
                // router.push('/profile');
    
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error("Login failed:", errorData);
                setError(errorData.message || 'Invalid credentials');
            } 
    
        } catch (err) {
            console.error(err);
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen mx-auto'>
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl mb-4">Login using DummyJSON</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g., emilys)"
                className="w-full p-2 border"
                required
                />

                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (e.g., emilyspass)"
                className="w-full p-2 border"
                required
                />

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                {error && <p className="text-red-500">{error}</p>}
            </form>

            <p className="mt-4">Test users: <a href="https://dummyjson.com/users" target="_blank" className="text-blue-500">https://dummyjson.com/users</a></p>

        </div>
    </div>
  )
}

export default SignIn