'use client'
import { TPageDataProp } from "@/app/page";
import ContactList from "@/components/contact_list/contactList";
import { RichText } from "@/components/rich-text";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowDown, MdTripOrigin } from "react-icons/md";
import { Cursor } from 'react-simple-typewriter';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export const About = ({ pageData }: TPageDataProp) => {
  let getWriting = pageData?.iam.text ?? '';

  const textList = getWriting.replace(/'/g, "").split(", ")

  const textAboutMe = pageData?.introduction.raw ?? [];

  const imageProfile = pageData?.profilePicture.url ?? "";

  const [text, setText] = useState('');

  //animation writting
  useEffect(() => {
    gsap.to("#translate", {
      x: 0,
      y: 0,
      opacity: 1,
    });

    let count = 0;
    let index = 0
    const textInterval = setInterval(() => {
      const currentText = textList[index]
      const characterList = currentText.split("")
      if (count < characterList.length) {
        const newC = characterList[count];
        setText((text) => text + newC)
        count++;
      } else {
        if (index < textList.length - 1) {
          index++
        } else {
          index = 0
        }
        setText("");
        count = 0;
      }
    }, 400)
    return () => { clearInterval(textInterval), gsap.killTweensOf("#translate") }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex justify-center items-center text-white min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-8 p-8">
          <h4 className="text-xl font-medium translate-x-full opacity-0" id="translate">
            &lt;Lucas S Santos &frasl;&gt;
          </h4>
          <h3 className="text-2xl font-bold h-20 w-[300px] translate-x-full opacity-0 md:w-full md:text-4xl" id="translate">
            Eu sou um Desenvolvedor
            <span className='ml-2 text-red-900 font-black translate-y-full opacity-0' id="translate">{text}</span>
            <Cursor cursorColor='black' cursorStyle="#" />
          </h3>

          <div className="w-[360px] text-xl md:w-full translate-y-full opacity-0 md:text-2xl lg:w-[600px]" id="translate">
            <RichText content={textAboutMe} />
          </div>
          <div>
            <div className="relative hover:scale-105 bg-gradient-to-r from-[#3f171e] to-[#0f172a] shadow-xl">
              <span className="absolute w-full h-1 top-0 left-0 bg-gradient-to-r from-[#3f171e] to-[#0f172a] animate-pulse"></span>
              <span className="absolute w-1 h-full top-0 right-0 bg-gradient-to-b from-[#3f171e] to-[#0f172a] animate-pulse delay-1000"></span>
              <span className="absolute w-full h-1 left-0 bottom-0 bg-gradient-to-l from-[#3f171e] to-[#0f172a] animate-pulse"></span>
              <span className="absolute w-1 h-full top-0 left-0 bg-gradient-to-t from-[#3f171e] to-[#0f172a] animate-pulse delay-1000"></span>

              {imageProfile && (
                <Image
                  width={200}
                  height={200}
                  src={imageProfile}
                  alt="imagem de perfil"
                  className="w-[200px] translate-y-full opacity-0"
                  id="translate"
                />
              )}
            </div>
          </div>

          <div className="flex gap-11 p-5">
            <ContactList pageData={pageData} />
          </div>

          <button className="w-36 h-10 p-2 text-white bg-red-900 rounded-md transition-all hover:scale-105 hover:bg-red-800">
            <a href="https://docs.google.com/document/d/1pmIcwyN3nTWk0yUV51qu93IRra1qkXUwayKVQqqPYY0/edit?usp=sharing" target="_blank">
              <p className="text-lg">Baixar CV</p>
            </a>
          </button>
          <div className="flex flex-col items-center">
            <MdTripOrigin size={30} className="cursor-pointer" />
            <MdKeyboardDoubleArrowDown size={50} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
};
