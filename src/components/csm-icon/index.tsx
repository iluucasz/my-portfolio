type TCmsProps = {
  icon: string;
}

export const CmsIcon = ({ icon }: TCmsProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: icon }} />
  )
}