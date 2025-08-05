"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const mouseDownTarget = useRef<EventTarget | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!mounted || typeof window === "undefined") return null;

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		mouseDownTarget.current = e.target;
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (
			mouseDownTarget.current === overlayRef.current &&
			e.target === overlayRef.current
		) {
			onClose();
		}
	};

	const modalContent = (
		<div
			ref={overlayRef}
			onMouseDown={handleMouseDown}
			onClick={handleClick}
			className={`fixed inset-0 z-30 bg-black/25 backdrop-blur-[2px] flex justify-center overflow-y-auto transition-all duration-300 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}
		>
			<div
				className="relative w-full max-w-md my-auto box-border mx-2"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="my-2">
					<div className="relative w-full bg-white rounded-sm shadow-lg p-4 transition-all duration-300">

						<div
							className="absolute top-4 right-4 bg-red-500 p-3 rounded-full shadow-sm cursor-pointer"
							onClick={onClose}
						>
							<div className="absolute top-1/2 left-1/2 w-3.5 h-[2px] bg-white rounded transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
							<div className="absolute top-1/2 left-1/2 w-3.5 h-[2px] bg-white rounded transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
						</div>

						{children}

					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(modalContent, document.body);
};

export default Modal;
