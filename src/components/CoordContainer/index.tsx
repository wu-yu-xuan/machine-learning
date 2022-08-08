import { PropsWithChildren } from "react";

export default function CoordContainer({ children }: PropsWithChildren) {
  return (
    <svg viewBox="-2 -2 1005 1005" width="1000" height="1000">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <polyline
        points="1000,0 0,0 0,1000"
        fill="none"
        stroke="black"
        markerStart="url(#arrow)"
        markerEnd="url(#arrow)"
      />
      {children}
    </svg>
  );
}
