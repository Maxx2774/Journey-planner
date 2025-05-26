import JourneyPage from "./pages/journeys/JourneyPage";
import JourneysOnboarding from "./pages/journeys/Onboarding";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./layout/nav/Nav";

import { SignedIn } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Nav />
      <ToastContainer />

      <Routes>
        <Route path="/planner/journeys" element={<JourneysOnboarding />} />

        <Route
          path="/planner/journeys/:id"
          element={
            <SignedIn>
              <JourneyPage />
            </SignedIn>
          }
        />
      </Routes>
    </>
  );
}

export default App;
