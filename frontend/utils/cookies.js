import axios from "axios";

export default function Cookies(cookies, setCookie, router) {
  if (!cookies.user_id) {
    const token = Math.random().toString(36).substr(2);
    setCookie("user_id", token);
    setCookie("u_b", true);
    axios.post("http://localhost:1337/commerce/track-create", {
      user_id: token,
    });
  } else if (router.route == "/cart" && cookies.s !== "checkout") {
    setCookie("s", "cart");
    axios.post(`http://localhost:1337/commerce/track-user`, {
      user_id: cookies.user_id,
      status: "cart",
    });
  } else if (router.route == "/checkout") {
    setCookie("s", "checkout");
    axios.post(`http://localhost:1337/commerce/track-user`, {
      user_id: cookies.user_id,
      status: "checkout",
    });
  }
  if (router.route !== "/" && cookies.u_b == "true") {
    setCookie("u_b", false);
    axios.post(`http://localhost:1337/commerce/track-user`, {
      user_id: cookies.user_id,
      u_b: "false",
    });
  }
}
