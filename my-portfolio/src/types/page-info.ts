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
  technologies: string[]
  profilePicture: {
    url: string
  }
  socialMedias: TSocial[]
}

export type HomePageData = {
  page: HomePageInfo;
}