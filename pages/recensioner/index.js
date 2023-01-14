import React from "react";
import Cards from "../../components/Cards/cards";
import Layout from "../../components/Layout/layout";
export default function Recensioner() {
  return (
    <Layout>
      <section>
        <div className="container">
          <h1>Recensioner</h1>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod tincidunt nisl, eu aliquam nisl. Nulla facilisi. Nulla
              facilisi. Nulla
            </p>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod tincidunt nisl, eu aliquam nisl. Nulla facilisi. Nulla
              facilisi. Nulla
            </p>
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod tincidunt nisl, eu aliquam nisl. Nulla facilisi. Nulla
              facilisi. Nulla
            </p>
          </div>
          <Cards />
        </div>
      </section>
      <section>
        <div className="container">
          <h1>Recensioner</h1>
          <p>hej</p>
        </div>
      </section>
      <section>
        <div className="container">
          <h1>Recensioner</h1>
          <p>hej</p>
        </div>
      </section>
    </Layout>
  );
}
