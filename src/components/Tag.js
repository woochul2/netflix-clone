import styled from 'styled-components';
import { BREAKPOINTS } from '../constants';

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.text
 * @returns
 */
function Tag({ label, text }) {
  return (
    <TagBlock>
      <Label>{label}: </Label>
      {text}
    </TagBlock>
  );
}

const TagBlock = styled.p`
  font-size: 1rem;
  margin-bottom: 0.25rem;

  @media (max-width: ${BREAKPOINTS.lg}) {
    font-size: 0.875rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.75rem;
  }
`;

const Label = styled.span`
  color: hsl(0, 0%, 50%);
`;

export default Tag;
