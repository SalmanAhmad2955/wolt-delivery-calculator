import React from "react";

type Result = {
  Result: number;
  setShowResult: (showResult: boolean) => void;
};

export const ShowResult: React.FC<Result> = ({ Result, setShowResult }) => {
  return (
    <div>
      <h3 className={"font-semibold text-2xl mt-2 mb-4"}>
        Delivery Price for the order is : {Result}€
      </h3>
      {/* <h1 className={"text-5xl font-bold mt-2 mb-4"}>{Result}€</h1> */}

      <button
        id={"backToCalculator"}
        className={
          "disabled:bg-gray-300 disabled:cursor-not-allowed" +
          " " +
          "font-bold mt-4 bg-sky-400 text-white rounded-md px-4 py-2 border-none" +
          " " +
          "enabled:hover:bg-sky-300 "
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
