import React from "react";

const PrimaryButton = ({ onClick, text }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer text-center mt-14 border-2 border-black rounded-2xl py-2 w-32 self-center"
      >
        {text}
      </div>
    </>
  );
};

export { PrimaryButton };
