import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { mockStatsProps } from '../../constants/constants';
import Stats from './stats';


test("stats should render", () => {
    render(<Stats stats={mockStatsProps} StatsDataTestId="statsTest"/>);
    screen.debug();
    expect(screen.getByTestId("statsTest")).toBeInTheDocument()
});