import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import StatusSelector from './statusSelector';


test("status should render and execute a function when onChange triggers", () => {
    const defaultFunction = vi.fn();

    render(<StatusSelector onChange={defaultFunction}/>);
    screen.debug();
    
    expect(screen.getByTestId("statusSelector")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("statusSelector"));
    expect(defaultFunction).toHaveBeenCalledOnce()
});