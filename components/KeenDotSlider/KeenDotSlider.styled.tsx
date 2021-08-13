import styled, { css } from 'styled-components';

interface ArrowButtonStyledProps {
  leftArrow?: boolean;
  rightArrow?: boolean;
  isDisabled?: boolean;
}

export const KeenChild = styled.div`
  background: url('/images/joinOurNetwork1.png');
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
export const KeenChild2 = styled.div`
  background: url('/images/joinournetwork2.png');
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
export const KeenChild3 = styled.div`
  background: url('/images/joinournetwork3.png');
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
export const KeenChild4 = styled.div`
  background: url('/images/joinournetwork4.png');
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const NavigationWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const Dots = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: center;
`;

export const Dot = styled.div`
   {
    border: none;
    width: 10px;
    height: 10px;
    background: #c5c5c5;
    border-radius: 50%;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
    &.active {
      background: #000;
    }
    &:focus {
      outline: none;
    }
  }
`;

export const Arrow = styled.div<ArrowButtonStyledProps>`
  width: 38px;
  height: 38px;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  cursor: pointer;
  background: white;
  fill: rgba(0, 0, 0, 0.54);
  box-shadow: 0px 3px 12px rgba(31, 92, 163, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.leftArrow &&
    css`
      left: 5px;
    `}

  ${(props) =>
    props.rightArrow &&
    css`
      left: auto;
      right: 5px;
    `}

        ${(props) =>
    props.isDisabled &&
    css`
      fill: rgba(255, 255, 255, 0.5);
    `}
`;

export const ArrowButton = styled.button<ArrowButtonStyledProps>`
  width: 38px;
  height: 38px;
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  cursor: pointer;
  background: white;
  box-shadow: 0px 3px 12px rgba(31, 92, 163, 0.2);

  ${(props) =>
    props.leftArrow &&
    css`
      left: 5px;
    `}

  ${(props) =>
    props.rightArrow &&
    css`
      left: auto;
      right: 5px;
    `}

    ${(props) =>
    props.isDisabled &&
    css`
      fill: rgba(255, 255, 255, 0.5);
    `}
`;
