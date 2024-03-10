import { TPageDataProp } from '@/app/page';
import { TitleSection } from '@/components/TitleSection';
import Techs from './techs';

const Technology = ({ pageData }: TPageDataProp) => {
  return (
    <>
      <TitleSection name='Tecnologias' />
      <section className='flex justify-center items-center h-screen min-h-screen'>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:max-w-[900px] '>
          <Techs pageData={pageData} />
        </div>
      </section>
    </>
  )
}

export default Technology;