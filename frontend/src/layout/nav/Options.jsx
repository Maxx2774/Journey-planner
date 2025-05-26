import SettingsIcon from "../../assets/icons/settings.svg?react";
import InboxIcon from "../../assets/icons/inbox.svg?react";
import DarkmodeIcon from "../../assets/icons/darkmode.svg?react";
import LogoutIcon from "../../assets/icons/logout.svg?react";
import ToggleButton from "../../components/ui/ToggleButton";
import { useClerk } from "@clerk/clerk-react";
export function InboxOption() {
  return (
    <button className="flex items-center mb-1">
      <InboxIcon className="w-5 h-5 mr-3 inbox-icon" /> Inbox
    </button>
  );
}
export function SettingsOption() {
  return (
    <button className="flex items-center mb-1">
      <SettingsIcon className="mr-[11px] w-5 h-5" />
      Settings
    </button>
  );
}

export function DarkmodeOption() {
  return (
    <section className="flex items-center w-full">
      <DarkmodeIcon className="w-5 h-5 mr-3" />
      <p>Darkmode</p>
      <ToggleButton disabled={true} className="toggle-button-darkmode" />
    </section>
  );
}

export function SignOut() {
  const { signOut } = useClerk();
  return (
    <section className="flex items-center">
      <LogoutIcon className="h-5 w-5 mr-3.5 ml-[-3px]" />
      <button onClick={() => signOut()}>Sign out</button>
    </section>
  );
}
