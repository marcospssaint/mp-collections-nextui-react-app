import { IconSvgProps } from "./IconSvgProps"

export const MinusIcon = ({ ...otherProps }: IconSvgProps) => (
    <svg aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...otherProps}
    >
        <path d="M0 12v1h23v-1h-23z" fill="currentColor" />
    </svg>
)