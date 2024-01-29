import React from "react";

type Result = {
  Result: number;
  setShowResult: (showResult: boolean) => void;
};

export const ShowResult: React.FC<Result> = ({ Result, setShowResult }) => {
  return (
    <div className={`p-[2px] rounded-[12px]`}>
      <h3 className={"font-semibold text-2xl mt-2 mb-4"}>
        {Result === 0
          ? "Your Delivery Is Free 🎉"
          : `Delivery Fee For Your Order Is : ${Result}€`}
      </h3>

      <button
        id={"backToCalculator"}
        data-test-id={"fee"}
        className={
          "font-bold mt-2 bg-sky-400 text-white rounded-md px-4 py-2 border-none  transition ease-in delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-sky-400 duration-300"
        }
        style={{
          borderRadius: "8px",
          padding: "8px 16px",
          border: "none",
          fontWeight: "bold",
        }}
        onClick={() => setShowResult(false)}
      >
        Back to the calculator
      </button>
    </div>
  );
};
