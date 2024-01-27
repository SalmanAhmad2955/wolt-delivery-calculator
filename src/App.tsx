import React from "react";
import DeliveryFeeCalculator from "./components/DeliveryFeeCalculator";
// import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className={"h-screen flex justify-center items-center bg-gray-300"}>
      {/* <SnackbarProvider> */}
      <DeliveryFeeCalculator />
      {/* </SnackbarProvider> */}
    </div>
  );
}

export default App;
