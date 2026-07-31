import { render, screen } from '@testing-library/react';
import { test, expect, vi, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Header from './header';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { mockStatsProps } from '../../constants/constants';


describe("header must render in the screen, and its components should behave as expected", () => {
    const user = userEvent.setup();
    const mockFunction = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        render(<MemoryRouter>
            <Header updateTasks={mockFunction} onAddTask={mockFunction} 
            stats={mockStatsProps} StatsDataTestId="floatingStatsMenu"/>
        </MemoryRouter>);
    });
    
    screen.debug();

    test("header must appear in the document", () => {
        expect(screen.getByTestId("header")).toBeInTheDocument();
    });
    
    test("buttonOpenStats should show and hide floatingStatsMenu", async () => {
        const buttonOpenStats = screen.getByTestId("buttonOpenStats");

        //When the user clicks buttonOpenStats, floatingStatsMenu must be in the document,
        //appear in the screen and the buttonOpenStats must be focused.
        await user.click(buttonOpenStats);
        expect(buttonOpenStats).toHaveFocus();
        expect(await screen.findByTestId("floatingStatsMenu")).toBeInTheDocument()

        //When the user clicks other component or part of the website, floatingStatsMenu mustn't be 
        //in the document, appear in the screen and the buttonOpenStats must be unfocused.
        await user.click(document.body);
        expect(buttonOpenStats).not.toHaveFocus();
        expect(screen.queryByTestId("floatingStatsMenu")).not.toBeInTheDocument()
    });

        //the button to open the statsFloating menu isn't being tested here because
        //it was tested in the formAddTask.test.tsx file
});