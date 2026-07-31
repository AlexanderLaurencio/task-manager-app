import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Filter from './taskFilter';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test("taskFilter should render", async () => {
    const user = userEvent.setup();

    const mockFunction = vi.fn();

    render(<MemoryRouter>
            <Filter updateTasks={mockFunction}/>
        </MemoryRouter>);
    screen.debug();

    const taskFilter = screen.getByTestId("taskFilter");

    expect(taskFilter).toBeInTheDocument();

    await user.selectOptions(screen.getByTestId("taskFilter"),"Pending");
    
    expect(mockFunction).toHaveBeenCalledOnce();
});