'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        localStorage.clear();   // clear tokens
        router.replace('/signin'); // replace prevents back navigation
    }, [router]);

    return <p className="text-center mt-10">Logging you out...</p>;
}