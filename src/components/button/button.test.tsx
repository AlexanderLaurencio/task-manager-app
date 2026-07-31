import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Button from './button';

test("button should render in the screen and also should execute a given function when onClick triggers", async () => {
    const defaultFunction = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={defaultFunction} className="exampleClassname" dataTestId="exampleDataTestId">
        Button
    </Button>);
    screen.debug();
    expect(screen.getByTestId("exampleDataTestId")).toBeInTheDocument();

    await user.click(screen.getByTestId("exampleDataTestId"));
    expect(defaultFunction).toHaveBeenCalledOnce()
});