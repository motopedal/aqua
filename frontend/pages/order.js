import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { memo, useRef } from "react";
import { useCart } from "react-use-cart";
import { fetcherGRAPHQL } from "../utils/fetcher";
import { PRODUCT_PAGE_QUERY } from "../utils/schemas/query";
import Link from "next/link";

export default memo(function order({ data }) {
  const { addItem } = useCart();
  return (
    <div className="flex flex-row flex-wrap gap-6 p-32">
      {data.map(({ id, name, images, variants }, idx) => {
        const quantity = useRef();
        return (
          <Card
            key={id}
            style={{
              flexBasis: `calc(100% / 3 - 1.5rem)`,
              height: "fit-content",
            }}
          >
            <CardMedia
              style={{ height: "200px", backgroundSize: "contain" }}
              image={`http://localhost:1337${images[0]?.url}`}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              {variants.length > 0 ? (
                variants.map(({ packaging, price }) => {
                  return (
                    <div className="flex items-center py-3">
                      <div className="w-1/6">
                        {packaging} {price}
                      </div>
                      <TextField
                        id="standard-number"
                        label="Quantity"
                        type="number"
                        ref={quantity}
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
                onClick={() => addItem(data[idx], quantity.current.value)}
              >
                Add to cart
              </Button>
              <Link href={`/products?id=${idx}`} as="/products">
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </Link>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
});

export async function getStaticProps() {
  const data = await fetcherGRAPHQL(PRODUCT_PAGE_QUERY);
  return {
    props: { data: data.products },
  };
}
