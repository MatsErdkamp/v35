import React from "react";
import PropTypes from "prop-types";

/** Primary UI component for user interaction */
export const Text = ({ fontSize }) => {
  return <div style={{ fontSize: fontSize, color: "black" }}>Lorem ipsum</div>;
};

Text.propTypes = {
  fontSize: PropTypes.string,
};
