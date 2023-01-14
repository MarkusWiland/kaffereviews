import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
export default function layout({ children }) {
  return (
    <div>
      <Header />
      <div> {children}</div>
      <Footer />
    </div>
  );
}
