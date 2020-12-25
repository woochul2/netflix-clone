import React from 'react';
import * as ROUTES from '../../constants/routes';

export default function LogoLink({ Container }) {
  return <Container to={ROUTES.HOME}>Netflix</Container>;
}
