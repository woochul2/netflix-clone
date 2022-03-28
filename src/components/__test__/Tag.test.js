import { render, screen } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag', () => {
  it('renders properly', () => {
    render(<Tag label="label" text="text" />);
    screen.getByText('label:');
    screen.getByText('text');
  });
});
