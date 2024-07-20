import { SignInButton } from "@clerk/nextjs";



export default function Guest() {
  return (
    <div className="guest">
      <h1>Welcome</h1>
      <p>PLease sign in to manage your componet</p>
      <SignInButton />
    </div>
  )
}
