'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


async function getUser(accessToken: string) {
    const res = await fetch('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    if (!res.ok) {
        return null;
    }
    
    return res.json();
}

const ProfilePage = () => {
    const [user, setUser] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

            if (!token) {
                router.push('/signin');
                return;
            }

            getUser(token).then((data) => {
                if (!data) {
                    router.push('/signin');
                } else {
                    setUser(data);
                }
            });


    }, []);

    if (!user) return <p>Loading...</p>;
    
  return (
    <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl mb-4">Welcome, {user.firstName} {user.lastName}!</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>  
        <a href="/logout" className="block mt-4 text-blue-500">Logout</a>
    </div>
  )
}

export default ProfilePage