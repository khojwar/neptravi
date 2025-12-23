'use client'

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"


const GoogleLoginButton = () => {
    return (
        <Button
            className="w-full mt-6"
            onClick={() => (
                signIn("google", { callbackUrl: "/profile", prompt: "select_account" })
            )}
        >
            Sign in with Google
        </Button>
    )
}

export default GoogleLoginButton;
