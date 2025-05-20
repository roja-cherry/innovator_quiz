import React from "react";

export const Spinner = ({ size = "50px", thickness = "2px" }) => {
  return (
    <div
      className="spinner-border text-light"
      role="status"
      style={{ width: size, height: size, borderWidth: thickness }}
    >
      <span className="sr-only"></span>
    </div>
  );
};
