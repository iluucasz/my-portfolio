type TTechsProps = {
    label: string;
}

export const ListTechs = ({ label }: TTechsProps) => {
    return (
        <span className='flex items-center justify-center p-4 w-28 h-10 bg-slate-900 text-slate-400 rounded-md cursor-pointer hover:text-slate-200'>
            {label}
        </span>
    )
}
