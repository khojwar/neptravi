import { Textarea } from "@/components/ui/textarea"

const UserQuery = () => {
  return (
    <div className="  w-full max-w-sm md:max-w-lg mt-4">
        <Textarea className="text-sm md:text-lg h-16 md:h-20" placeholder="Eg. I want to go to Chitwan for a romantic getaway with a budget of $2000..." />
    </div>
  )
}

export default UserQuery