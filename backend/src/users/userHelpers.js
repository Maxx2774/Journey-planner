const supabase = require("../config/supabase");

async function getUserIdByClerkId(clerk_id) {
  try {
    const { data: id, error } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerk_id)
      .single();
    if (error) throw error;
    return id;
  } catch (error) {
    return { error: "User not found" };
  }
}

module.exports = { getUserIdByClerkId };
