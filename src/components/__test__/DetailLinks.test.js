import { render, screen } from '@testing-library/react';
import DetailLinks from '../DetailLinks';

describe('DetailLinks', () => {
  it('renders properly', () => {
    render(<DetailLinks homepage="123" />);
    screen.getByLabelText('공식 홈페이지');
    screen.getByText('편집하기');
  });
});
