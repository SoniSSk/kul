import styled from 'styled-components';

export const BlogSearchWrapper = styled.section`
  padding: 70px 0;
  background-color: ${({ theme }) => theme.backgroundColors['secondary']};
`;

export const SearchInput = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  padding: 12px 12px 12px 60px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 8px;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  background-image: url(/icons/blog-search.svg);
  background-size: 22px;
  background-repeat: no-repeat;
  background-position: left 15px center;

  &:focus-visible {
    outline: none;
  }
`;
