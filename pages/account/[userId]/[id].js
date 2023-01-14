import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/layout";

import { useUser } from "@supabase/auth-helpers-react";

import { FaStar } from "react-icons/fa";
import s from "../../../components/AddCard/AddCard.module.css";
import { supabaseClient } from "../../../libs/supabase";
import { useForm } from "react-hook-form";
import { getArticle } from "../../../helpers/fetch";
export default function id() {
  const router = useRouter();
  const { id } = router.query;
  console.log("refresg", id);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialState = {
    name: "",
    price: "",
    city: "",
    description: "",
  };
  const [articleData, setArticleData] = useState(initialState);
  const user = useUser();
  console.log("articleData", articleData);
  useEffect(() => {
    if (id) {
      const getArticleCard = async () => {
        const getArticleCard = await getArticle(id);
        setArticleData(getArticleCard.data);
        setLoading(false);
      };
      getArticleCard();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setArticleData({ ...articleData, [name]: value });
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = async (dataForm) => {
    try {
      const { error } = await supabaseClient
        .from("ratings")
        .update({
          name: dataForm.name,
          price: dataForm.price,
          city: dataForm.city,
          description: dataForm.description,
          stars: rating,
        })
        .eq("id", id);
      if (error) throw error;
      router.push(`/account`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Edit Card</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <select
              name="name"
              {...register("name")}
              onChange={(e) => handleChange(e)}
              className={s.contactInput}
              defaultValue={articleData?.name}
            >
              <option value="chose">Välj SORT</option>
              <option value="coffe">Kaffe</option>
              <option value="cappucino">Cappucino</option>
              <option value="espresso">Espresso</option>
            </select>
            <input
              type="text"
              name="city"
              {...register("city")}
              className={s.contactInput}
              autoComplete="off"
              defaultValue={articleData?.city}
              placeholder="Stad"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              {...register("price")}
              className={s.contactInput}
              placeholder="Pris"
              autoComplete="off"
              defaultValue={articleData?.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
            <textarea
              name="description"
              {...register("description")}
              autoComplete="off"
              placeholder="Beskrivning"
              defaultValue={articleData?.description}
              onChange={(e) => handleChange(e)}
              className={s.contactInput}
            />

            <div>
              {[...Array(10)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                  <label key={i}>
                    <input
                      key={articleData?.id}
                      type="ratio"
                      disabled={!user}
                      name="rating"
                      onChange={(e) => handleChange(e)}
                      defaultValue={articleData?.stars}
                      onClick={() => setRating(ratingValue)}
                    />

                    <FaStar
                      className={`${user} ? "star" : "star-disabled"`}
                      color={
                        !user
                          ? ratingValue <= articleData?.stars
                            ? "#ffc107"
                            : "rgba(17, 17, 17, 0.202)"
                          : ratingValue <= (hover || articleData?.stars)
                          ? "#ffc107"
                          : "rgba(17, 17, 17, 0.202)"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      size={25}
                    />
                  </label>
                );
              })}
            </div>
            <input type="submit" />
          </form>
        )}
      </div>
    </Layout>
  );
}
