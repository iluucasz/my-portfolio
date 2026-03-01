import { TKnownTechs } from './knownTechs';
import { TSocial } from './social-media';

export type TLight = {
   backgroundProject: {
      url: string;
   };
   dateProject: string;
   destaque?: number;
   imageProject: {
      url: string;
   };
   linkForGit: string;
   linkDoProjeto?: string;
   slug: string;
   shortDescription: string;
   socialMedias: TSocial[];
   technologies: Omit<TKnownTechs[], 'startData'>;
   title: string;
};
