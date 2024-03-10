import { TKnownTechs } from './knownTechs';
import { TSocial } from './social-media';

export type TLight = {
   backgroundProject: {
      url: string;
   };
   dateProject: string;
   imageProject: {
      url: string;
   };
   linkForGit: string;
   slug: string;
   shortDescription: string;
   socialMedias: TSocial[];
   technologies: Omit<TKnownTechs[], 'startData'>;
   title: string;
};
