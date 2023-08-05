"use client";
import React from "react";
import { motion } from "framer-motion";

const NavbarToggle = ({ isMenuOpen, setIsMenuOpen }) => {
	const strokeWidth = 2;
	const width = 24;
	const height = 24;
	const transition = null;
	let lineProps = null;

	const variant = isMenuOpen ? "opened" : "closed";

	const top = {
		closed: {
			rotate: 0,
			translateY: 0,
		},
		opened: {
			rotate: 45,
			translateY: 1,
		},
	};

	const center = {
		closed: {
			opacity: 1,
		},
		opened: {
			opacity: 0,
		},
	};

	const bottom = {
		closed: {
			rotate: 0,
			translateY: 0,
		},
		opened: {
			rotate: -45,
			translateY: -1,
		},
	};

	lineProps = {
		strokeWidth: strokeWidth,
		vectorEffect: "non-scaling-stroke",
		initial: "closed",
		animate: variant,
		transition,
	};

	const unitHeight = 4;
	const unitWidth = (unitHeight * width) / height;

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<motion.svg
			onClick={toggleMenu}
			viewBox={`0 0 ${unitWidth} ${unitHeight}`}
			overflow="visible"
			preserveAspectRatio="none"
			width={width}
			height={height}
		>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="1"
				y2="1"
				variants={top}
				{...lineProps}
				className="stroke-neutral-300"
			/>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="2"
				y2="2"
				variants={center}
				{...lineProps}
				className="stroke-neutral-300"
			/>
			<motion.line
				x1="0"
				x2={unitWidth}
				y1="3"
				y2="3"
				variants={bottom}
				{...lineProps}
				className="stroke-neutral-300"
			/>
		</motion.svg>
	);
};

export default NavbarToggle;
