import "tailwindcss/tailwind.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import Navbar from "../components/NavBar/Navbar";
import { CartProvider } from "react-use-cart";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}

export default MyApp;
