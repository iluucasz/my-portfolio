'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { MdInsertLink } from "react-icons/md";
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
    const [show, setShow] = useState(true);
    const menuRef = useRef<HTMLElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (window.innerWidth <= 1026 && menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShow(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setShow(window.innerWidth > 1026);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="flex justify-center items-center w-full px-4 h-24">
                <div className="flex justify-between items-center w-full px-4 xl:w-[1200px]">
                    <div>
                        <Link href="/" className="text-3xl font-bold text-red-900 hover:scale-105 transition-all cursor-pointer">
                            <Image src={logo} alt="logotipo" height={90} width={90} className="hidden lg:flex" />
                        </Link>

                        <div className="lg:hidden text-red-900">
                            {show ? (
                                <IoCloseSharp onClick={() => setShow(false)} size={40} />
                            ) : (
                                <GiHamburgerMenu onClick={() => setShow(true)} size={40} />
                            )}
                        </div>
                    </div>
                    <nav
                        ref={menuRef}
                        className={`absolute top-24 w-56 p-6 z-20 flex flex-col gap-8 text-white bg-red-950 lg:flex-row lg:static lg:justify-center lg:bg-transparent lg:w-auto lg:p-0 lg:gap-4 ${show ? "block" : "hidden"}`}
                    >
                        {NAV_ITEMS.map((item) => (
                            <ListItem {...item} key={item.label} />
                        ))}
                    </nav>

                    <button className="flex justify-center items-center w-28 h-10 p-5 text-white bg-red-900 rounded-lg shadow-md opacity-75 transition-all cursor-pointer hover:scale-105 hover:opacity-100">
                        <a href="https://docs.google.com/document/d/1pmIcwyN3nTWk0yUV51qu93IRra1qkXUwayKVQqqPYY0/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            Currículo
                            <MdInsertLink className="animate-pulse" size={15} />
                        </a>
                    </button>
                </div>
            </header>
        </>
    );
}