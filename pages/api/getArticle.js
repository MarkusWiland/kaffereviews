import { supabaseClient } from "../../libs/supabase";
export default async function handler(req, res) {
  const id = req.query.id;

  if (req.method === "GET") {
    if (!id) return res.status(400).json({ error: "Missing ID" });
    try {
      const { data, error } = await supabaseClient
        .from("ratings")
        .select("*")
        .eq("id", id)
        .single();

      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  }
}
