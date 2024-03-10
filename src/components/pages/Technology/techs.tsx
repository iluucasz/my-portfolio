import { TPageDataProp } from '@/app/page';
import { CmsIcon } from '@/components/csm-icon';
import { TKnownTechs } from '@/types/knownTechs';
import { getRelativeTimeString } from '@/utils/get-relative-time';

const Techs = ({ pageData }: TPageDataProp) => {

  const LIST_TECHS = pageData?.knownTechs ?? [];

  return (
    <>
      {
        LIST_TECHS.map((item: TKnownTechs) => {
          const relativeTime = getRelativeTimeString(new Date(item.startDate), 'pt-BR').replace('há ', '');
          return (
            <div key={item.name} className='flex flex-col gap-3 items-center justify-center h-28 p-4 w-full max-w-56 bg-slate-900/60 text-red-900 rounded-md cursor-pointer shadow-lg transition-all hover:scale-105 hover:text-slate-200 border-2 border-transparent hover:border-2 hover:border-red-900 rotate-180' id='ScrollTech'>
              <div className='flex items-center gap-16'>
                <p className='font-bold'>{item.name}</p>
                <CmsIcon icon={item.iconSvg} height='20px' width='20px' />
              </div>
              <span>{relativeTime} de experiência</span>
            </div>
          )
        })
      }
    </>

  )
}

export default Techs;