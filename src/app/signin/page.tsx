'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

const SignIn = () => {
    const [username, setUsername] = useState('emilys'); // Test user from DummyJSON
    const [password, setPassword] = useState('emilyspass');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

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

            if (!res.ok) throw new Error('Invalid credentials')
    
            const data = await res.json();

            // save in redux
            dispatch(loginSuccess({
                user: data,
                token: data.accessToken,
            }));

            // save to localStorage for hydration
            localStorage.setItem('auth', JSON.stringify({
                user: data,
                token: data.accessToken,
            }));

            // save token in cookie (middleware-readable)
            document.cookie = `token=${data.accessToken}; path=/; max-age=${30 * 60}`;

            toast.success('Successfully created!');

            router.push('/profile')

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