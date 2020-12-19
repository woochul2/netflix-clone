import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  padding: 70px 65px;
  margin: 0 auto;
  color: hsl(0, 0%, 45%);
`;

export const Title = styled.p`
  margin-bottom: 30px;
`;

export const LinkContainer = styled.ul`
  padding: 0;
  margin-bottom: 24px;
`;

export const Link = styled.li`
  display: inline-block;
  font-size: 13px;
  margin-bottom: 14px;
  width: 25%;
  min-width: 100px;

  @media (max-width: 740px) {
    width: 33%;
  }

  @media (max-width: 500px) {
    width: 50%;
  }
`;

export const Text = styled.p`
  font-size: 13px;
`;
