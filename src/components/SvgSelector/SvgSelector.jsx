import React from "react";

import svgPaths from "../../helpers/svg-paths";

import {
  SvgSelectorContainer,
  SvgContainer,
  SvgPath,
} from "./SvgSelector.styles";

const SvgSelector = ({ handleSelectSVG }) => {
  return (
    <SvgSelectorContainer>
      {Object.values(svgPaths).map((svg) => {
        const { id, path, viewBox } = svg;
        return (
          <SvgContainer
            key={id}
            id={id}
            viewBox={viewBox}
            onClick={handleSelectSVG}
          >
            <SvgPath d={path} />
          </SvgContainer>
        );
      })}
    </SvgSelectorContainer>
  );
};

export default SvgSelector;
