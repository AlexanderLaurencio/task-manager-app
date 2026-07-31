import Button from "../button/button"
import "./error.modules.css"

export interface ErrorProps {
    isError?: boolean,
    message: string | undefined,
    statusCode: number,
};


export function Error({message, statusCode}: ErrorProps) {
    return (
        <div className="error" data-testid="errorComponent">
            <span className="errorCode">{statusCode}</span>
            <span className="errorMessage">{message}</span>
            <Button className="errorButton" onClick={() => window.location.reload()}>Reload</Button>
        </div>
    )
};