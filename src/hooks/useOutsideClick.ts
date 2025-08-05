
import { useEffect, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
	ref: RefObject<T | null>,
	onOutsideClick: () => void
) {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		}

		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, [ref, onOutsideClick]);
}