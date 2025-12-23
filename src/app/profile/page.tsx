'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


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
async function getProducts(search = '', sortValue = 'title-asc') {
  const [sortBy, order] = sortValue.split('-')

  const baseUrl = search ? `https://dummyjson.com/products/search?q=${search}` : `https://dummyjson.com/products`

  // const res = await fetch(`${baseUrl}&sortBy=${sortBy}&order=${order}`)
  const res = await fetch(baseUrl)
  const data = await res.json()


    // Sort client-side
    const sorted = [...data.products].sort((a, b) => {
      if (sortBy === 'title') {
        return order === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      }
      if (sortBy === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price
      }
      return 0
    })

    return sorted
}



const ProfilePage = () => {
  const [products, setProducts] = useState<any[]>([])
  const [sortValue, setSortValue] = useState('title-asc')
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [search, setSearch] = useState('')

  const { data: session, status } = useSession();
  
  const router = useRouter()

  // ✅ Redux state
  const { user, token } = useSelector((state: RootState) => state.auth)

  // 🔐 Auth guard
  useEffect(() => {
    // wait for NextAuth to finish loading session
    if (status === 'loading') return;

    // allow access if we have either a Redux token (app auth) OR a NextAuth session
    if (!token && !session) {
      router.push('/signin')
    }
  }, [token, session, status, router])

  // 📦 Fetch products
  useEffect(() => {
    setLoadingProducts(true)

    const delay = setTimeout(() => {
      getProducts(search, sortValue).then((data) => {
        setProducts(data)
        setLoadingProducts(false)
      })
    }, 300); // Debounce for 300ms

    return () => clearTimeout(delay)
  }, [search, sortValue])


  if (status === 'loading') {
    return <Skeleton className="h-8 w-64 m-6" />
  }

  {!loadingProducts && products.length === 0 && (
    <p className="text-center text-muted-foreground">
      No products found
    </p>
  )}

  return (
    <div className="max-w-7xl mx-auto mt-20 ">
      <h1 className="text-2xl mb-4 font-semibold">
        {session
          ? `Welcome, ${session.user?.name}!`
          : `Welcome, ${user?.firstName} ${user?.lastName}!`}
      </h1>

      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-xl font-semibold">Products:</h2>
        <div className="flex justify-center items-center gap-2 text-center">
          <Input
            placeholder="Search products..."
            className=" w-full max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 🔽 shadcn Sort Select */}
          <Select value={sortValue} onValueChange={setSortValue}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title-asc">Title (A–Z)</SelectItem>
              <SelectItem value="title-desc">Title (Z–A)</SelectItem>
              <SelectItem value="price-asc">Price (Low → High)</SelectItem>
              <SelectItem value="price-desc">Price (High → Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
  );
}

export default ProfilePage
