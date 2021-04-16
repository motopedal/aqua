import React, { createRef, Suspense, useEffect, useState } from "react";
import { fetcherGRAPHQL } from "../../utils/fetcher";
import { PRODUCT_PAGE_QUERY } from "../../utils/schemas/query";

import { Canvas } from "react-three-fiber";
import { Html } from "@react-three/drei";

export default function Products({ data }) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState();

  useEffect(() => {
    // setItems((items) => {
    //   Array(data.lenght)
    //     .fill(0)
    //     .map((_, i) => {
    //       items[i] = items[i] || createRef();
    //     });
    // });
  }, [data.lenght]);

  return (
    <div>
      <Canvas
        onScroll={() => console.log("asd")}
        className="flex pt-60 absolute w-full"
      >
        <Suspense fallback={<h1>asd</h1>}>
          <Html>
            {data.map(({ id, Name, Description, Price, Images, variants }) => {
              return (
                <div key={id} className="flex pl-48 absolute w-full">
                  <div className="w-4/6">
                    <div>{Name}</div>
                    <div>{Description}</div>
                    {variants.map(({ Packaging }) => {
                      return <div>{Packaging}</div>;
                    })}
                    <div>{Price}€</div>
                  </div>
                  <div>
                    <img
                      className="w-48"
                      src={`http://localhost:1337${Images[0].url}`}
                    />
                  </div>
                </div>
              );
            })}
          </Html>
        </Suspense>
      </Canvas>
    </div>
  );
}
export async function getStaticProps() {
  const data = await fetcherGRAPHQL(PRODUCT_PAGE_QUERY);
  return {
    props: { data: data.products },
  };
}
