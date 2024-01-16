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
  }
}
 `;

const revalidate = 60 * 60 * 24;

interface TState {
  pageData: HomePageInfo | null;
  getPageData: () => Promise<void>;
}

const useFetchHygraph = create<TState>((set) => ({
  pageData: null,

  getPageData: async () => {
    try {
      const data = await fetchHygraphQuery(query, revalidate);
      set({ pageData: data.page });
      return data.page;
    } catch (error) {
      console.log(error);
    }
  }

}),

);

export default useFetchHygraph;
