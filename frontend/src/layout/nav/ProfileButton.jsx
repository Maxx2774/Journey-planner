import UserIcon from "../../assets/icons/user.svg?react";
import ToggleButton from "../../components/ui/ToggleButton";
import { useUser } from "@clerk/clerk-react";
import {
  InboxOption,
  SettingsOption,
  DarkmodeOption,
  SignOut,
} from "./Options";

export default function ProfileButton() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <>
      <button className="profile" popoverTarget="profile-menu">
        <UserIcon className="w-9 h-9" />
      </button>
      <section id="profile-menu" className="profile-menu" popover="auto">
        <p>{user?.primaryEmailAddress?.emailAddress || "No email assigned"}</p>
        <hr className="hr" />
        <section className="settings">
          <InboxOption />
          <SettingsOption />
          <DarkmodeOption />
        </section>
        <hr className="hr" />
        <SignOut />
      </section>
    </>
  );
}
