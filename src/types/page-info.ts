import { TMyExperience } from './experience-info';
import { TLight } from './higthLigthProjects';
import { TKnownTechs } from './knownTechs';
import { TMySkills } from './mySkill-info';
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
   technologies: {
      name: string;
   };
   profilePicture: {
      url: string;
   };
   socialMedias: TSocial[];
   highLightProjects: TLight[];
};

export type HomePageData = {
   page: HomePageInfo;
   myExperiences: TMyExperience[];
   mySkills: TMySkills[];
};
