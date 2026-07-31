import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import PrioritySelector from './prioritySelector';

test("prioritySelector must appear in the screen and execute a function when onChange triggers", () => {
    const defaultFunction = vi.fn();
    render(<PrioritySelector onChange={defaultFunction}/>);
    screen.debug();
    expect(screen.getByTestId("prioritySelector")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("prioritySelector"));
    expect(defaultFunction).toHaveBeenCalledOnce()
});