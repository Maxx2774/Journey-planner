const supabase = require("../../config/supabase");
const { getUserIdByClerkId } = require("../../users/userHelpers");
async function getJourneys(req, res) {
  try {
    if (!req.auth.userId) return res.sendStatus(404);

    const { id, error: getUserIdError } = await getUserIdByClerkId(
      req.auth.userId
    );

    if (getUserIdError) {
      return res.status(404).json({ error: getUserIdError });
    }
    const { data: journeys, error: journeysError } = await supabase
      .from("journeys")
      .select("*")
      .eq("user_id", id);
    if (journeysError) throw journeysError;
    return res.status(200).json(journeys);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function getJourneyById(req, res) {
  try {
    const { id } = req.params;
    const clerk_id = req.auth.userId;

    if (!clerk_id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { id: userId, error: getUserIdError } = await getUserIdByClerkId(
      clerk_id
    );
    if (getUserIdError) return res.status(404).json({ error: getUserIdError });

    const { data: journey, error } = await supabase
      .from("journeys")
      .select("*")
      .eq("journey_id", id)
      .eq("user_id", userId)
      .single();

    if (error) return res.status(404).json({ error: "Journey not found" });
    return res.status(200).json(journey);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function createJourney(req, res) {
  try {
    const clerk_id = req.auth.userId;
    const journeyData = req.body;
    if (!clerk_id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { id: userId, error: getUserIdError } = await getUserIdByClerkId(
      clerk_id
    );

    const adjustedJourneyData = {
      ...journeyData,
      user_id: userId,
    };

    const { data: journey, error } = await supabase
      .from("journeys")
      .insert(adjustedJourneyData)
      .select("*")
      .single();

    if (error) {
      let message = "";
      if (error.code === "23505") {
        if (error.message.includes("journeys_title_key")) {
          message = "A journey with this title already exists";
        }
      }
      return res.status(400).json({ error: message });
    }
    return res.status(201).json(journey);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function updateJourney(req, res) {
  try {
    const clerk_id = req.auth.userId;
    const journey_id = req.params.id;
    const updatePayload = req.body;

    if (!clerk_id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { id: userId, error: getUserIdError } = await getUserIdByClerkId(
      clerk_id
    );
    console.log(journey_id);
    if (getUserIdError) return res.status(404).json({ error: getUserIdError });

    const { data: updatedJourney, error } = await supabase
      .from("journeys")
      .update(updatePayload)
      .eq("journey_id", journey_id)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (error) {
      console.error(error);
      throw error;
    }

    return res.status(200).json(updatedJourney);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server errorr" });
  }
}

module.exports = { getJourneys, getJourneyById, updateJourney, createJourney };
