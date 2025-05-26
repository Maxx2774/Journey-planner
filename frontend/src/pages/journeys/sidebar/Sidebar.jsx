import WaypointsToggle from "../waypoints/WaypointsToggle";
import PostsToggle from "../posts/PostsToggle";
import LocationPicker from "./LocationPicker";

import "./sidebar.css";
import { useState } from "react";
export default function JourneySidebar({ journey, highlightMarker }) {
  const [tab, setTab] = useState("waypoints");
  function handleTab(set_tab) {
    if (tab === set_tab) return setTab("");
    return setTab(set_tab);
  }
  return (
    <aside className="journey-sidebar">
      <h1 className="mb-4 mt-1 text-center">{journey?.title}</h1>
      <LocationPicker journey={journey} />
      <WaypointsToggle
        journey={journey}
        highlightMarker={highlightMarker}
        tab={tab}
        handleTab={handleTab}
      />
      <PostsToggle tab={tab} handleTab={handleTab} />
    </aside>
  );
}
