import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { supabaseClient } from "../../libs/supabase";
import { useRouter } from "next/router";
export default function RateStars({ count, card }) {
  const user = useUser();
  const checkUser = user?.id !== card.user_id;
  const router = useRouter();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const ratingSuccess = async (ratingValue, id) => {
    try {
      const { data, error } = await supabaseClient
        .from("ratings")
        .update({ stars: ratingValue })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        {[...Array(count)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <>
              <label key={i}>
                <input
                  type="ratio"
                  disabled={checkUser}
                  name="rating"
                  defaultValue={card.stars}
                  onClick={
                    (() => setRating(ratingValue),
                    () => ratingSuccess(ratingValue, card.id))
                  }
                />
                <FaStar
                  className={`${checkUser} ? "star" : "star-disabled"`}
                  color={
                    checkUser
                      ? ratingValue <= card.stars
                        ? "#ffc107"
                        : "rgba(17, 17, 17, 0.202)"
                      : ratingValue <= (hover || card.stars)
                      ? "#ffc107"
                      : "rgba(17, 17, 17, 0.202)"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                  size={15}
                />
              </label>
            </>
          );
        })}
      </div>
      <p>
        {card.stars} av {count}
      </p>
    </div>
  );
}
