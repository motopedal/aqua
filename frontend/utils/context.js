import React, { createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Transition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import { useCookies } from "react-cookie";
import axios from "axios";

const Context = createContext();

const ContextProvider = (props) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies();

  const items = [
    {
      id: router.route,
    },
  ];

  useEffect(() => {
    if (!cookies.user_id) {
      const token = Math.random().toString(36).substr(2);
      setCookie("user_id", token);
      axios.post("http://localhost:1337/commerce/track-create", {
        user_id: token,
      });
    } else if (router.route == "/cart") {
      axios.post(`http://localhost:1337/commerce/track-user`, {
        user_id: cookies.user_id,
        status: "cart",
      });
    } else if (router.route == "/checkout") {
      axios.post(`http://localhost:1337/commerce/track-user`, {
        user_id: cookies.user_id,
        status: "checkout",
      });
    }
  }, [router.route]);
  return (
    <Context.Provider value>
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
