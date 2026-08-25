
import { signIn } from "@/app/auth"
 
export default function SignIn() {
  return (
    <form
      className="sign-in-form"
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">
        Sign in with GitHub
      </button>
    </form>
  )
} 