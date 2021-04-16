import React, { createRef, memo, useEffect, useState } from "react";
import Popover from "@material-ui/core/Popover";
import { PrimaryButton } from "../Elements";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@material-ui/core";
import { useCart } from "react-use-cart";

export default memo(function CartPopUp({ id: item, variants, price }) {
  const { addItem } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [quantityFields, setQuantityFields] = useState([]);
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
            flexBasis: `calc(100% / 3 - 1.5rem)`,
            height: "fit-content",
          }}
        >
          <CardContent>
            {variants.length > 0 ? (
              variants.map(({ Packaging }, idx) => {
                return (
                  <div className="flex items-center py-3">
                    <div className="w-1/3">{Packaging}</div>
                    <TextField
                      id="standard-number"
                      type="number"
                      placeholder="Quantity"
                      ref={quantityFields[idx]}
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                const data = { id, price };

                console.log(quantityFields[1].value);
                // addItem(data, quantity.current.value);
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
