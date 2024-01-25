import { TLight } from "./higthLigthProjects";
import { TKnonTechs } from "./knownTechs"
import { TSocial } from "./social-media"
import { RichTextContent } from "@graphcms/rich-text-types";

export type HomePageInfo = {
  iam: {
    text: string
  }
  introduction: {
    raw: RichTextContent
  }
  knownTechs: TKnonTechs[],
  technologies: Omit<TKnonTechs[], 'startData'>,
  profilePicture: {
    url: string
  }
  socialMedias: TSocial[],
  higthLigthProjects: TLight[],
}

export type HomePageData = {
  page: HomePageInfo;
}