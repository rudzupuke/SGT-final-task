import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// Prevents default scroll restoration, see https://v5.reactrouter.com/web/guides/scroll-restoration
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
