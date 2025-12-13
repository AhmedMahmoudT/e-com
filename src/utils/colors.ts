export const bgColor = (color: string | undefined) => {
  return `bg-[${color}]`;
};

export const hoverColor = (color: string | undefined) => {
  return "hover:" + bgColor(color);
};

export const textColor = (color: string | undefined) => {
  return `text-[${color}]`;
};

export const borderColor = (color: string | undefined) => {
  return `border-[${color}]`;
};
