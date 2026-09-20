import { createElement } from 'react';
import type { IconBaseProps } from 'react-icons';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { BiBookContent } from 'react-icons/bi';
import { CgUser } from "react-icons/cg";

const icons = {
  likeEmpty: AiOutlineHeart,
  likeFilled: AiFillHeart,
  arrowDown: SlArrowDown,
  arrowUp: SlArrowUp,
  userIcon: CgUser,
  postsIcon: BiBookContent,
};

export const Icon = ({ name, ...restProps }: { name: keyof typeof icons } & IconBaseProps) => {
  return createElement(icons[name], restProps);
};
