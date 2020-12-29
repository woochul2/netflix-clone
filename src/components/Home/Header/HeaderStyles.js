import styled from 'styled-components';
import { BasicButtonLink, BasicLogoLinkContainer } from '../../common-styles';
import * as BREAKPOINTS from '../../../constants/breakpoints';
import { divider } from '../HomeStyles';

export const Container = styled.header`
  min-width: 21.875rem;
  border-bottom: ${divider};
  padding: 0 3% 10rem;
  text-align: center;
  background: linear-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.55)),
    url(${({ backgroundImage }) => backgroundImage}) no-repeat;
  background-size: cover;
  background-position-y: 40%;

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0 5% 5.625rem;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding-top: 1.25rem;
`;

export const LogoLinkContainer = styled(BasicLogoLinkContainer)`
  @media (max-width: ${BREAKPOINTS.XL}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.LG}) {
    font-size: 2rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.6rem;
  }
`;

export const ButtonLink = styled(BasicButtonLink)`
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;

  @media (max-width: ${BREAKPOINTS.SM}) {
    padding: 0.375rem;
  }
`;

export const Title = styled.h1`
  max-width: 50rem;
  margin: 9.375rem auto 0;
  font-size: 4rem;

  @media (max-width: ${BREAKPOINTS.XL}) {
    max-width: 40rem;
    font-size: 3.125rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    margin-top: 6.25rem;
    font-size: 1.75rem;
  }
`;

export const SubTitle = styled.h2`
  max-width: 50rem;
  font-size: 1.625rem;
  font-weight: normal;
  margin: 1rem auto 0;

  @media (max-width: ${BREAKPOINTS.XL}) {
    max-width: 40rem;
  }

  @media (max-width: ${BREAKPOINTS.SM}) {
    font-size: 1.125rem;
  }
`;
