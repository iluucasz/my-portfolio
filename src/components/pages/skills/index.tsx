import { TMySkillsDataProp } from '@/app/page'
import { TitleSection } from '@/components/TitleSection'
import ListSkills from '@/components/skills_list/list_skill'

const Skills = ({ mySkillsData }: TMySkillsDataProp) => {

  const listSkill = mySkillsData;

  return (
    <>
      <TitleSection name='Soft Skills' />
      <section className='h-full mt-10 mb-10'>
        <div className='min-h-screen h-full flex flex-col justify-center items-center gap-8 md:gap-20 md:grid md:grid-cols-2 lg:grid-cols-[300px,300px,300px]'>
          {
            listSkill.map((item, index) => {
              return (
                <div key={index}>
                  <ListSkills item={item} />
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

export default Skills