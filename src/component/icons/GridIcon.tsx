import { IconSvgProps } from "./IconSvgProps";

export const GridIcon = ({ ...otherProps }: IconSvgProps) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="20px"
        role="presentation"
        viewBox="0 0 16 16"
        width="20px"
        {...otherProps}
    >
        <path
            d="M7 1H1V7H7V1ZM7 9H1V15H7V9ZM9 1H15V7H9V1ZM15 9H9V15H15V9Z"
            fill="currentColor"
        />
    </svg>
)