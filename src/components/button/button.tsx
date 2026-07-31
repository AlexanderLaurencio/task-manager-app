import type React from "react"

interface ButtonProps{
    onClick?: (e: React.MouseEvent) => void,
    onFocus?: (e: React.FocusEvent) => void,
    onBlur?: (e: React.FocusEvent) => void,
    className: string,
    dataTestId?: string,
    children: any
}

export default function Button({onClick, onFocus, onBlur, dataTestId, className, children}: ButtonProps) {
    return(
        <button onClick={onClick} onFocus={onFocus} onBlur={onBlur} className={className} data-testid={dataTestId}>
            {children}
        </button>
    )
};