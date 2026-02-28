'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import logo from "../../../public/images/icon/logo.png";
import ListItem from "./list_item";

const NAV_ITEMS = [
    {
        label: 'Sobre',
        href: '/'
    },
    {
        label: 'Tecnologias',
        href: '/technology'
    },
    {
        label: 'Projetos',
        href: '/projects'
    },
    {
        label: 'Experiência',
        href: '/experience'
    },
    {
        label: 'Skills',
        href: '/skills'
    },
    {
        label: 'Contato',
        href: '/contact'
    },
];

export const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef<HTMLElement>(null);

    // Close mobile menu on outside click
    const handleClickOutside = (event: MouseEvent) => {
        if (window.innerWidth <= 1026 && menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMobileOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1026) setMobileOpen(false);
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleResize();
        handleScroll();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:h-20">
                {/* Logo */}
                <Link href="/" className="relative flex items-center gap-2 transition-transform hover:scale-105">
                    <Image
                        src={logo}
                        alt="logotipo"
                        className="h-6 w-auto lg:h-8 lg:w-auto object-contain"
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_ITEMS.map((item) => (
                        <ListItem {...item} key={item.label} />
                    ))}
                </nav>

                {/* CTA + Mobile toggle */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://docs.google.com/document/d/1pmIcwyN3nTWk0yUV51qu93IRra1qkXUwayKVQqqPYY0/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-900/40 px-5 py-2.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-red-500/50 hover:bg-red-900/60 hover:shadow-md hover:shadow-red-900/20"
                    >
                        Currículo
                        <HiOutlineDocumentText className="text-lg text-red-400 transition-transform group-hover:scale-110" />
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-all hover:bg-white/[0.08] lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <IoCloseSharp size={22} /> : <HiOutlineMenuAlt3 size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            <nav
                ref={menuRef}
                className={`overflow-hidden border-b border-white/[0.06] bg-gray-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
                    mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-b-0'
                }`}
            >
                <div className="flex flex-col gap-1 px-5 py-4">
                    {NAV_ITEMS.map((item) => (
                        <ListItem {...item} key={item.label} onNavigate={() => setMobileOpen(false)} />
                    ))}
                </div>
            </nav>
        </header>
    );
}