import { TLight } from './higthLigthProjects';
import { TKnownTechs } from './knownTechs';
import { TSocial } from './social-media';
import { RichTextContent } from '@graphcms/rich-text-types';

export type HomePageInfo = {
   iam: {
      text: string;
   };
   introduction: {
      raw: RichTextContent;
   };
   knownTechs: TKnownTechs[];
   technologies: Omit<TKnownTechs[], 'startData'>;
   profilePicture: {
      url: string;
   };
   socialMedias: TSocial[];
   highLightProjects: TLight[];
};

export type HomePageData = {
   page: HomePageInfo;
};
