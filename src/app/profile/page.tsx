'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

// 👇 Skeleton grid component
const ProductSkeletonGrid = () => (
  <ul className="grid grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <li key={i}>
        <Skeleton className="h-[250px] w-full rounded-lg" />
      </li>
    ))}
  </ul>
)

// Dynamic ProductCard
const ProductCard = dynamic(() => import('@/components/ProductCard'), {
  loading: () => (
    <div className="flex justify-center items-center min-h-screen">
      <Skeleton className="h-[20px] w-[100px]" />
    </div>
  ),
  ssr: false,
})

// Fetch products only
async function getProducts() {
  const res = await fetch('https://dummyjson.com/products')
  const data = await res.json()
  return data.products
}

const ProfilePage = () => {
  const router = useRouter()

  // ✅ Redux state
  const { user, token } = useSelector((state: RootState) => state.auth)

  // Products state
  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  // 🔐 Auth guard
  useEffect(() => {
    if (!token) {
      router.push('/signin')
    }
  }, [token, router])

  // 📦 Fetch products
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setLoadingProducts(false)
    })
  }, [])

  // 🧱 Prevent crash during redirect
  if (!user) {
    return <Skeleton className="h-8 w-64 m-6" />
  }

  return (
    <div className="max-w-full mx-auto mt-10 px-4">
      <h1 className="text-2xl mb-4">
        Welcome, {user.firstName} {user.lastName}!
      </h1>

      <h2 className="text-xl mb-4">Products:</h2>

      {loadingProducts ? (
        <ProductSkeletonGrid />
      ) : (
        <ul className="grid grid-cols-4 gap-4 text-sm">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfilePage
