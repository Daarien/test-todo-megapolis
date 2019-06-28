import { Variants } from '../components/elements/Button';

export type Theme = {
  button: {
    [P in Variants]: string;
  };
};

export default {
  button: {
    green: 'green',
    red: 'red',
    blue: 'blue',
  },
} as Theme;
