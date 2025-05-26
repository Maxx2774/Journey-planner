const supabase = require("../../config/supabase");
async function createUserByClerk(req, res) {
  try {
    const { type, data: clerkData } = req.body;
    console.log("webhook recieved");

    if (type === "user.created") {
      const email = clerkData.email_addresses[0]?.email || null;

      const { error } = await supabase.from("users").insert({ email });

      if (error) return res.sendstatus(500);
      return res.sendStatus(200);
    }

    if (type === "user.deleted") {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("clerk_id", clerkData.id);

      if (error) return res.sendStatus(500);
      return res.sendStatus(200);
    }

    if (type === "user.updated") {
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = { createUserByClerk };
