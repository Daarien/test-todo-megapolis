import styled, { ThemeProps } from 'styled-components';
import { Variants } from './Button';
import FaIcon from './FaIcon';
import { Theme } from '../../utils/theme';

interface Props extends ThemeProps<Theme> {
  variant: Variants;
}

export default styled(FaIcon)<Props>`
  margin: 0 10px;
  /* padding: 3px; */
  cursor: pointer;
  /* border: 1px solid; */
  /* border-color: ${({ theme, variant }) => theme.button[variant]}; */
  /* border-radius: 3px; */
  /* transition: 200ms; */
  color: ${({ theme, variant }) => theme.button[variant]};
  /* background-color: #fff;
  &:hover {
    color: #fff;
    background-color: ${({ theme, variant }) => theme.button[variant]};
  } */
`;
