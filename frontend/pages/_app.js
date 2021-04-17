import "tailwindcss/tailwind.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import Navbar from "../components/NavBar/Navbar";
import { CartProvider } from "react-use-cart";
import Footer from "../components/Footer/Footer";
import { ContextProvider } from "../utils/context";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <ContextProvider>
        <CartProvider>
          <Navbar />
          <Component {...pageProps} />
          {router.asPath !== "/products" && <Footer />}
        </CartProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;
