import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import React from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
export default function login() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) router.push("/");

  return (
    <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
  );
}
