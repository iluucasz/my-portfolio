'use client';
import { RichText } from "@/components/rich-text";
import useFetchHygraph from "@/context/useHygraph";
import { useEffect } from "react";

export const About = () => {
  const getPageData = useFetchHygraph((state) => state.getPageData);
  const pageData = useFetchHygraph((state) => state.pageData);
  const { isLoading } = useFetchHygraph((state) => ({ isLoading: state.isLoading }));
  // console.log(pageData);

  // const getWriting = pageData?.iam.text ?? '';
  // let IAM_TECHS = getWriting.split(", ").map((s: string) => s.replace(/'/g, ""));
  // const [writing] = useTypewriter({
  //   words: IAM_TECHS,
  //   loop: true,
  //   typeSpeed: 200,
  //   deleteSpeed: 100,

  // });

  //Text about me
  const textAboutMe = pageData?.introduction.raw ?? [];

  //image profile
  // const imageProfile = pageData?.profilePicture.url ?? profile;

  //animation gsap
  // useLayoutEffect(() => {
  //   gsap.to('#div_profile', {
  //     x: 0,
  //     opacity: 1,
  //   });
  // }, [])
  useEffect(() => {
    useFetchHygraph
  }, [getPageData]);

  useEffect(() => {
    getPageData()
  }, [getPageData]);

  // console.log(isLoading, 'test');
  // if (isLoading === false) {
  //   return <div className="h-[755px] w-full text-white text-4xl">Loading...</div>;
  // }

  return (
    <section className='flex justify-center w-full h-[755px] text-white'>
      <div className='container flex flex-col justify-center items-center translate-x-12 opacity-0' id='div_profile'>


        <div className='flex flex-col items-center justify-center gap-8 p-8'>

          <h4 className='text-xl font-medium'>&lt;Lucas S Santos &frasl;&gt;</h4>
          <h3 className='text-2xl font-bold h-20 w-[300px] md:w-full md:3xl'>
            Eu sou um Desenvolvedor
            {/* <span className='ml-2 text-red-900 font-black'>{writing}</span> */}
            {/* <Cursor cursorColor='black' cursorStyle="#" /> */}
          </h3>

          <div className='w-full lg: max-w-[520px]'>
            <RichText content={textAboutMe} />
          </div>
          <div>

            <div className="relative hover:scale-105 bg-gradient-to-r from-[#3f171e] to-[#0f172a] shadow-xl">
              <span className="absolute w-full h-1 top-0 left-0 bg-gradient-to-r from-[#3f171e] to-[#0f172a] animate-pulse"></span>
              <span className="absolute w-1 h-full top-0 right-0 bg-gradient-to-b from-[#3f171e] to-[#0f172a] animate-pulse delay-1000"></span>
              <span className="absolute w-full h-1 left-0 bottom-0 bg-gradient-to-l from-[#3f171e] to-[#0f172a] animate-pulse"></span>
              <span className="absolute w-1 h-full top-0 left-0 bg-gradient-to-t from-[#3f171e] to-[#0f172a] animate-pulse delay-1000"></span>
              {/* <Image
                width={200}
                height={200}
                src={imageProfile}
                alt='imagem de perfil'
                className='w-[200px]'
              /> */}
            </div>

          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[800px]">
            {/* <ListTechs /> */}
          </div>

          <div className='flex gap-11 p-5'>
            {/* <ContactList /> */}
          </div>

          <button className='w-36 h-10 p-2 mt-2 text-white bg-red-900 rounded-md transition-all hover:scale-105 hover:bg-red-800'>Baixar CV</button>
          <div className='flex flex-col items-center'>
            {/* <MdTripOrigin size={30} className="cursor-pointer" />
            <MdKeyboardDoubleArrowDown size={50} className="cursor-pointer" /> */}
          </div>

        </div>


      </div>
    </section>
  )

}
