import ProfileButton from "./ProfileButton";
import Logo2 from "../../assets/logo2.svg?react";
import { Link } from "react-router-dom";
import { SignedOut, SignedIn, SignInButton } from "@clerk/clerk-react";
import "./nav.css";
import JourneyList from "./JourneyList";

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav-left">
        <Logo2 className="logo" />
      </ul>
      <ul className="nav-right">
        <Link>Explore</Link>

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <Link>Friends</Link>
          <JourneyList />
          <ProfileButton />
        </SignedIn>
      </ul>
    </nav>
  );
}
