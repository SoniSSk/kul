import { FC, InputHTMLAttributes, ReactNode, forwardRef, Ref } from "react";
import { RadioBoxWrapper } from "./RadioBox.styled";

interface RadioBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: ReactNode;
}

const RadioBox = forwardRef<HTMLInputElement, RadioBoxProps>(
  ({ name, children, value, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <RadioBoxWrapper className="custom-control custom-radio">
        <input
          type="radio"
          className="custom-control-input"
          name={name}
          id={`radio-${name}-${value}`}
          value={value}
          {...props}
          ref={ref}
        />
        <label
          className="custom-control-label"
          htmlFor={`radio-${name}-${value}`}
        >
          {children}
        </label>
      </RadioBoxWrapper>
    );
  }
);

export default RadioBox;
