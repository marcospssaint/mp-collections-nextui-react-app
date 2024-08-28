import { IconSvgProps } from "./IconSvgProps"

export const PlusIcon = ({ ...otherProps }: IconSvgProps) => (
    <svg aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...otherProps}
    >
        <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
    </svg>
)