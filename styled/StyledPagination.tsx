import styled from "styled-components";
import { Pagination } from "react-bootstrap";
const StyledPagination = styled(Pagination)`
  .page-item {
    margin: 0 5px;
    .page-link {
      background: #ffffff;
      border-radius: 4px;
      font-weight: 500;
      color: #212b36;
      border: 2px solid #dfe3e8;
      height: 38px;
      width: 38px;
      text-align: center;
    }
    &.disabled{
      .page-link{
        background: #919EAB;
        color: #C4CDD5;
      } 
    }
  }
  .page-item.active .page-link {
    border: 2px solid #396ae8;
    color: #4200ff;
  }
`;

export default StyledPagination;
