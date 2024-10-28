"use client";

import React from "react";
import { useState } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";
import { SlideNavTabs } from "./NavItems";

function NavbarContent() {
	return (
		<div className="">
			<SlideNavTabs />
		</div>
	);
}

export const Navbar = () => {
	const { scrollYProgress } = useScroll();

	const [visible, setVisible] = useState(true);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number") {
			const direction = current - scrollYProgress.getPrevious()!;
			if (direction < 0) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.nav
				initial={{
					y: -150,
					opacity: 1,
				}}
				animate={{
					y: visible ? -50 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.2,
					ease: "easeOut",
				}}
				className="fixed z-[99999]  inset-x-0 mt-12 hidden w-full px-24 text-sm md:flex"
			>
				<NavbarContent />
			</motion.nav>
		</AnimatePresence>
	);
};