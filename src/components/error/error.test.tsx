import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import '@testing-library/jest-dom/vitest';
import { Error } from "./error";

test("Error should render the props passed", () => {
    render(<Error message="Internal Server Error" statusCode={500}/>);
    screen.debug();

    expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
    expect(screen.getByText(500)).toBeInTheDocument();
});