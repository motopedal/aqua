import React, { createRef, memo, useEffect, useState } from "react";
import Popover from "@material-ui/core/Popover";
import { PrimaryButton } from "../Elements";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";

export default memo(function CartPopUp({ addItem, id: item, variants, price }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [quantityFields, setQuantityFields] = useState([]);
  const [priceField, setPrice] = useState([]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setQuantityFields((items) =>
      Array(variants.length)
        .fill(0)
        .map((_, i) => items[i] || createRef())
    );
    setPrice((items) =>
      Array(variants.length)
        .fill(0)
        .map((_, i) => items[i] || createRef())
    );
  }, [variants.length]);
  return (
    <>
      <PrimaryButton onClick={handleClick} text="add to cart" />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          key={id}
          style={{
            width: "500px",
            height: "fit-content",
          }}
        >
          <CardContent>
            {variants.length > 0 ? (
              variants.map(({ packaging, price }, idx) => {
                return (
                  <div className="flex items-center py-3 justify-between">
                    <div className="w-1/6">{packaging}</div>
                    <input
                      type="number"
                      name={packaging}
                      placeholder="Quantity"
                      ref={quantityFields[idx]}
                      onChange={(e) => {
                        priceField[idx].current.textContent =
                          price * e.target.value + " €";
                      }}
                    />
                    <div
                      className="w-14 text-right font-bold"
                      ref={priceField[idx]}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex items-center py-3">Out of stock</div>
            )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                const quantity = { total: 0 };
                quantityFields.forEach((el) => {
                  quantity[el.current.name.replace(" ", "_")] =
                    el.current.value;
                  quantity["total"] += parseInt(el.current.value);
                });
                const data = { id: item, price, quantity: quantity };
                addItem(data, quantity.total);
              }}
            >
              Add to cart
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
});
