import React from "react";
import DetailSection from "../../components/DetailSection/DetailSection";
import PageSection from "../../components/PageSection/PageSection";
import BreadcrumbSection from "../../components/BreadcrumbSection/BreadcrumbSection";

function Detail() {
  const list = [1, 1, 1, 1, 1];

  return (
    <main>
      <BreadcrumbSection />
      <DetailSection />
      <PageSection title="Oxşar" list={list} />
    </main>
  );
}

export default Detail;
