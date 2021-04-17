import React, { createContext } from "react";
import { useRouter } from "next/router";
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";

const Context = createContext();

const ContextProvider = (props) => {
  const router = useRouter();
  const items = [
    {
      id: router.route,
    },
  ];
  return (
    <Context.Provider>
      <Transition
        items={items}
        keys={(item) => item.id}
        from={() => {
          const from = {
            opacity: 0.6,
          };
          return from;
        }}
        enter={() => async (next) => {
          await next({
            opacity: 1,
          });
        }}
        config={{ duration: 400 }}
      >
        {(styles) => (
          <animated.div style={{ ...styles, width: "100%" }}>
            {props.children}
          </animated.div>
        )}
      </Transition>
    </Context.Provider>
  );
};

export { ContextProvider, Context };
