import React from 'react';
import { Container, Top, Logo, Button, Title, SubTitle } from './Header';

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Header.Top = function HeaderTop({ children, ...restProps }) {
  return <Top {...restProps}>{children}</Top>;
};

Header.Logo = function HeaderLogo({ children, ...restProps }) {
  return <Logo {...restProps}>{children}</Logo>;
};

Header.Button = function HeaderButton({ children, ...restProps }) {
  return (
    <Button {...restProps}>
      <span tabIndex="-1">{children}</span>
    </Button>
  );
};

Header.Title = function HeaderTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Header.SubTitle = function HeaderSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};
