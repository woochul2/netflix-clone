import { render, screen } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification', () => {
  it('renders properly', () => {
    render(<Notification />);
    screen.getByText(/모든 데이터베이스는/);
    screen.getAllByAltText('The Movie DB 로고');
    screen.getByText(/에서 받아왔습니다./);
  });
});
