import { ButtonHTMLAttributes } from 'react';
import styled, { ThemeProps } from 'styled-components';
import { Theme } from '../../utils/theme';

export interface iButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export type Variants = 'green' | 'blue' | 'red';

interface ButtonProps extends iButton, ThemeProps<Theme> {
  variant: Variants;
}

export default styled.button<ButtonProps>`
  cursor: pointer;
  outline: none;
  &:focus {
    outline: none;
  }
  padding: 2px 10px;
  border: 1px solid;
  border-color: ${({ theme, variant }) => theme.button[variant]};
  border-radius: 3px;
  transition: 200ms;

  background-color: #fff;
  &:hover {
    color: #fff;
    background-color: ${({ theme, variant }) => theme.button[variant]};
  }
`;
