import { FcLike } from "react-icons/fc";

export const Footer = () => {
    return (
        <>
            <footer className="relative flex justify-center p-4 overflow-hidden">
                {/* Subtle fire/ember glow at footer edges */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent animate-pulse" />
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/15 to-transparent" style={{ animationDelay: '0.5s' }} />
                </div>
                <p className="relative z-10 flex items-center gap-2 text-orange-200/80">&#169; 2023 - 2026 Design & Desenvolvimento por <a href="https://www.linkedin.com/in/lucas-santos-a35070146/" target="_blank" className='flex items-center text-orange-100/90 hover:text-orange-300 transition-colors'>Lucas Santos</a> <FcLike /></p>
            </footer>
        </>
    )
}