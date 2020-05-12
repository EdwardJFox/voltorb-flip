import React from 'react';

import './Button.scss';

interface ButtonInterface {
  children: any;
  type?: string;
  className?: string;
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ children, type, className, handleOnClick }: ButtonInterface) =>
  <button className={`btn btn-${type} ${className}`} onClick={handleOnClick}>{ children }</button>

export default Button;