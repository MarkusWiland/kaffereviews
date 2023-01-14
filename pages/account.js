import { useSession, useUser } from "@supabase/auth-helpers-react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Layout from "../components/Layout/layout";
import { supabaseClient } from "../libs/supabase";
import Link from "next/link";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
export default function account() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const session = useSession();
  console.log("USSSEEER", user);
  console.log("SESSSSION", session);
  const [initialState, setInitialState] = useState({
    username: "",
    fullname: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialState({ ...initialState, [name]: value });
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabaseClient
        .from("profiles")
        .update({
          username: initialState.username,
          full_name: initialState.fullname,
          email: initialState.email,
        })
        .eq("id", user.id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("ratings")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: false });
      if (error) throw error;
      if (data) {
        setLoading(false);
      }
      setCards(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteArticle = async (id) => {
    try {
      const { error } = await supabaseClient
        .from("ratings")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);
  return (
    <Layout>
      <div className="section">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AiOutlineLoading3Quarters size={50} />
          </div>
        ) : (
          <>
            <h1>update profile</h1>
            <form>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="fullname"
                name="fullname"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <button onClick={updateProfile}>update profile</button>
            </form>
            <h1>Account</h1>
            <p>Here is your account page</p>
            <p>Here is your data:</p>
            <div className="grid">
              {cards &&
                cards.map((item) => {
                  return (
                    <div key={item.id}>
                      <h1>Card - {item.id}</h1>
                      <Image
                        src="/cappucino.jpg"
                        width={350}
                        height={350}
                        className="img"
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <div className="card-intro">
                          <p>{item.name}</p>
                          <p>{item.city}</p>
                          <p>pris: {item.price}kr</p>
                          <p>
                            {format(parseISO(item.created_at), "yyyy-MM-dd")}
                          </p>
                          <p>{item.stars}</p>
                        </div>

                        <p className="card-text">{item?.description}</p>
                      </div>
                      <Link href={`account/${user?.id}/${item.id}`}>Edit</Link>
                      <button onClick={() => deleteArticle(item.id)}>
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
