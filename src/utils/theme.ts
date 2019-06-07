import { Variants } from '../components/elements/Button';

export type Theme = {
  button: {
    [P in Variants]: string;
  };
};

export default {
  button: {
    create: 'green',
    remove: 'red',
    return: 'blue',
  },
} as Theme;
