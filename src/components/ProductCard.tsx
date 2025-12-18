import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

const ProductCard = (post: any) => {
  return (
    <div>
        <Card>
            <CardContent className="flex flex-col gap-2">
                <img src={post.thumbnail} alt={post.title} loading="lazy" className="w-full h-32 object-cover mb-2" />
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>

                <div className="flex flex-col gap-2">
                    <div>
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <p>Price: ${post.price}</p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default ProductCard