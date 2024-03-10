type TCmsProps = {
  icon: string;
  height: string;
  width: string;
}

export const CmsIcon = ({ icon, height, width }: TCmsProps) => {
  const iconStyle = {
    height,
    width,
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: icon }}
      className="flex justify-center items-center"
      style={iconStyle}
    />
  )
}
