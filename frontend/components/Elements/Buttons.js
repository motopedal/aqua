import React from "react";

const PrimaryButton = ({ onClick, text }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="hover:bg-black hover:text-white font-bold cursor-pointer text-center mt-14 border-2 border-black rounded-2xl py-2 w-32 self-center"
      >
        {text}
      </div>
    </>
  );
};

const CartButton = ({ onClick, text }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="font-bold rounded-2xl cursor-pointer text-center mt-2 border-2 border-black py-2 w-32 
        self-right hover:bg-black hover:text-white  "
      >
        {text}
      </div>
    </>
  );
};

export { PrimaryButton, CartButton };
