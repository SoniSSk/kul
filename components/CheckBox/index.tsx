import { ChangeEventHandler, FC, InputHTMLAttributes, ReactNode } from 'react';

import { CheckBoxWrapper } from './CheckBox.styled';
import { Form } from 'react-bootstrap';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: ReactNode;
  checkChanged?: any;
  docId?: number;
  checked?: boolean;
  readOnly?: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({
  docId,
  name,
  children,
  checkChanged,
  checked,
  readOnly,
}) => {
  if (checked && readOnly) {
    return (
      <Form.Check
        name={name}
        id={`checkbox-${name}`}
        checked={true}
        label={children}
        readOnly={true}
      />
    );
  }

  if (docId !== undefined && checkChanged !== undefined) {
    return (
      <Form.Check
        name={name}
        id={`checkbox-${name}`}
        onChange={(event) => {
          // checkChanged(event.target.value);
          console.log(event.target.checked);
          checkChanged(docId, event.target.checked);
        }}
        label={children}
      />
    );
  }

  if(checkChanged !== undefined){
    return <Form.Check name={name} id={`checkbox-${name}`} label={children} onChange={checkChanged} />
  }

  return <Form.Check name={name} id={`checkbox-${name}`} label={children} />;
};

export default CheckBox;
