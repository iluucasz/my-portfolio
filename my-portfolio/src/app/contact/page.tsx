import { TitleSection } from '@/components/TitleSection';
import ContactForm from '@/components/contact-form/contact.form';
import ContactList from '@/components/contact_list/contactList';
import Contact from '@/components/pages/Contact';
import { ListTechs } from '@/components/techs/list_techs';
import React from 'react'

const ContactPage = () => {

  return (
    <>
      <TitleSection name='Contato' />
      <div className='w-full h-screen flex flex-col items-center mt-14'>
        <ContactList />
        <ContactForm />
      </div>
    </>
  )
}

export default ContactPage;