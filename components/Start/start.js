import React from "react";
import Cards from "../Cards/cards";
import Layout from "../Layout/layout";
import s from "./start.module.css";
import { motion } from "framer-motion";
export default function Start() {
  return (
    <Layout>
      <section className="section">
        <div className={`${s.evenColumns} container padding-block-900`}>
          <motion.div
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className={s.leftColumn}
          >
            <h1 className={s.evenColumnsH1}>Lär dig mer om kaffe</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod tincidunt nisl, eu aliquam nisl. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. <span>Nulla facilisi.</span> Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
              <span> Nulla facilisi.</span> Nulla facilisi. Nulla facilisi.
              Nulla facilisi. Nulla
            </p>
            <p>
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
              facilisi. Nulla facilisi.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 250 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img src="/cappucino.jpg" width="100%" height="100%" />
          </motion.div>
        </div>
      </section>
      <Cards />
    </Layout>
  );
}
