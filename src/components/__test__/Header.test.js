import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header', () => {
  it('renders properly', () => {
    const scrollToTop = jest.fn();
    render(
      <BrowserRouter>
        <Header scrollToTop={scrollToTop} />
      </BrowserRouter>
    );
    const home = screen.getByLabelText('홈');
    const series = screen.getByLabelText('시리즈');
    const movie = screen.getByLabelText('영화');
    screen.getByLabelText('깃허브 저장소');

    fireEvent.click(home);
    expect(scrollToTop).toHaveBeenCalledTimes(1);
    fireEvent.click(series);
    expect(scrollToTop).toHaveBeenCalledTimes(2);
    fireEvent.click(movie);
    expect(scrollToTop).toHaveBeenCalledTimes(3);
  });
});
