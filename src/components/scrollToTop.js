"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Wrap in a timeout to ensure it runs after the route change is fully processed
        const scrollTimeout = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "auto",
            });
        }, 0);

        return () => clearTimeout(scrollTimeout);
    }, [pathname]);

    return null;
};

export default ScrollToTop;