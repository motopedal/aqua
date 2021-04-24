import React from "react";
import { Card } from "react-bootstrap";

export default function Form({}) {
  return (
    <div className="row">
      <Card className="mb-4">
        <Card.Body>
          <p className="mb-4">
            Enter your billing address and information here.
          </p>
          <div>
            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="fname"
              >
                <span class="required">*</span>First Name:
              </label>
              <div className="col-sm-8">
                <input
                  ref={register({
                    required: "First name is a required field.",
                  })}
                  className="form-control"
                  name="billingInfo.fname"
                  type="text"
                  style={{
                    borderColor: errors.billingInfo?.fname?.message
                      ? "red"
                      : "",
                  }}
                />
                {errors.billingInfo?.fname?.message}
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="lname"
              >
                <span class="required">*</span>Last Name:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="billingInfo.lname"
                  type="text"
                  ref={register({
                    required: "Last name is a required field.",
                  })}
                  style={{
                    borderColor: errors.billingInfo?.lname?.message
                      ? "red"
                      : "",
                  }}
                />
                {errors.billingInfo?.lname?.message}
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="phone"
              >
                <span class="required">*</span>Phone Number:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="billingInfo.phone"
                  type="tel"
                  ref={register({
                    required: "Phone number is a required field.",
                  })}
                  style={{
                    borderColor: errors.billingInfo?.phone?.message
                      ? "red"
                      : "",
                  }}
                />
                {errors.billingInfo?.phone?.message}
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="company"
              >
                Company:
              </label>
              <div className="col-sm-8">
                <input
                  ref={register}
                  className="form-control"
                  name="billingInfo.company"
                  type="text"
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="address"
              >
                <span class="required">*</span>Street Address 1:
              </label>
              <div className="col-sm-8">
                <input
                  ref={register({
                    required: "Address is a required field.",
                  })}
                  className="form-control"
                  name="billingInfo.address"
                  type="text"
                  style={{
                    borderColor: errors.billingInfo?.address?.message
                      ? "red"
                      : "",
                  }}
                />
                {errors.billingInfo?.address?.message}
              </div>
            </div>
            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="unit"
              >
                Unit #
              </label>
              <div className="col-sm-8">
                <input
                  ref={register}
                  className="form-control"
                  name="billingInfo.unit"
                  type="number"
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="city"
              >
                City
              </label>
              <div className="col-sm-8">
                <input
                  defaultValue={billingCity}
                  ref={register}
                  className="form-control"
                  type="text"
                  name="billingInfo.city"
                  disabled
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="country"
              >
                Country
              </label>
              <div className="col-sm-8">
                <select
                  id="country"
                  className="form-control w-auto mr-2"
                  name="billingInfo.country"
                  defaultValue="US"
                  ref={register}
                >
                  <option value="US">United States</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label
                className="col-sm-4 col-form-label text-sm-right"
                htmlFor="state"
              >
                State
              </label>
              <div className="col-sm-8">
                <select
                  id="state"
                  className="form-control w-auto mr-2"
                  ref={register}
                  disabled
                  value={billingState ? billingState : null}
                  name="billingInfo.state"
                >
                  <option style={{ display: "hidden" }}></option>
                  {states.map(({ key, value }) => {
                    return <option value={key}>{value}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          )
        </Card.Body>
      </Card>
    </div>
  );
}
