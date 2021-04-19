import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Input,
  Typography,
} from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { fetcherGRAPHQL } from "../utils/fetcher";
import { PRODUCT_PAGE_QUERY } from "../utils/schemas/query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CartButton } from "../components/Elements";

export default function Cart({ data }) {
  const [priceFields, setPriceFields] = useState([]);
  const { items, updateItemQuantity, removeItem, isEmpty } = useCart();
  const { register, getValues } = useForm();

  const cartItems = items.map(({ product }) => {
    return product;
  });

  useEffect(() => {
    setPriceFields((field) =>
      Array(cartItems.length)
        .fill()
        .map((_, i) => field[i] || createRef())
    );
  }, [cartItems.length]);

  const handleCart = (productId) => {
    let data = [];
    for (const [key, value] of Object.entries(getValues(productId))) {
      data.push({
        id: productId * key * 96,
        quantity: parseInt(value),
      });
    }
    data.forEach((orderItem) => {
      try {
        if (orderItem.quantity > 0) {
          updateItemQuantity(orderItem.id, orderItem.quantity);
        } else {
          removeItem(orderItem.id);
        }
      } catch (error) {}
    });
  };

  return !isEmpty ? (
    <div className="flex gap-6" style={{ minHeight: "90vh" }}>
      <div className="flex flex-row flex-wrap gap-6 w-3/4 px-32 py-20">
        {data.map(({ id: productId, name, images, variants }, idx) => {
          if (cartItems.includes(productId)) {
            return (
              <Card
                key={productId}
                style={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  border: "0.5px solid rgba(0,0,0,0.1)",
                }}
                className="flex flex-row flew-wrap p-2"
              >
                <CardMedia
                  style={{
                    backgroundSize: "contain",
                    width: "calc(100% / 4)",
                  }}
                  image={`http://localhost:1337${images[0]?.url}`}
                  title="Contemplative Reptile"
                />
                <div className="flex flex-col w-full">
                  <CardContent>
                    <div className="flex flex-col">
                      <Typography gutterBottom variant="h5" component="h2">
                        {name}
                      </Typography>
                      {variants.map(({ id, packaging, price }) => {
                        return cartItems.map((product, idy) => {
                          if (
                            product == productId &&
                            items[idy].variant == id
                          ) {
                            return (
                              <>
                                <div className="flex items-center py-3 ">
                                  <div className="w-1/6">
                                    {packaging} / {price} €
                                  </div>
                                  <Input
                                    id="standard-basic"
                                    type="number"
                                    placeholder="Quantity"
                                    label="Quantity"
                                    inputProps={{
                                      ...register(`${productId}.${id}`),
                                    }}
                                    onChange={(e) => {
                                      priceFields[idy].current.textContent =
                                        price * e.target.value + " €";
                                    }}
                                    defaultValue={items[idy].quantity}
                                  />
                                  <div
                                    className="w-14 text-right font-bold flex-grow"
                                    ref={priceFields[idy]}
                                  >
                                    {items[idy].quantity * price + " €"}
                                  </div>
                                </div>
                              </>
                            );
                          }
                        });
                      })}
                      <div>
                        {(() => {
                          let total = 0;
                          items.map(({ itemTotal, product }) => {
                            if (productId == product) {
                              total += itemTotal;
                            }
                          });
                          return (
                            <div className="mt-5 font-bold text-right border-t-2 border-black float-right w-1/6">{`Total: ${total} €`}</div>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                  <CardActions className="flex justify-end">
                    <CartButton
                      text="update cart"
                      onClick={() => handleCart(productId)}
                    />
                    <Link href={`/products?id=${idx}`} as="/products">
                      <CartButton text="learn more" />
                    </Link>
                  </CardActions>
                </div>
              </Card>
            );
          }
        })}
      </div>
      <Card className="w-1/4 py-32">
        <div className="flex justify-center">
          <Link href="/checkout">
            <CartButton text="Checkout" />
          </Link>
        </div>
      </Card>
    </div>
  ) : (
    <div
      style={{ minHeight: "80vh" }}
      className="text-center mt-20 font-bold text-3xl"
    >
      Your cart is empty
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetcherGRAPHQL(PRODUCT_PAGE_QUERY);
  return {
    props: { data: data.products },
  };
}
