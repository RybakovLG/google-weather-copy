import React from 'react';
import {createPortal} from "react-dom";

const PortalModal = ({isOpen, onClose, children, childrenClassName}) => {
	if (!isOpen) return null;

	function onCloseHandler(ev) {
		if (!ev.target.closest(`.${childrenClassName}`) || ev.code === "Escape") {
			onClose()
		}
	}

	return createPortal(
			<div
					className="modal"
					onClick={onCloseHandler}
					onKeyUp={onCloseHandler}
			>
				{children}
			</div>,
			document.body
	);
};

export default PortalModal;