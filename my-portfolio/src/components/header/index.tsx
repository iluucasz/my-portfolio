'use client';
import Link from "next/link";
import { MdInsertLink } from "react-icons/md";
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

    return (
        <>
            <header className="container">

                <div className="flex items-center justify-between p-8">
                    <div className="flex items-center justify-between" >
                        <Link className="text-3xl font-bold text-red-900 hover:scale-105 transition-all cursor-pointer" href='/'>&#60;LSS/&#62;</Link>
                    </div>

                    <nav className="flex gap-8 text-white ">
                        {NAV_ITEMS.map((item) => {
                            return (
                                <ListItem {...item} key={item.label} />
                            )
                        })}
                    </nav>

                    <button className="flex items-center justify-center gap-2 max-w-36 h-10 p-5 text-white bg-red-900 rounded-lg shadow-md opacity-75 transition-all cursor-pointer hover:scale-105 hover:opacity-100 ">
                        <MdInsertLink className="animate-pulse" size={20} />
                        Currículo
                    </button>
                </div>

            </header>
        </>
    )
}