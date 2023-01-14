import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import s from "./addCard.module.css";
import { supabaseClient } from "../../libs/supabase";
import { useForm } from "react-hook-form";
export default function addCard() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [initialState, setInitialState] = useState({
    name: "",
    price: "",
    city: "",
    description: "",
  });
  const user = useUser();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setInitialState({ ...initialState, [name]: value });
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = async (dataForm) => {
    console.log(dataForm);
    try {
      const { error } = await supabaseClient.from("ratings").insert({
        ...dataForm,
        user_id: user.id,
        stars: rating,
      });
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="section"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Add Card</h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <select
          name="name"
          {...register("name")}
          onChange={(e) => handleChange(e)}
          className={s.contactInput}
        >
          <option value="">Välj SORT</option>
          <option value="Kaffe">Kaffe</option>
          <option value="Cappucino">Cappucino</option>
          <option value="Espresso">Espresso</option>
        </select>
        <input
          type="text"
          name="city"
          {...register("city")}
          className={s.contactInput}
          autoComplete="off"
          placeholder="Stad"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          {...register("price")}
          className={s.contactInput}
          placeholder="Pris"
          autoComplete="off"
          name="price"
          onChange={(e) => handleChange(e)}
        />
        <textarea
          name="description"
          {...register("description")}
          autoComplete="off"
          placeholder="Beskrivning"
          onChange={(e) => handleChange(e)}
          className={s.contactInput}
        />

        <div>
          {[...Array(10)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label key={i}>
                <input
                  key={i}
                  type="ratio"
                  name="rating"
                  onChange={(e) => handleChange(e)}
                  defaultValue={rating}
                  onClick={() => setRating(ratingValue)}
                />

                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating)
                      ? "#ffc107"
                      : "rgba(17, 17, 17, 0.202)"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  size={40}
                />
              </label>
            );
          })}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
