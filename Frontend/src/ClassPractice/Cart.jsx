import { useState } from "react";

function Cart() {
  const [Quantity, setQuantity] = useState(1);

  const Increment = () => {
    setQuantity(Quantity + 1);
  };
  const decrement = () => {
    setQuantity(Quantity - 1);
  };
  return (
    <>
      <button onClick={Increment}>+</button>
      <p>{Quantity}</p>
      <button onClick={decrement}>-</button>
    </>
  );
}
export default Cart;
