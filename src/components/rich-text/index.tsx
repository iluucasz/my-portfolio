import { RichText as CMSRichText, RichTextProps } from '@graphcms/rich-text-react-renderer';

export const RichText = ({ ...props }: RichTextProps) => {
  return (
    <CMSRichText {...props} renderers={{
      bold: ({ children }) => (
        <b className='font-semibold text-red-400'>{children}</b>
      ),
      p: ({ children }) => (
        <p className='mb-3 last:mb-0'>{children}</p>
      ),
    }} />
  )
}