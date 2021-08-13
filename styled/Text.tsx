import styled, { css } from 'styled-components';

interface TextStyledProps {
  color?:
  | 'black'
  | 'white'
  | 'gray'
  | 'gray-500'
  | 'gray-900'
  | 'primary'
  | 'brown'
  | 'label'
  | 'secondary'
  | 'secondary2'
  | 'red'
  | 'lebel2'
  | 'korma';
  fontSize?:
  | 'xxxl'
  | 'xxyl'
  | 'xxl'
  | 'xl'
  | 'lg'
  | 'base'
  | 'md'
  | 'sm'
  | 'xs'
  | 'xxs'
  | 'xxxs';
  fontFamily?: 'manrope' | 'montserrat';
  weight?: 'bold' | 'semibold' | 'normal' | 'midbold' | '400' | '500' | '600' | '700' | '800' | '900';
  inline?: boolean;
  block?: boolean;
  center?: boolean;
  justify?: boolean;
}

const Text = styled.p<TextStyledProps>`
  color: ${({ theme, color }) => theme.textColors[color || '#091E42']};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize || 'md']};
  font-family: ${({ theme, fontFamily }) =>
    theme.fontFamily[fontFamily || 'manrope']};
  font-weight: ${({ theme, weight }) => theme.fontWeight[weight || 'normal']};
  line-height: 1.5em;
  margin-bottom: 8px;

  ${(props) =>
    props.inline &&
    css`
      display: inline-block;
    `}
  ${(props) =>
    props.block &&
    css`
      display: block;
    `}
    ${(props) =>
    props.center &&
    css`
      text-align: center;
    `}
    ${(props) =>
    props.justify &&
    css`
      text-align: justify;
    `}
`;

export default Text;
