import Journeys from "../../pages/journeys/Journeys";
import { useRef } from "react";

export default function JourneyList() {
  const popoverRef = useRef(null);
  return (
    <>
      <button popoverTarget="journey-list" className="view-journeys">
        My Journeys
      </button>
      <section
        id="journey-list"
        className="journey-list"
        popover="auto"
        ref={popoverRef}
      >
        <Journeys onSelect={() => popoverRef.current?.hidePopover()} />
      </section>{" "}
    </>
  );
}
