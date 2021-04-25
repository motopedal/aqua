import "tailwindcss/tailwind.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../styles/style.css";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { CartProvider } from "react-use-cart";
import { ContextProvider } from "../utils/context";
import { CookiesProvider } from "react-cookie";
import { PageHelmet } from "../components/PageHelmet/PageHelmet";

function MyApp({ Component, pageProps, router }) {
  return (
    <CookiesProvider>
      <CartProvider>
        <ContextProvider>
          <PageHelmet router={router}/>
          <Navbar />
          <Component {...pageProps} />
          {router.asPath !== "/products" && <Footer />}
        </ContextProvider>
      </CartProvider>
    </CookiesProvider>
  );
}

export default MyApp;
