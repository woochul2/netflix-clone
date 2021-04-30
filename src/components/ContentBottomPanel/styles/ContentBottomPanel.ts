import styled from 'styled-components/macro';
import { borderRadius, boxShadow, cssTransitionDuration, roundButton } from '../../Content/styles/Content';

export const Container = styled.div<{
  isMouseOn: boolean;
  transLength: {
    x: string;
    y: string;
  } | null;
}>`
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ transLength }) => !transLength && 'center'};
  width: 100%;
  border-bottom-left-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  box-shadow: ${boxShadow};
  padding-bottom: ${({ transLength }) => transLength && '0.5em'};
  background-color: var(--gray-900);
  opacity: ${({ isMouseOn }) => (isMouseOn ? 1 : 0)};
  opacity: ${({ transLength }) => transLength && 1};
  transition: all ${cssTransitionDuration};
`;

export const PanelButton = styled(roundButton)`
  width: 1.25em;
  height: 1.25em;
  border: 0.09em solid var(--gray-400);
  margin: 0.3em;

  &:hover {
    border-color: var(--gray-100);
    background-color: var(--gray-700);
  }

  svg {
    padding: 0.25em;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 0.35em;
  margin: 1em 1.275em 0.7em;
`;

export const PageLink = styled.a`
  text-decoration: none;
  margin-right: 1em;
  color: var(--white);

  &:hover {
    text-decoration: underline;
  }
`;

export const Overview = styled.p`
  white-space: pre-line;
  font-size: 0.3em;
  margin: 0 1.5em 1em;
`;

export const Text = styled.p`
  font-size: 0.275em;
  margin: 0 1.625em 0.4em;
`;

export const GrayText = styled.span`
  color: var(--gray-400);
`;
