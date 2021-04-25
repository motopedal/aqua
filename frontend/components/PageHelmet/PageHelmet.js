import { Helmet } from "react-helmet";

export const PageHelmet = ({ router }) => {
  return (
    <Helmet>
      <title>
        {(() => {
          switch (router.pathname) {
            case "/cart":
              return "Cart || ";
            case "/products":
              return "Products || ";
            case "/checkout":
              return "Checkout || ";

            default:
              return "";
          }
        })()}
        Aquabasta
      </title>
      <meta name="description" content="Aquabasta" />
    </Helmet>
  );
};
