import { About } from "@/app/module";
import { TPageDataProp } from "@/app/page";

const Page = ({ pageData }: TPageDataProp) => {
  return (
    <About pageData={pageData} />
  )
}

export default Page;