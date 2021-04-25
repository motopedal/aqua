import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../components/YupSchema/schema";
import { Fields } from "./FormFields";
import { PrimaryButton, InputField } from "../Elements";
import { useCart } from "react-use-cart";
import { fetcherGRAPHQL } from "../../utils/fetcher";
import { CREATE_ORDER, CREATE_ORDER_ITEM } from "../../utils/schemas/mutation";
import Router from 'next/router'

export const CheckoutForm = () => {
  const { items, cartTotal, emptyCart } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    reValidateMode: "all",
    criteriaMode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    let state = [];
    items.forEach(async ({ quantity, itemTotal, product, variant }) => {
      const orderItemData = { quantity, total: itemTotal, product, variant };
      await fetcherGRAPHQL(CREATE_ORDER_ITEM(orderItemData)).then(
        ({ createOrderItem }) => {
          state.push(createOrderItem.orderItem.id);
        }
      );
      if (state.length == items.length) {
        const orderData = {
          email: data.mail,
          total: cartTotal,
          orderItems: state,
        };
        fetcherGRAPHQL(CREATE_ORDER(orderData));
      }
    });
    emptyCart();
    Router.push("/");
  };
  return (
    <div className="flex justify-center p-20">
      <Card className="mb-4">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {Fields.map(({ type, label, name, required }) => {
                return (
                  <>
                    <div className="py-2 font-bold">
                      {label}:
                      {required && <span className="py-2 text-red-500">*</span>}
                    </div>
                    <InputField
                      inputProps={{ ...register(`${name}`) }}
                      type={type}
                      error={!!errors[name]}
                      required
                    />
                    <div className="py-2 text-red-500">
                      {errors?.[name]?.message}
                    </div>
                  </>
                );
              })}
              <div className="text-center">
                <PrimaryButton
                  type="submit"
                  disabled={!!Object.keys(errors).length}
                  text="Checkout"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

