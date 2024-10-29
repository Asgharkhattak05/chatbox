import React from "react";
import type { SVGProps } from "react";

const createSvg = (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.8em"
        height="0.8em"
        viewBox="0 0 24 24"
        {...props}
    >
        <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            color="currentColor"
        >
            <path d="M18.5 16c.506.491 2.5 1.8 2.5 2.5M18.5 21c.506-.491 2.5-1.8 2.5-2.5m0 0h-8M11 22h-.273c-3.26 0-4.892 0-6.024-.798a4.1 4.1 0 0 1-.855-.805C3 19.331 3 17.797 3 14.727v-2.545c0-2.963 0-4.445.469-5.628c.754-1.903 2.348-3.403 4.37-4.113C9.095 2 10.668 2 13.818 2c1.798 0 2.698 0 3.416.252c1.155.406 2.066 1.263 2.497 2.35C20 5.278 20 6.125 20 7.818V13"></path>
            <path d="M3 12a3.333 3.333 0 0 1 3.333-3.333c.666 0 1.451.116 2.098-.057A1.67 1.67 0 0 0 9.61 7.43c.173-.647.057-1.432.057-2.098A3.333 3.333 0 0 1 13 2"></path>
        </g>
    </svg>
);

const ExportImage = (props: SVGProps<SVGSVGElement>) => {
    return createSvg(props);
};

export default ExportImage;