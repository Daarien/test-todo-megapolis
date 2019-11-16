import React from 'react';
import {
  FontAwesomeIcon,
  Props as FaProps,
} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

library.add(faEdit, faTrashAlt);

interface Props extends FaProps {
  onClick?: () => void;
}

export default function FaIcon({ icon, size, ...other }: Props) {
  return (
    <span {...other}>
      <FontAwesomeIcon icon={icon} size={size} />
    </span>
  );
}
