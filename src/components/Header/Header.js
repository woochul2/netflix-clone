import styled from 'styled-components';

export const Container = styled.header`
  border-bottom: 8px solid hsl(0, 0%, 13%);
  padding: 0 45px 140px;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.55)),
    url(${({ backgroundImage }) => backgroundImage}) no-repeat;
  background-size: cover;
  background-position: 50% 40%;

  @media (max-width: 549px) {
    padding: 0 0 70px 0;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 350px;
  padding-top: 10px;
`;

export const Logo = styled.h1`
  color: hsl(358, 90%, 47%);
  text-transform: uppercase;
  font-size: 3rem;
  margin: 0;

  @media (max-width: 1449px) {
    font-size: 2.5rem;
  }

  @media (max-width: 949px) {
    font-size: 2rem;
  }

  @media (max-width: 549px) {
    font-size: 1.6rem;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 4px;
  padding: 0;

  span {
    display: block;
    color: hsl(0, 0%, 100%);
    background-color: hsl(358, 90%, 47%);
    border-radius: 4px;
    padding: 10px 17px;

    @media (max-width: 549px) {
      padding: 6px;
    }
  }

  &:focus,
  span {
    outline: none;
  }

  &:focus > span {
    box-shadow: 0 0 0 1px hsl(0, 0%, 100%);
  }
`;

export const Title = styled.h1`
  min-width: 320px;
  max-width: 800px;
  font-size: 4rem;
  margin: 150px auto 0;
  padding: 0 5%;

  @media (max-width: 1449px) {
    max-width: 640px;
    font-size: 3.125rem;
  }

  @media (max-width: 549px) {
    font-size: 1.75rem;
  }
`;

export const SubTitle = styled.h2`
  min-width: 320px;
  max-width: 800px;
  font-size: 1.625rem;
  font-weight: normal;
  margin: 1rem auto 0;
  padding: 0 5%;

  @media (max-width: 1449px) {
    max-width: 640px;
  }

  @media (max-width: 549px) {
    font-size: 1.125rem;
  }
`;
