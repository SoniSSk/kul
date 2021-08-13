import { FC, InputHTMLAttributes, forwardRef, Ref } from "react";
import Select from "react-select";

const customStyles = {
    valueContainer: (provided: any) => {
        return { ...provided, width: '42px' };
    },
    indicatorSeparator: (provided: any) => {
        return { display: 'none' };
    },
    dropdownIndicator: (provided: any) => {
        return { ...provided, padding: '3px' };
    },
};

const ReactSelect = forwardRef<HTMLInputElement, any>((props, ref: Ref<HTMLInputElement>) => {
  return <Select {...props} styles={customStyles} ref={ref} />;
});

export default ReactSelect;
