import React from "react";
import s from "./footer.module.css";
export default function footer() {
  return (
    <footer className={`${s.footer} container`}>
      <div>
        <div class={s.row}>
          <p>icons</p>
          <p>icons</p>
          <p>icons</p>
          <p>icons</p>
        </div>

        <div className={s.row}>
          <ul className={s.ul}>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>

        <div className={s.row}>
          INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By:
          Mahesh
        </div>
      </div>
    </footer>
  );
}
