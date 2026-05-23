import { Fragment } from "react";

import Link from "@/components/link";
import Separator from "@/components/separator";
import { authorLinks, socialLinks } from "@/data/links";

import type { ReactElement } from "react";

/* ============================================================================================= */

const Footer = (): ReactElement<HTMLDivElement> => (
  <div className="footer__wrapper">
    <footer className="container">
      <Quote />
      <Socials />
      <Copyright />
    </footer>
  </div>
);

/* ============================================================================================= */

const Quote = (): ReactElement<HTMLParagraphElement> => (
  <p className="footer__quote">Craft Practiced Over Time</p>
);

/* ============================================================================================= */

const Socials = (): ReactElement<HTMLDivElement> => (
  <div className="footer__socials">
    {Object.values(socialLinks).map((link, index) => (
      <Fragment key={link.url}>
        {/*  */}
        {index !== 0 && <Separator vertical />}

        <Link href={link.url} title={link.title ?? link.label} className="social">
          <link.icon />
        </Link>
      </Fragment>
    ))}
  </div>
);

/* ============================================================================================= */

const Copyright = (): ReactElement<HTMLElement> => (
  <small className="footer__copyright">
    2026 - Present &copy; <Link href={authorLinks.jadeja.url}>{authorLinks.jadeja.name}</Link>
  </small>
);

/* ============================================================================================= */

export default Footer;
