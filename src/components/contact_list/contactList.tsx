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
            <a key={index} href={item.url} className='text-slate-500 text-3xl hover:text-slate-800 transition-all hover:scale-105' target='_blank'>
              {<CmsIcon icon={item.iconSvg} height='40px' width='50px' />}
            </a>
          )
        })
      }
    </>
  )
}

export default ContactList;