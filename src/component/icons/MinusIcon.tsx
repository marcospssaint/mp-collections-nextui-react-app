import { IconSvgProps } from "./IconSvgProps"

export const MinusIcon = ({ ...otherProps }: IconSvgProps) => (
    <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}>
        <path
            d="M6 12L18 12"
            stroke="#000000"
            strokeWidth="2"
            fill="currentColor"/>
    </svg>

)