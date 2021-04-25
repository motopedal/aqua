import React, { useRef, memo, useState } from "react";
import { InputField, PrimaryButton } from "../Elements";
import { Card, CardActions, CardContent, Popover } from "@material-ui/core";
import { useForm } from "react-hook-form";

export default memo(function CartPopUp({ data: productData, addItem }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { register, getValues, reset } = useForm();

  const handleCart = () => {
    let cartData = [];
    const prices = {};
    productData.variants.map(({ id, price }) => {
      return (prices[id] = price);
    });
    for (const [key, value] of Object.entries(getValues())) {
      value.map((amount, id) => {
        cartData.push({
          id: productData.id * id * 96,
          product: key,
          variant: id,
          quantity: parseInt(amount),
          price: prices[id],
        });
      });
    }
    cartData.forEach((orderItem) => {
      if (orderItem.quantity >= 1) {
        addItem(orderItem, orderItem.quantity);
      }
    });
    reset();
  };
  return (
    <>
      <PrimaryButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        text="add to cart"
      />
      <Popover
        id={anchorEl ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Card
          style={{
            width: "600px",
            height: "fit-content",
          }}
        >
          <CardContent>
            {productData.variants.length > 0 ? (
              <form>
                <table
                  className="table-auto my-3"
                  style={{
                    borderSpacing: "5px",
                    borderCollapse: "separate",
                  }}
                >
                  <thead>
                    <tr>
                      <th class="w-1/2 text-left">Packaging</th>
                      <th class="w-1/4 text-left">Price</th>
                      <th class="w-1/4 text-left">Quantity</th>
                      <th class="w-1/4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.variants.map(({ id, packaging, price }) => {
                      const priceField = useRef();
                      return (
                        <tr>
                          <td>{packaging}</td>
                          <td>{price} €</td>
                          <td>
                            <InputField
                              type="number"
                              placeholder="Quantity"
                              inputProps={{
                                ...register(`${productData.id}.${id}`),
                              }}
                              onChange={(e) => {
                                priceField.current.textContent =
                                  price * e.target.value + " €";
                              }}
                            />
                          </td>
                          <td>
                            <div
                              className="w-14 text-right font-bold flex-grow"
                              ref={priceField}
                            >
                              0 €
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            ) : (
              <div className="flex items-center py-3">Out of stock</div>
            )}
          </CardContent>
          <CardActions>
            <PrimaryButton text="Add to cart!" onClick={() => handleCart()} />
          </CardActions>
        </Card>
      </Popover>
    </>
  );
});
