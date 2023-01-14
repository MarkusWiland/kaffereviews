import React, { useState } from "react";
import RateStars from "../RateStars/ratestars";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import s from "./card.module.css";
import { useUser } from "@supabase/auth-helpers-react";
import { motion } from "framer-motion";
export default function Card({ card }) {
  const user = useUser();
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      layout
      className={s.card}
    >
      <Image
        src="/cappucino.jpg"
        width={250}
        height={200}
        className="img"
        alt="Card image cap"
      />
      <div className={s.cardBody}>
        <span className={`${s.tag} ${s.tagTeal}`}>{card.name}</span>

        <p>{card.city}</p>
        <p>pris: {card.price}kr</p>
        <p>{format(parseISO(card.created_at), "yyyy-MM-dd")}</p>

        <div>
          <RateStars count={10} card={card} />
        </div>
        <p>Skriven av: {card.email}</p>
        <p className="card-text">{card?.description}</p>
      </div>
    </motion.div>
  );
}
