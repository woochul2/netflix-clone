import { render, screen } from '@testing-library/react';
import Row from '../Row';

describe('Row', () => {
  it('renders properly', () => {
    const genre = { id: 18, name: '드라마' };
    render(<Row genre={genre} />);
    screen.getByText(genre.name);
  });
});
