import React, { memo } from "react";
import gsap from "gsap";

export default memo(function LearnMore({ learnmore, data, setIsActive }) {
  const { name, description, variants } = data;
  return (
    <div
      ref={learnmore}
      className="flex pl-48  w-full absolute h-screen bg-white overflow-y-hidden"
      style={{
        height: "0px",
        bottom: 0,
        display: "none",
        backgroundColor: "rgba(243,239,239, 1)",
      }}
    >
      <div className="w-3/4 mt-40">
        <div className="font-bold text-7xl">{name}</div>
        <div className="mt-14">{description}</div>
        {variants?.map(({ packaging, price }) => {
          return (
            <div className="mt-14 flex">
              <div>{packaging}</div>
              <div>{price}</div>
            </div>
          );
        })}
      </div>
      <h1
        onClick={() => {
          gsap.to(learnmore.current, {
            display: "none",
            height: "0",
            opacity: "0",
          });
          setIsActive(false);
        }}
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
  );
});
