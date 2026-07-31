import { render, screen } from '@testing-library/react';
import { test, expect, vi} from 'vitest';
import '@testing-library/jest-dom/vitest';
import { SearchBar } from './searchbar';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test("searchbar should render on screen", async () => {
    let user = userEvent.setup();
    const mockFunction = vi.fn();
    render(
        <MemoryRouter>
            <SearchBar updateTasks={mockFunction}/>
        </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByTestId("searchbar")).toBeInTheDocument();

    await user.type(screen.getByTestId("searchbar"),"a");

    expect(mockFunction).toHaveBeenCalledOnce();
});