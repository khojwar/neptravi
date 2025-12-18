'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton"

const ProductCard = dynamic(() => import('@/components/ProductCard'), {
  loading: () => <p className='flex justify-center items-center min-h-screen w-auto'><Skeleton className="h-[20px] w-[100px] rounded-full" /></p>,
  ssr: false, // important for browser-only libraries
});



async function getUser(accessToken: string) {
    const res = await fetch('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    if (!res.ok) {
        return null;
    }
    
    return res.json();
}


async function getPost() {
    const post = await fetch('https://dummyjson.com/products')
    const data = await post.json();

    return data;
}


const ProfilePage = () => {
    const [user, setUser] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);

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

            getPost().then((data) => {
                setProducts(data.products);
            });

    }, [router]);

    console.log("products", products);
    
    

    if (!user) return <p className='flex justify-center items-center min-h-screen w-auto'>Loading...</p>;
    
  return (
    <div className="max-w-full mx-auto mt-10 px-4">
        <h1 className="text-2xl mb-4">Welcome, {user.firstName} {user.lastName}!</h1>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre>   */}

        <h2 className="text-xl mb-4">Products:</h2>
        <ul className='grid grid-cols-4 gap-4 text-sm'>
            {products.map((post) => (
                <li key={post.id}>
                    <ProductCard {...post} />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ProfilePage