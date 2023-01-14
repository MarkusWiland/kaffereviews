import React from "react";
import s from "./header.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
export default function Header() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const router = useRouter();
  return (
    <header className={s.primaryHeader}>
      <div className="container">
        <div className={s.navWrapper}>
          <a href="/" className={s.headerLogo}>
            <img src="/logo.png" className={s.logo} alt="logo" />
          </a>

          <nav className="primary-navigation">
            <ul role="list" className={s.navList}>
              <li className={`${router.pathname === "/" ? `${s.active}` : ""}`}>
                <Link href="/">Hem</Link>
              </li>
              <li
                className={`${
                  router.pathname === "/recensioner" ? `${s.active}` : ""
                }`}
              >
                <Link href="/recensioner">Recensioner</Link>
              </li>
              <li
                className={`${
                  router.pathname === "/artiklar" ? `${s.active}` : ""
                }`}
              >
                <Link href="/artiklar">Artiklar</Link>
              </li>
              <li
                className={`${router.pathname === "/hem" ? `${s.active}` : ""}`}
              >
                <Link href="/hem">Hem</Link>
              </li>
              <li
                className={`${router.pathname === "/hem" ? `${s.active}` : ""}`}
              >
                <Link href="/hem">Hem</Link>
              </li>
            </ul>
          </nav>
          {user ? (
            <div className={s.user}>
              <ul role="list" style={{ display: "flex", gap: "1rem" }}>
                <li className="button">
                  <Link href="/add">Add</Link>
                </li>
                <li className="button">
                  <Link href="/account">Account</Link>
                </li>
                <li>
                  <button
                    className="button"
                    onClick={async () => await supabaseClient.auth.signOut()}
                  >
                    logga ut
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="button">
              Logga in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
