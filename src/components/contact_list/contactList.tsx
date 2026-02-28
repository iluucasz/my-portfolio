import { TPageDataProp } from '@/app/page';
import { TSocial } from '@/types/social-media';
import { CmsIcon } from '../csm-icon';

const ContactList = ({ pageData }: TPageDataProp) => {

  const MOCK_CONTACT: TSocial[] = pageData?.socialMedias ?? [];

  return (
    <>
      {
        MOCK_CONTACT?.map((item: TSocial, index) => {
          return (
            <a
              key={index}
              href={item.url}
              className='flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-400 transition-all hover:border-red-800/40 hover:bg-red-900/20 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-red-900/20'
              target='_blank'
              rel='noopener noreferrer'
            >
              {<CmsIcon icon={item.iconSvg} height='28px' width='28px' />}
            </a>
          )
        })
      }
    </>
  )
}

export default ContactList;