import { HomePageData } from "@/types/page-info";
import { fetchHygraphQuery } from "@/utils/fetch-hygraph-query";

const query = `
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
    highLightProjects {
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

export const getPageData = async (): Promise<HomePageData> => {
  return fetchHygraphQuery(
    query,
    revalidate
  )
}