import React from 'react'
import { FaDiscord, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

type TContactList = {
  url: string,
  icon: string
}

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

const ContactList = () => {
  return (
    <div className='flex gap-11 p-5'>
      {
        MOCK_CONTACT.map((item, index) => {
          return (
            <a key={index} href={item.url} className='text-slate-900 text-3xl hover:text-slate-800 transition-all hover:scale-105' target='_blank'>{item.icon}</a>
          )
        })
      }
    </div>
  )
}

export default ContactList;