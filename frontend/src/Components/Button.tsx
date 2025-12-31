import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}

export function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button className={className} {...props}>
            {children}  
        </button>
    )
}