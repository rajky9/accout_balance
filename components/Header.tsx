import { checkUser } from "@/lib/checkUser";
import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";

const Header = async () => {
  const user = await checkUser()
  // console.log(user)
  return (
    <div className="navbar">
      <div className="navbar-container">
        <h2>Expense tracker </h2>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;