import styled from "styled-components";

export const BreadcrumbWrapper = styled.nav`
  & > .breadcrumb {
    background-color: transparent;
    padding: 0.25rem 0;
    p {
      margin-bottom: 0;
    }
  }

  & .breadcrumb-item + .breadcrumb-item::before {
    /* content: '>'; */
    /* color: ${({ theme, color }) => theme.textColors["black"]}; */
    content: "";
    background: url(/icons/arrow_forward.svg) no-repeat center center;
    width: 8px;
    height: 13px;
    display: inline-block;
    margin-right: .5rem;
  }
  .breadcrumb-item {
    display: flex;
    align-items: center;
  }
`;
