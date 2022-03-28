import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound', () => {
  it('renders properly', () => {
    render(
      <BrowserRouter>
        <NotFound label="label" text="text" />
      </BrowserRouter>
    );
    screen.getByText('죄송합니다. 해당 페이지를 찾을 수 없습니다.');
    screen.getByText('홈으로');
    screen.getByText('오류 코드: 404');
  });
});
