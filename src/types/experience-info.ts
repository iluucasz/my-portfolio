import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { StaticImageData } from 'next/image';

export type TMyExperience = {
   dateEnd: string;
   dateStart: string;
   descriptionExperience: string;
   iconInstitute: {
      url: string | StaticImageData | StaticImport;
   };
   linkInstitute: string;
   nameInstitute: string;
   subtitle: string;
   titleInstitute: string;
};
