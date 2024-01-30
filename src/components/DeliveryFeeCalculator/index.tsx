import React, { useState } from "react";
import { format } from "date-fns";
import { Input } from "../inputFiled";
import deliveryFeeCalculator from "../../utils/calculateDeliveryFee";
import { ShowResult } from "../Result";
import logo from "../../assets/logo.png";

export const DeliveryFeeCalculator = () => {
  const [formState, setFormState] = useState({
    cartValue: 0,
    deliveryDistance: 0,
    numItems: 0,
    orderTime: new Date(),
  });

  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleOrderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, orderTime: new Date(e.target.value) }));
  };

  const calculateDeliveryFee = () => {
    const calculatedFee = deliveryFeeCalculator(formState);

    setDeliveryFee(calculatedFee);
    setShowResult(true);
    setFormState((prev) => ({
      ...prev,
      cartValue: 0,
      deliveryDistance: 0,
      numItems: 0,
      orderTime: new Date(),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateDeliveryFee();
  };
  return (
    <>
      <div className={"relative"}>
        <div
          className={`absolute
            ${
              showResult ? "top-[-25%]" : "top-[-12%]"
            } left-1/2 transform -translate-x-1/2 z-10`}
        >
          <img src={logo} alt="Logo" className={"w-20"} />
        </div>
        <div className={"flex flex-col gap-3"}>
          <div
            className={`
          bg-white drop-shadow-2xl p-[24px] rounded-[12px] inline-block  min-w-[400px]`}
          >
            {showResult ? (
              <ShowResult
                Result={deliveryFee ?? 0}
                setShowResult={setShowResult}
              />
            ) : (
              <>
                <h1 className={"font-semibold text-lg mb-3 mt-1 mx-auto "}>
                  Delivery Fee Calculator
                </h1>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                  data-test-id="formID"
                >
                  <Input
                    id={"cartValue"}
                    dataTestId={"cartValue"}
                    name={"cartValue"}
                    step={"0.01"}
                    type={"number"}
                    label={"Cart Value"}
                    htmlFor={"cartValue"}
                    supportingText={"€"}
                    value={formState.cartValue.toString()}
                    min={"0"}
                    max={"100000"}
                    onChange={handleInputChange}
                  />
                  <Input
                    id={"deliveryDistance"}
                    dataTestId={"deliveryDistance"}
                    name={"deliveryDistance"}
                    supportingText={"m"}
                    step={"1"}
                    type={"number"}
                    min={"0"}
                    max={"50000"}
                    label={"Delivery Distance"}
                    htmlFor={"deliveryDistance"}
                    value={formState.deliveryDistance.toString()}
                    onChange={handleInputChange}
                  />
                  <Input
                    id={"numItems"}
                    dataTestId={"numItems"}
                    name={"numItems"}
                    step={"1"}
                    min={"0"}
                    max={"1000"}
                    type={"number"}
                    label={"Number of items"}
                    htmlFor={"numItems"}
                    value={formState.numItems.toString()}
                    onChange={handleInputChange}
                  />
                  <Input
                    id={"orderTime"}
                    dataTestId={"orderTime"}
                    name={"orderTime"}
                    step={"60"}
                    type={"datetime-local"}
                    value={format(formState.orderTime, "yyyy-MM-dd'T'HH:mm")}
                    label={"Time"}
                    htmlFor={"orderTime"}
                    onChange={handleOrderTimeChange}
                  />
                  <input
                    type="submit"
                    value="Calculate delivery fee"
                    data-test-id="submitID"
                    className={
                      "font-bold mt-4 bg-sky-400 text-white rounded-full px-4 py-2 border-none " +
                      (formState.cartValue === 0 ||
                      formState.deliveryDistance === 0 ||
                      formState.numItems === 0
                        ? "disabled:bg-gray-300 disabled:cursor-not-allowed"
                        : "enabled:hover:bg-sky-500 transition ease-in delay-150 hover:-translate-y-1 hover:scale-110 duration-300")
                    }
                    disabled={
                      formState.cartValue === 0 ||
                      formState.deliveryDistance === 0 ||
                      formState.numItems === 0
                    }
                  />
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
