'use client'
import Image from 'next/image';
import React from 'react';
import profile from "../../../../public/images/perfil2.png";
import { MdKeyboardDoubleArrowDown, MdTripOrigin } from 'react-icons/md';
import { FaDiscord, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { ListTechs } from '@/components/techs/list_techs';
import ContactList from '@/components/contact_list/contactList';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TECHS_LIST = [
  {
    name: "Typescript"
  },
  {
    name: "React"
  },
  {
    name: "NextJS"
  },
  {
    name: "Prisma"
  },
  {
    name: "PostgreSQL"
  },
];

const MOCK_CONTACT = [
  {
    url: "https://www.linkedin.com/in/lucas-santos-a35070146/",
    icon: <FaLinkedinIn />
  },
  {
    url: "https://wa.me/5521973165015",
    icon: <FaWhatsapp />
  },
  {
    url: "https://discord.gg/Nc9XhEPc",
    icon: < FaDiscord />
  },
  {
    url: "https://github.com/iluucasz",
    icon: <FaGithub />
  }
]



const About = () => {

  const [writing] = useTypewriter({
    words: ['Web', 'Full-Stack', 'Front-End', 'Typescript', 'React', 'NextJS'],
    loop: true,
    typeSpeed: 200,
    deleteSpeed: 100,

  });


  return (
    <section className='flex justify-center w-full h-full text-white'>
      <div className='container flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center justify-center gap-8 p-8'>
          <h4 className='text-xl font-medium'>&lt;Lucas S Santos &frasl;&gt;</h4>
          <h3 className='text-3xl font-bold w-[600px]'>
            Eu sou um Desenvolvedor
            <span className='ml-2 text-red-900 font-black'>{writing}</span>
            <Cursor cursorColor='black' cursorStyle="#" />
          </h3>
          <p className='w-10/12 lg: max-w-[520px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Commodi quo quidem voluptatibus, corrupti eos ratione dolore
            qui quisquam tenetur? Quis repudiandae necessitatibus earum totam
            dolorem cumque tempore nemo quaerat enim.
          </p>
          <div>

            <div className="relative hover:scale-105 bg-gradient-to-r from-[#3f171e] to-[#0f172a] shadow-xl">
              <span className="absolute w-full h-1 top-0 left-0 bg-gradient-to-r from-[#3f171e] to-[#0f172a] animate-pulse"></span>
              <span className="absolute w-1 h-full top-0 right-0 bg-gradient-to-b from-[#3f171e] to-[#0f172a] animate-pulse delay-1000"></span>
              <span className="absolute w-full h-1 left-0 bottom-0 bg-gradient-to-l from-[#3f171e] to-[#0f172a] animate-pulse"></span>
              <span className="absolute w-1 h-full top-0 left-0 bg-gradient-to-t from-[#3f171e] to-[#0f172a] animate-pulse delay-1000"></span>
              <Image src={profile} alt='imagem de perfil' className='max-w-[200px]' />
            </div>

          </div>

          <div className='flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[800px]'>
            {
              TECHS_LIST.map((item) => {
                return (
                  <ListTechs key={item.name} label={item.name} />
                )
              })
            }
          </div>

          <ContactList />

          <button className='w-36 h-10 p-2 mt-2 text-white bg-red-900 rounded-md transition-all hover:scale-105 hover:bg-red-800'>Baixar CV</button>
          <div className='flex flex-col items-center'>
            <MdTripOrigin size={30} className="cursor-pointer" />
            <MdKeyboardDoubleArrowDown size={50} className="cursor-pointer" />
          </div>

        </div>

      </div>
    </section>
  )
}

export default About;