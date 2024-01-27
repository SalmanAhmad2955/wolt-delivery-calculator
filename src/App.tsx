import React from "react";
import DeliveryFeeCalculator from "./components/DeliveryFeeCalculator";
import background from "./assets/background.png";

function App() {
  return (
    <div
      className="h-screen flex justify-center items-center bg-cover "
      style={{ backgroundImage: `url(${background})` }}
    >
      <DeliveryFeeCalculator />
    </div>
  );
}

export default App;
