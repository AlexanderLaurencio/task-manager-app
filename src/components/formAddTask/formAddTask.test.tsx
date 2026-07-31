import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import { errorMessage } from './formAddTask';
import { MemoryRouter } from 'react-router-dom';

test("formAddTask must appear in the screen behave correctly when the user inserts incorrect data in the inputs", async () => {
    const user = userEvent.setup();
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    screen.debug();

    //By default modalFormAddTask shouldn't be in the document
    expect(screen.queryByTestId("modalFormAddTask")).not.toBeInTheDocument()  

    //When the user clicks buttonAddTask, modalFormAddTask appears in the document
    await user.click(screen.getByTestId("buttonAddTask"));
    const inputDueDate = await screen.findByTestId("inputDueDateForm");

    expect(await screen.findByTestId("modalFormAddTask")).toBeInTheDocument()

    //If the user sends the form a span with an error message will appear in the form
    const buttonSendFormAddTask = await screen.findByTestId("buttonSendFormAddTask");
    
    await user.click(buttonSendFormAddTask);
    expect(await screen.findByText(errorMessage.fieldEmpty)).toBeInTheDocument()

    //If the user tries to send the form again the same error message will appear because
    //the dueDate input hasn't been filled out
    await user.type(screen.getByTestId("inputTaskTitle"),"Example title");
    await user.click(buttonSendFormAddTask);
    expect(await screen.findByText(errorMessage.fieldEmpty)).toBeInTheDocument()

    //If the user inserts a date before today an error message will appear
    await user.type(inputDueDate, "2026-07-20");
    await user.click(buttonSendFormAddTask);
    expect(await screen.findByText(errorMessage.dateIncorrect)).toBeInTheDocument()

    //The user inserts a correct date and the error doesn't appear again
    await user.clear(inputDueDate)
    await user.type(inputDueDate, "2026-07-28")
    expect(screen.queryByText(errorMessage.dateIncorrect)).not.toBeInTheDocument()
    // await userEvent.click(buttonSendFormAddTask);
    // expect(screen.queryByTestId("modalFormAddTask")).not.toBeInTheDocument()
});

test("formAddTask must appear in the document and close when the user clicks its button close", async () => {
    const user = userEvent.setup();
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    screen.debug();

    //By default modalFormAddTask shouldn't be in the document
    expect(screen.queryByTestId("modalFormAddTask")).not.toBeInTheDocument();    

    //When the user clicks on buttonAddTask, modalFormAddTask appear in the document
    await user.click(screen.getByTestId("buttonAddTask"));
    expect(await screen.findByTestId("modalFormAddTask")).toBeInTheDocument();
    
    //When the user clicks buttoCloseFormAddTask, it dissapears
    await userEvent.click(screen.getByTestId("buttonCloseFormAddTask"));
    expect(await screen.queryByTestId("modalFormAddTask")).not.toBeInTheDocument()
});
