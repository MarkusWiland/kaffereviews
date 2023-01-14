import React, { useEffect, useState } from "react";
import Card from "../Card/card";
import { supabaseClient } from "../../libs/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import s from "./cards.module.css";
import Button from "../Button/button";
import { getAllArticles } from "../../helpers/fetch";
import { motion, AnimatePresence } from "framer-motion";
export default function Cards() {
  const user = useUser();
  const [card, setCard] = useState([]);
  const [active, setActive] = useState(0);
  console.log("active", active);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("stars");
  const sortFunc = (a, b) => {
    if (sortType === "lagstpris") {
      return a.price - b.price;
    }
    if (sortType === "hogststars") {
      return b.stars - a.stars;
    }
    if (sortType === "lagststars") {
      return a.stars - b.stars;
    }
    if (sortType === "hogstpris") {
      return b.price - a.price;
    }
    return b[sortType] - a[sortType];
  };
  useEffect(() => {
    const getAllArticlesCard = async () => {
      const getAllArticlesCard = await getAllArticles();

      if (getAllArticlesCard) {
        setLoading(false);
      }
      setCard(getAllArticlesCard.data);
    };
    getAllArticlesCard();
  }, []);
  return (
    <section>
      <div className="container padding-block-900">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={s.cardButtons}>
              <Button
                className={`${active === 0 ? "active" : "button"}`}
                onClick={() => {
                  setFilter(""), setActive(0);
                }}
              >
                Alla
              </Button>
              <Button
                className={` ${active === 1 ? "active" : "button"}`}
                onClick={() => {
                  setFilter("Cappucino"), setActive(1);
                }}
              >
                Cappucino
              </Button>
              <Button
                className={` ${active === 2 ? "active" : "button"}`}
                onClick={() => {
                  setFilter("Kaffe"), setActive(2);
                }}
              >
                Kaffe
              </Button>
              <Button
                className={` ${active === 3 ? "active" : "button"}`}
                onClick={() => {
                  setFilter("Espresso"), setActive(3);
                }}
              >
                Espresso
              </Button>
            </div>

            <div>
              <select
                onChange={(e) => setSortType(e.target.value)}
                className={s.select}
                defaultValue={sortType}
              >
                <option value="hogststars">Högst Betyg</option>
                <option value="lagststars">Lägst Betyg</option>
                <option value="lagstpris">Lägst pris</option>
                <option value="hogstpris">Högst pris</option>
              </select>
            </div>
            <motion.div layout className={s.cards}>
              <AnimatePresence>
                {card?.length > 0 &&
                  card
                    .filter((card) =>
                      card.name.toLowerCase().includes(filter.toLowerCase())
                    )
                    .sort((a, b) => sortFunc(a, b))
                    .map((card) => {
                      return <Card card={card} key={card.id} />;
                    })}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
