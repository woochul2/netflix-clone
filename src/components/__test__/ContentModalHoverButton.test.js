import { fireEvent, render, screen } from '@testing-library/react';
import ContentModalHoverButton from '../ContentModalHoverButton';

describe('ContentModalHoverButton', () => {
  it('renders properly', () => {
    const open = jest.fn();
    render(<ContentModalHoverButton open={open} />);
    const detailButton = screen.getByLabelText('상세 정보 보기');
    fireEvent.click(detailButton);
    expect(open).toHaveBeenCalled();
  });
});
