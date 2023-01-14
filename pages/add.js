import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import React from "react";
import AddCard from "../components/AddCard/addCard";
import Layout from "../components/Layout/layout";
export default function AddNewCard() {
  return (
    <Layout>
      <AddCard />
    </Layout>
  );
}
export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
