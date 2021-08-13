import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

interface FormInputProps {
  label?: string;
  name?: string;
  innerRef?: any;
  placeholder?: string;
  className?: string;
  error?: string;
  errorMessage?: string;
  type?: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  name,
  innerRef,
  placeholder,
  className,
  error,
  errorMessage,
  type = 'text',
}) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {/* Add class "is-invalid" to the input field if its invalid */}
      <Form.Control
        type={type}
        name={name}
        ref={innerRef}
        placeholder={placeholder}
        className={className}
      />
      {error && <span className="invalid-feedback">{errorMessage}</span>}
    </Form.Group>
  );
};

export default FormInput;
