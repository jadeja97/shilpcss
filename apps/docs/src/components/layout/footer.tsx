import { docsConfig } from "@docs";
import {
  FooterRoot,
  Footer as FooterEl,
  FooterCopyright,
} from "@jadeja/docs/components/layout/footer";
import { Link } from "@jadeja/docs/components/link";
import { Separator } from "@jadeja/docs/components/separator";
import { Fragment } from "react";

import type { ReactElement } from "react";

/* ============================================================================================= */

const Footer = (): ReactElement<HTMLDivElement> => {
  return (
    <FooterRoot>
      <FooterEl className="container">
        {/*  */}

        <Quote />

        <Socials />

        <FooterCopyright>
          2026 - Present &copy;{" "}
          <Link href={docsConfig.authors.jadeja.link}>{docsConfig.authors.jadeja.name}</Link>
        </FooterCopyright>
      </FooterEl>
    </FooterRoot>
  );
};

/* ============================================================================================= */

const Quote = (): ReactElement<HTMLParagraphElement> => {
  return <p className="footer__quote">Craft Practiced Over Time</p>;
};

/* ============================================================================================= */

const Socials = (): ReactElement<HTMLDivElement> => {
  return (
    <div className="footer__socials">
      {Object.values(docsConfig.links.socials).map((link, index) => {
        return (
          <Fragment key={link.url}>
            {/*  */}
            {index !== 0 && <Separator vertical />}

            <Link href={link.url} title={link.title ?? link.label} className="social">
              {link.icon && <link.icon />}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};

/* ============================================================================================= */

export default Footer;
