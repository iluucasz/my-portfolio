import ContactForm from '@/components/contact-form/contact.form'
import ParallaxLayer from '@/components/parallax-layer'
import { HiOutlineMail } from 'react-icons/hi'
import { TitleSection } from '@/components/TitleSection'

const Contact = () => {
  return (
    <>
      <section className='relative flex flex-col items-center w-full px-4 py-40 overflow-hidden'>
        {/* Section title */}
        <TitleSection name="Contato" />

        {/* Background glow */}
        <ParallaxLayer speed={0.07} className="pointer-events-none absolute inset-0">
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-red-900/8 blur-[100px]" />
        </ParallaxLayer>

        <div className='relative z-10 flex w-full max-w-lg flex-col items-center gap-8'>
          {/* Header */}
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-red-900/20 text-red-400'>
              <HiOutlineMail className='text-2xl' />
            </div>
            <h3 className='text-2xl font-bold text-white'>Vamos conversar?</h3>
            <p className='max-w-sm text-sm text-gray-400'>
              Envie uma mensagem e entrarei em contato o mais breve possível.
            </p>
          </div>

          {/* Form card */}
          <div className='w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8'>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact