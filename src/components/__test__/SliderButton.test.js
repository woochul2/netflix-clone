import { fireEvent, render, screen } from '@testing-library/react';
import SliderButton from '../SliderButton';

describe('SliderButton', () => {
  const setUp = ({ variant }) => {
    const onClick = jest.fn();
    render(<SliderButton variant={variant} onClick={onClick} />);
    return onClick;
  };

  it('renders properly when variant is prev', () => {
    const onClick = setUp({ variant: 'prev' });
    const prevButton = screen.getByLabelText('이전 콘텐츠 보기');
    fireEvent.click(prevButton);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders properly when variant is next', () => {
    const onClick = setUp({ variant: 'next' });
    const nextButton = screen.getByLabelText('콘텐츠 더 보기');
    fireEvent.click(nextButton);
    expect(onClick).toHaveBeenCalled();
  });
});
