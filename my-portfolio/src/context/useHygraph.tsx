import { MyExperience } from '@/types/experience-info';
import { TMySkills } from '@/types/mySkill-info';
import { HomePageInfo } from '@/types/page-info';
import { fetchHygraphQuery } from '@/utils/fetch-hygraph-query';
import { create } from 'zustand';

export const query = `
query MyQuery {
  page(where: {slug: "home"}) {
    iam {
      text
    }
    introduction {
      raw
    }
    knownTechs {
      name
      iconSvg
      startDate
    }
    technologies {
      name
    }
    profilePicture {
      url
    }
    socialMedias {
      iconSvg
      url
    }
    higthLightProjects {
      linkForGit
      slug
      shortDescription
      title
      dateProject
      imageProject {
        url
      }
      backgroudProject {
        url
      }
      socialMedias {
        name
        iconSvg
        url
      }
      technologies {
        name
        iconSvg
      }
    }
  }
  myExperiences {
    dateEnd
    dateStart
    descriptionExperience
    iconInstitute {
      url
    }
    linkInstitute
    nameInstitute
    subtitle
    titleInstitute
  }
  mySkills {
    title
    one
    two
    three
    for
  }
}
 `;

const revalidate = 60 * 60 * 24;

interface TState {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void;
  pageData: HomePageInfo | null;
  experienceData: MyExperience[] | null;
  mySkills: TMySkills[] | null;
  getPageData: () => Promise<void>;
  getExperienceData: () => Promise<void>;
  getMySkills: () => Promise<void>;
}

const useFetchHygraph = create<TState>((set, get) => ({
  isLoading: false,
  pageData: null,
  experienceData: null,
  mySkills: null,

  setIsLoading(isLoading) {
    set({ isLoading })
  },

  getPageData: async () => {
    const { setIsLoading } = get()
    try {
      setIsLoading(true)
      const data = await fetchHygraphQuery(query, revalidate);
      set({ pageData: data.page });
      return data.page;
    } catch (error) {

      return error;
    } finally {
      setIsLoading(false)
    }
  },

  getExperienceData: async () => {
    try {
      const data = await fetchHygraphQuery(query, revalidate);
      set({ experienceData: data.myExperience });
      return data.myExperiences;
    } catch (error) {
      console.log(error);
    }
  },

  getMySkills: async () => {
    try {
      const data = await fetchHygraphQuery(query, revalidate);
      set({ mySkills: data.mySkills });
      return data.mySkills;
    } catch (error) {
      console.log(error);
    }
  }
}),

);

export default useFetchHygraph;
