import { GithubIcon, LinkedInIcon, TwitterXIcon } from "@icons";

import type { SVGEl, SVGProps } from "@/components/svg";

/* ============================================================================================= */

type NavLinks = Record<
  "docs",
  {
    label: string;
    url: string;
    icon?: (props: SVGProps) => SVGEl;
    title?: string;
  }
>;

export const navLinks: NavLinks = {
  docs: {
    label: "Docs",
    url: "/docs",
    title: "documentation",
  },
};

/* ============================================================================================= */

type SocialLinks = Record<
  "github" | "x" | "linkedIn",
  {
    label: string;
    url: string;
    icon: (props: SVGProps) => SVGEl;
    title?: string;
  }
>;

export const socialLinks: SocialLinks = {
  github: {
    label: "Github",
    url: "https://github.com/JadejaHQ/shilpcss",
    icon: GithubIcon,
  },
  x: {
    label: "X",
    url: "https://x.com/shilpcss",
    icon: TwitterXIcon,
  },
  linkedIn: {
    label: "LinkedIn",
    url: "https://linkedin.com/showcase/shilpcss",
    icon: LinkedInIcon,
  },
};

/* ============================================================================================= */

export type AuthorLinks = Record<
  "jadeja",
  {
    name: string;
    url: string;
  }
>;

export const authorLinks: AuthorLinks = {
  jadeja: {
    name: "Pradipsinh Jadeja",
    url: "https://x.com/jadeja97_",
  },
};
