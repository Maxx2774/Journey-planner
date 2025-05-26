import { useState } from "react";
import "./ui.css";

export default function ToggleButton({ onToggle, className, disabled }) {
  const [toggled, setToggled] = useState(false);
  function handleToggle() {
    setToggled(!toggled);
    if (onToggle) onToggle(!toggled);
  }
  return (
    <button
      disabled={disabled}
      onClick={handleToggle}
      className={`${className} toggle ${toggled ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <div className={`toggle-circle ${toggled ? "active" : "inactive"}`}></div>
    </button>
  );
}
