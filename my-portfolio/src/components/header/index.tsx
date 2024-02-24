'use client';
import Link from "next/link";
import { MdInsertLink } from "react-icons/md";
import ListItem from "./list_item";
import Image from "next/image";
import logo from "../../../public/images/icon/logo.png";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

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
    const [show, setShow] = useState(false)

    return (
        <>
            <header className="flex w-full px-4 h-24">

                <div className="flex justify-between items-center w-full px-4">
                    <div>
                        <Link className="text-3xl font-bold text-red-900 hover:scale-105 transition-all cursor-pointer" href='/'>
                            <Image src={logo} alt="logotipo" height={90} width={90} className="hidden lg:flex" />
                            <div className="lg:hidden">
                                {show ? <IoCloseSharp onClick={() => setShow(!show)} /> : <GiHamburgerMenu onClick={() => setShow(!show)} />}
                            </div>
                        </Link>
                    </div>
                    {
                        show ? <nav className="absolute top-24 w-56 p-6 z-20 flex flex-col gap-8 text-white bg-red-950 lg:flex-row lg:static lg:justify-center lg:bg-transparent">
                            {NAV_ITEMS.map((item) => {
                                return (
                                    <ListItem {...item} key={item.label} />
                                )
                            })}
                        </nav> : null
                    }


                    <button className="flex items-center justify-center gap-2 w-24 max-w-36 h-10 p-5 text-white bg-red-900 rounded-lg shadow-md opacity-75 transition-all cursor-pointer hover:scale-105 hover:opacity-100 ">
                        <MdInsertLink className="animate-pulse hidden" size={10} />
                        Currículo
                    </button>
                </div>

            </header>
        </>
    )
}