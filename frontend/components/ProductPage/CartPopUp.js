import React, { useRef, memo, useState } from "react";
import Popover from "@material-ui/core/Popover";
import { PrimaryButton } from "../Elements";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { useForm } from "react-hook-form";

export default memo(function CartPopUp({ data: productData, addItem }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { register, getValues, reset } = useForm();

  const handleCart = () => {
    let data = [];
    const prices = {};
    productData.variants.map(({ id, price }) => {
      return (prices[id] = price);
    });
    for (const [key, value] of Object.entries(getValues())) {
      value.map((amount, id) => {
        data.push({
          id: productData.id * id * 96,
          product: key,
          variant: id,
          quantity: parseInt(amount),
          price: prices[id],
        });
      });
    }
    data.forEach((orderItem) => {
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
            width: "500px",
            height: "fit-content",
          }}
        >
          <CardContent>
            {productData.variants.length > 0 ? (
              <form>
                {productData.variants.map(({ id, packaging, price }) => {
                  const priceField = useRef();
                  return (
                    <div className="flex items-center py-3 justify-between">
                      <div className="w-1/6">{packaging}</div>
                      <input
                        type="number"
                        placeholder="Quantity"
                        {...register(`${productData.id}.${id}`)}
                        onChange={(e) => {
                          priceField.current.textContent =
                            price * e.target.value + " €";
                        }}
                      />
                      <div
                        className="w-14 text-right font-bold"
                        ref={priceField}
                      />
                    </div>
                  );
                })}
              </form>
            ) : (
              <div className="flex items-center py-3">Out of stock</div>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleCart()}>
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
});
