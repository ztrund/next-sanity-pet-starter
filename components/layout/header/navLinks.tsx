import {useRouter} from "next/router";
import Link from "next/link";

const getLinkClassName = (href: string, isVertical: boolean) => {
    const router = useRouter();
    const isActive = router.pathname === href;
    const baseClass = `hover:text-dark-accent focus:outline-none h-16 flex items-center ${isVertical ? "px-4 w-full text-end justify-end" : "px-2"}`;
    const activeClass = "text-main-brand-color";
    const inactiveClass = "text-gray-100";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
};

export const NavLinks = ({isVertical}: { isVertical: boolean }) => (
    <div className={`flex items-center ${isVertical && "flex-col"}`}>
        <Link href="/" className={getLinkClassName("/", isVertical)}>
            Home
        </Link>
        <Link href="/about" className={getLinkClassName("/about", isVertical)}>
            About Us
        </Link>
        <Link href="/puppies" className={getLinkClassName("/puppies", isVertical)}>
            Puppies
        </Link>
        <Link href="/parents" className={getLinkClassName("/parents", isVertical)}>
            Parents
        </Link>
        <Link href="/contact" className={getLinkClassName("/contact", isVertical)}>
            Contact Us
        </Link>
    </div>
);

export default NavLinks;