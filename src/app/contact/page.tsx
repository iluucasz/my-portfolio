import { TitleSection } from '@/components/TitleSection';
import ContactForm from '@/components/contact-form/contact.form';
import ContactList from '@/components/contact_list/contactList';
import { getPageData } from '@/context/useHygraph';

export default async function ContactPage() {
  const { page: pageData } = await getPageData()
  return (
    <>
      <TitleSection name='Contato' />
      <div className='w-full h-screen flex flex-col items-center mt-14'>
        <div className='flex gap-8 mb-5'>
          <ContactList pageData={pageData} />
        </div>
        <ContactForm />
      </div>
    </>
  )
}
