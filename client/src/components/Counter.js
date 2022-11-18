import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByValue,
} from "../redux-toolkit/counterSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  // const handleIncrementByValue = () => {
  //   dispatch(incrementByValue({ value: 10 }));
  // };

  return (
    <div className="w-36 h-8 rounded-lg border border-black grid grid-cols-3 place-items-center">
      <div
        className="cursor-pointer h-full w-full grid place-items-center"
        onClick={handleDecrement}
      >
        <AiOutlineMinus></AiOutlineMinus>
      </div>
      <span className="text-lg">{count}</span>
      <div
        className="cursor-pointer h-full w-full grid place-items-center"
        onClick={handleIncrement}
      >
        <AiOutlinePlus></AiOutlinePlus>
      </div>
    </div>
  );
};

export default Counter;
