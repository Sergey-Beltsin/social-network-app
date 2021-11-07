import { FC } from "react";

type ProfileIconProps = {
  fill?: string;
};

export const ProfileIcon: FC<ProfileIconProps> = ({ fill }) => (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      fill="none"
      stroke={fill || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <circle
      cx="12"
      cy="7"
      fill="none"
      r="4"
      stroke={fill || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
