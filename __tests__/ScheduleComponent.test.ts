import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { toBeInTheDocument } from '@testing-library/jest-dom';

import ScheduleComponent from '@/app/components/ScheduleComponent';
expect.extend({ toBeInTheDocument });

describe('ScheduleComponent', () => {
  test('renders afternoon session', () => {
    render(<ScheduleComponent />);
    const afternoonSession = screen.getByText('Afternoon Session');
    expect(afternoonSession).toBeInTheDocument();
  });

  test('renders evening session', () => {
    render(<ScheduleComponent />);
    const eveningSession = screen.getByText('Evening Session');
    expect(eveningSession).toBeInTheDocument();
  });

  test('renders pending session', () => {
    render(<ScheduleComponent />);
    const pendingSession = screen.getByText('Pending Session');
    expect(pendingSession).toBeInTheDocument();
  });

});
