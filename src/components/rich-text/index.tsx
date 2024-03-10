import { RichText as CMSRichText, RichTextProps } from '@graphcms/rich-text-react-renderer';

export const RichText = ({ ...props }: RichTextProps) => {
  return (
    <CMSRichText {...props} renderers={{
      bold: ({ children }) => (
        <b className='font-medium text-red-900 w-full'>{children}</b>
      )
    }} />
  )
}