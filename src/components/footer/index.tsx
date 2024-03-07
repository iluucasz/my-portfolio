import style from "./style.module.scss";
import { FcLike } from "react-icons/fc";

export const Footer = () => {
    return (
        <>
            <footer className="flex justify-center p-4">
                <p className="flex items-center gap-2 text-slate-900">&#169; 2023 - 2024 Design & Desenvolvimento por <a href="https://www.linkedin.com/in/lucas-santos-a35070146/" target="_blank" className='flex items-center text-slate-950'>Lucas Santos</a> <FcLike /></p>
            </footer>
        </>
    )
}