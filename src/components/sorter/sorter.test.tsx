import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Sorter from './sorter';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


test("sorter should render and execute a function when onChange triggers", async () => {
    const user  = userEvent.setup();

    const mockFunction = vi.fn();
    render(<MemoryRouter>
            <Sorter updateTasks={mockFunction}/>
           </MemoryRouter>);
    expect(screen.getByTestId("sorter")).toBeInTheDocument();

    await user.selectOptions(screen.getByTestId("sorter"),"z-a");

    expect(mockFunction).toHaveBeenCalledOnce();
});