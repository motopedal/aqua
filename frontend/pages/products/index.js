import React, { createRef, memo, useEffect, useRef, useState } from "react";
import { fetcherGRAPHQL } from "../../utils/fetcher";
import { PRODUCT_PAGE_QUERY } from "../../utils/schemas/query";
import { LinearProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import gsap from "gsap";
import { PrimaryButton } from "../../components/Elements";
import CartPopUp from "../../components/ProductPage/CartPopUp";
import SliderComponent from "../../components/ProductPage/SliderComponent";
import LearnMore from "../../components/ProductPage/LearnMore";
import { useCart } from "react-use-cart";

export default memo(function Products({ data }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [position, setPosition] = useState(parseInt(router.query.id) * 65 || 0);
  const [isActive, setIsActive] = useState(false);
  const [divs, setDivs] = useState([]);
  const [newPosition, setNewPosition] = useState(
    parseInt(router.query.id) || 0
  );

  const handleWheel = (e) => {
    if (
      position + e / 7 > 0 &&
      newPosition + Math.sign(e) < data.length &&
      !isActive
    ) {
      const newPos = Math.floor(Math.abs(position / e));
      if (newPosition != newPos) {
        let a = newPosition > newPos ? -1 : 1;
        gsap.fromTo(
          divs[newPosition + a].current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
            ease: "expo",
          }
        );
      }
      setPosition((pos) => pos + e / 5);
      setNewPosition(newPos);
    }
  };
  useEffect(() => {
    setDivs((items) =>
      Array(data.length)
        .fill(0)
        .map((_, i) => items[i] || createRef())
    );
  }, [data.length]);
  return (
    <div onWheel={(e) => handleWheel(e.deltaY)} className="overflow-y-hidden">
      {data.map(({ id, name, images }, idx) => {
        const learnmore = useRef();
        return (
          <>
            <div
              ref={divs[idx]}
              key={id}
              className={`flex pl-48  w-full  items-center transition  ${
                idx == newPosition ? "" : "hidden"
              } `}
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <div className="w-3/4">
                <div className="font-bold text-7xl">{name}</div>
                <PrimaryButton
                  onClick={() => {
                    gsap.to(learnmore.current, 0.3, {
                      display: "flex",
                      height: "calc(100vh - 4rem + 10px)",
                      zIndex: "2",
                      opacity: "1",
                    });
                    setIsActive(true);
                  }}
                  text="learn more"
                />
              </div>
              <div className="flex flex-col">
                <SliderComponent images={images} />
                <CartPopUp addItem={addItem} data={data[idx]} />
              </div>
            </div>
            <LearnMore
              learnmore={learnmore}
              data={data[idx]}
              setIsActive={setIsActive}
            />
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
