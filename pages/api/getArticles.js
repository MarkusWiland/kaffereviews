import { supabaseClient } from "../../libs/supabase";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabaseClient
        .from("ratings")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  }
}
