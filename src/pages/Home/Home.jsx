import React from "react";
import ListContainer from "../../components/ListContainer/ListContainer";
import CategoriesContainer from "../../components/CategoriesContainer/CategoriesContainer";
import PageSection from "../../components/PageSection/PageSection";

function Home() {
  const array = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <main>
      <CategoriesContainer />
      <ListContainer />
      <PageSection title="Ən çox satılanlar" list={array} />
      <PageSection title="Kampaniyalar" list={array} />
    </main>
  );
}

export default Home;
