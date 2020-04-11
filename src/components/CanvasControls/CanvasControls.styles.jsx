import styled, { css } from "styled-components";

export const CanvasControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const CustomButton = styled.button`
  width: auto;
  height: min-content;
  letter-spacing: 0.5px;
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  margin: 0.1rem;
  ${({ selected }) =>
    selected &&
    css`
      background-color: green;
    `}
`;
