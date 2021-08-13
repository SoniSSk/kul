import styled from "styled-components";
export const PillTabNav = styled.div`
  display: flex;
  border-bottom: 1px solid #a6a6a6;
  overflow-x: auto;
  width: 100%;
  padding: 10px 15px 0;
  & > div {
    margin-right: 15px;
    position: relative;
    padding-bottom: 10px;
  }
  div.active {
    &::after {
      content: "";
      display: block;
      width: 80%;
      height: 5px;
      background-color: #006bc3;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 10px 10px 0 0;
    }
  }
  p {
    white-space: nowrap;
    font-weight: 600;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
