import useFetchHygraph from "@/context/useHygraph";
import { useFetchData } from "@/hooks";


type ItemListTechs = {
    name: string
}

export const ListTechs = () => {

    const getPageData = useFetchHygraph((state) => state.getPageData);
    const { data: pageData } = useFetchData({ requestCallBack: getPageData });

    const TECHS_LIST = pageData?.technologies ?? [];

    return (
        <>
            {
                TECHS_LIST.map((item: ItemListTechs) => {
                    return (
                        <span key={item.name} className='flex items-center justify-center p-4 w-28 h-10 bg-slate-900 text-slate-400 rounded-md cursor-pointer hover:text-slate-200'>
                            {item.name}
                        </span>
                    )
                })
            }
        </>
    )

}
