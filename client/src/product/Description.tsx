import React from "react";
import { marked } from "marked";

const Description: React.FC<{ description: string }> = ({ description }) => {
  const getParsedMark = () => {
    const parsedMark = marked.parse(description);
    return { __html: parsedMark };
  };

  return (
    <div
      dangerouslySetInnerHTML={getParsedMark()}
      style={{ fontFamily: "brutal-regular" }}
    />
  );
};

export default Description;
