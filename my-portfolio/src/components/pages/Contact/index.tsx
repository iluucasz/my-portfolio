import { TitleSection } from '@/components/TitleSection'
import ContactForm from '@/components/contact-form/contact.form'
import React from 'react'

const Contact = () => {
  return (<>
    <section className='flex flex-col w-full h-[750px]'>
      <TitleSection name='Contato' />
      <div className='mt-14 w-full max-w-[480px] mx-auto'>
        <ContactForm />
      </div>
    </section>
  </>
  )
}

export default Contact