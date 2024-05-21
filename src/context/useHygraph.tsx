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
    profilePicture {
      url
    }
    socialMedias {
      iconSvg
      url
    }
    highLightProjects(first: 30) {
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
        iconSvg
        name
        startDate
      }
    }
    knownTechs(first: 30) {
      name
      iconSvg
      startDate
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
  technologies(first: 30) {
    iconSvg
    name
    startDate
  }
}
 `;

export const getPageData = async (): Promise<HomePageData> => {
  return fetchHygraphQuery(
    query
  )
}