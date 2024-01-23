import { render, screen } from "@testing-library/react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


describe("login component", () => {
    it("should show error message when all the fields are not entered", async () => {
        render(<Register />);
        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement);
        screen.debug();
    });
});