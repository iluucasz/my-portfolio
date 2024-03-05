import React from 'react'
import { CmsIcon } from '../csm-icon';
import { TSocial } from '@/types/social-media';
import useFetchHygraph from '@/context/useHygraph';
import { useFetchData } from '@/hooks';


const ContactList = () => {

  // const getPageData = useFetchHygraph((state) => state.getPageData);
  // const { data: pageData } = useFetchData({ requestCallBack: getPageData })

  // const MOCK_CONTACT: TSocial[] = pageData?.socialMedias ?? [];

  return (
    <>
      {
        // MOCK_CONTACT?.map((item: TSocial, index) => {
        //   return (
        //     <a key={index} href={item.url} className='text-slate-900 text-3xl hover:text-slate-800 transition-all hover:scale-105' target='_blank'>
        //       {<CmsIcon icon={item.iconSvg} />}
        //     </a>
        //   )
        // })
      }
    </>
  )
}

export default ContactList;