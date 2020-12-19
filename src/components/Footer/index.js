import React from 'react';
import { Container, Title, LinkContainer, Link, Text } from './Footer';

export default function Footer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Footer.Title = function FooterTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Footer.LinkContainer = function FooterLinkContainer({
  children,
  ...restProps
}) {
  return <LinkContainer {...restProps}>{children}</LinkContainer>;
};

Footer.Link = function FooterLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Footer.Text = function FooterText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
