import { TitleSection } from '@/components/TitleSection'
import ContactForm from '@/components/contact-form/contact.form'

const Contact = () => {
  return (
    <>
      <TitleSection name='Contato' />
      <section className='flex flex-col w-full h-[750px]'>
        <div className='mt-14 w-[320px] max-w-[480px] mx-auto md:w-[480px]'>
          <ContactForm />
        </div>
      </section>
    </>
  )
}

export default Contact