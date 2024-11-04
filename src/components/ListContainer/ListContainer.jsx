import React, { useState } from "react";
import { Button, Col, Row } from "antd";
import ProductCard from "../ProductCard/ProductCard";

function ListContainer() {
  const [isFavorited, setIsFavorited] = useState(false);
  const products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <section className="px-5 desktop:px-10 desktop:py-6 flex flex-col items-center gap-10">
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <Col
            key={index}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={4}
            className="gutter-row"
            span={6}
          >
            <ProductCard />
          </Col>
        ))}
      </Row>
      <Button
        className="hidden desktop:block border border-skyBlue-500 rounded-none py-[7px] w-[279px] h-[38px] text-skyBlue-500 font-semibold text-sm hover:bg-skyBlue-500 hover:text-white"
        type="submit"
      >
        Daha çox
      </Button>
    </section>
  );
}

export default ListContainer;
