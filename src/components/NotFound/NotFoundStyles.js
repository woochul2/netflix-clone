import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logoStyles } from '../common-styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 31.25rem;
  min-height: 100vh;
  background-image: linear-gradient(hsla(0, 0%, 0%, 0.1), hsla(0, 0%, 0%, 0.1)),
    url('https://images.unsplash.com/photo-1519985397845-b6f5188870af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--white);
`;

export const Header = styled.header`
  width: 100%;
  background-color: var(--black);
  padding: 0.875rem 2rem;
`;

export const LogoLink = styled(Link)`
  ${logoStyles}

  font-size: 2rem;
`;

export const Title = styled.h1`
  margin-top: 15rem;
  font-size: 4rem;
`;

export const SubTitle = styled.h2`
  font-weight: normal;
`;

export const ButtonLink = styled(Link)`
  border: 0;
  margin: 1.25rem;
  padding: 0.875rem 2rem;
  border-radius: 0.25rem;
  background-color: var(--white);
  color: var(--black);
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }
`;

export const Code = styled.h2`
  font-size: 2.5rem;
  margin-top: 1rem;
`;
