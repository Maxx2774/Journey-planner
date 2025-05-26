import Waypoints from "./Waypoints";
import MarkerIcon from "../../../assets/icons/marker.svg?react";
import ArrowIcon from "../../../assets/icons/arrow-right.svg?react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionArrow = motion.create(ArrowIcon);

export default function WaypointsToggle({ journey, highlightMarker }) {
  const [showWaypoints, setShowWaypoints] = useState(false);
  return (
    <>
      <button
        className="toggle-waypoints"
        onClick={() => setShowWaypoints(!showWaypoints)}
      >
        <MotionArrow
          className="w-3.5 h-3.5 mr-2"
          animate={{ rotate: showWaypoints ? 90 : 0 }}
        />
        <p className="text-[1.2rem]">Waypoints</p>{" "}
        <MarkerIcon className="w-7 h-7 ml-auto fill-[#CE2D4F]" />
      </button>

      {showWaypoints && (
        <Waypoints journey={journey} highlightMarker={highlightMarker} />
      )}
    </>
  );
}
