import styled, { ThemeProps } from 'styled-components';
import { Variants } from './Button';
import FaIcon from './FaIcon';
import { Theme } from '../../utils/theme';

interface Props extends ThemeProps<Theme> {
  variant: Variants;
}

export default styled(FaIcon)<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2rem;
  min-height: 1.5rem;
  cursor: pointer;
  transition: 200ms;
  color: ${({ theme, variant }) => theme.button[variant]};
  font-size: 1.25rem;
  &:hover {
    font-size: 1.34rem;
  }
`;
