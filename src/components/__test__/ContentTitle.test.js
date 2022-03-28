import { render, screen } from '@testing-library/react';
import ContentTitle from '../ContentTitle';

describe('ContentTitle', () => {
  it('renders properly', () => {
    const name = '123';
    render(<ContentTitle name={name} />);
    screen.getByText(name);
  });
});
