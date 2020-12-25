import styled from 'styled-components';
import { BasicButtonLink, BasicLogoLinkContainer } from '../../common-styles';
import * as BREAKPOINTS from '../../../constants/breakpoints';

export const Container = styled.header`
  min-width: 350px;
  border-bottom: 8px solid hsl(0, 0%, 13%);
  padding: 0 45px 140px;
  text-align: center;
  background: linear-gradient(hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.55)),
    url(${({ backgroundImage }) => backgroundImage}) no-repeat;
  background-size: cover;
  background-position: 50% 40%;

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    padding: 0 0 70px 0;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 10px;
`;

export const LogoLinkContainer = styled(BasicLogoLinkContainer)`
  @media (max-width: ${BREAKPOINTS.XLARGE}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.LARGE}) {
    font-size: 2rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.6rem;
  }
`;

export const ButtonLink = styled(BasicButtonLink)`
  border-radius: 4px;
  padding: 10px 17px;

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    padding: 6px;
  }
`;

export const Title = styled.h1`
  max-width: 800px;
  margin: 150px auto 0;
  padding: 0 5%;
  font-size: 4rem;

  @media (max-width: ${BREAKPOINTS.XLARGE}) {
    max-width: 640px;
    font-size: 3.125rem;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.75rem;
  }
`;

export const SubTitle = styled.h2`
  max-width: 800px;
  font-size: 1.625rem;
  font-weight: normal;
  margin: 1rem auto 0;
  padding: 0 5%;

  @media (max-width: ${BREAKPOINTS.XLARGE}) {
    max-width: 640px;
  }

  @media (max-width: ${BREAKPOINTS.SMALL}) {
    font-size: 1.125rem;
  }
`;
