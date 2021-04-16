import React, { memo, useRef, useState } from "react";
import { fetcherGRAPHQL } from "../../utils/fetcher";
import { PRODUCT_PAGE_QUERY } from "../../utils/schemas/query";
import { LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import gsap from "gsap";
import { PrimaryButton } from "../../components/Elements";
import CartPopUp from "../../components/ProductPage/CartPopUp";
import SliderComponent from "../../components/ProductPage/SliderComponent";

export default memo(function Products({ data }) {
  const router = useRouter();
  const [position, setPosition] = useState(parseInt(router.query.id) * 65 || 0);
  const [newPosition, setNewPosition] = useState(
    parseInt(router.query.id) || 0
  );

  const handleWheel = (e) => {
    if (position + e / 7 > 0 && newPosition + Math.sign(e) < data.length) {
      setPosition((pos) => pos + e / 5);
      setNewPosition(Math.floor(Math.abs(position / e)));
    }
  };
  return (
    <div onWheel={(e) => handleWheel(e.deltaY)}>
      {data.map(({ id, Name, Description, price, Images, variants }, idx) => {
        const learnmore = useRef();
        return (
          <>
            <div
              key={id}
              className={`flex pl-48  w-full items-center ${
                idx == newPosition ? "" : "hidden"
              } `}
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <div className="w-3/4">
                <div className="font-bold text-7xl">{Name}</div>
                <PrimaryButton
                  onClick={() => {
                    gsap.to(learnmore.current, {
                      display: "flex",
                      height: "calc(100vh - 4rem)",
                      opacity: "1",
                    });
                  }}
                  text="learn more"
                />
              </div>
              <div className="flex flex-col">
                <SliderComponent Images={Images} />
                <CartPopUp id={id} variants={variants} price={price} />
              </div>
            </div>
            <div
              ref={learnmore}
              className={`flex pl-48  w-full absolute h-screen bg-white`}
              style={{
                height: "0px",
                top: "4rem",
                bottom: 0,
                display: "none",
              }}
            >
              <div className="w-3/4 mt-40">
                <div className="font-bold text-7xl">{Name}</div>
                <div className="mt-14">{Description}</div>
                {variants.map(({ Packaging }) => {
                  return <div>{Packaging}</div>;
                })}
                <div className="mt-14">{price}€</div>
              </div>
              <h1
                onClick={() =>
                  gsap.to(learnmore.current, {
                    display: "none",
                    height: "0",
                    opacity: "0",
                  })
                }
                style={{
                  position: "absolute",
                  top: "2rem",
                  right: "8rem",
                }}
                className="font-bold text-2xl cursor-pointer"
              >
                x
              </h1>
            </div>
          </>
        );
      })}
      <LinearProgress
        variant="determinate"
        value={(newPosition + 1) * (100 / data.length)}
      />
    </div>
  );
});

export async function getStaticProps() {
  const data = await fetcherGRAPHQL(PRODUCT_PAGE_QUERY);
  return {
    props: { data: data.products },
  };
}
