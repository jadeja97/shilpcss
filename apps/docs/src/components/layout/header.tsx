import { contentBaseOptions, docsConfig } from "@docs";
import { MenuIcon, SearchIcon } from "@jadeja/docs/components/assets/icons";
import { Button } from "@jadeja/docs/components/button";
import { DialogRoot, DialogTrigger, DialogContent } from "@jadeja/docs/components/dialog";
import { HeaderRoot, Header as HeaderEl } from "@jadeja/docs/components/layout/header";
import { Search } from "@jadeja/docs/components/layout/search";
import { Link } from "@jadeja/docs/components/link";
import { List } from "@jadeja/docs/components/list";
import { Separator } from "@jadeja/docs/components/separator";
import {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@jadeja/docs/components/sheet";
import { ThemeToggle } from "@jadeja/docs/components/theme/toggle";

import Logo from "@/components/assets/logo";

import type { ReactElement } from "react";

/* ============================================================================================= */

const Header = (): ReactElement<HTMLDivElement> => {
  return (
    <HeaderRoot>
      <HeaderEl className="container">
        {/*  */}
        <Link href="/" className="header__logo">
          <Logo /> <span>Shilp CSS</span>
        </Link>

        <div className="header__navigation">
          <MobileNavigation />
          <DesktopNavigation />
        </div>
      </HeaderEl>
    </HeaderRoot>
  );
};

/* ============================================================================================= */

const MobileNavigation = (): ReactElement<HTMLDivElement> => {
  return (
    <div className="header--mobile">
      {/*  */}
      <SearchPopup />

      <SheetRoot>
        <SheetTrigger render={<Button hasIcon variant="ghost" size="icon-md" />}>
          <MenuIcon />
          <span className="screen-reader">navigation menu</span>
        </SheetTrigger>
        <SheetContent side="right" hideCloseButton={false} className="header--mobile-content">
          <SheetHeader>
            <SheetTitle>
              <Logo /> <span>Shilp CSS</span>
            </SheetTitle>
          </SheetHeader>

          <List unstyled>
            {Object.values(docsConfig.links.navigations).map((link) => {
              return (
                <li key={link.url}>
                  <SheetClose isWrapper nativeButton={false} render={<Link href={link.url} />}>
                    {link.label}
                  </SheetClose>
                </li>
              );
            })}
          </List>

          <SheetFooter>
            <Socials />
            <ThemeToggle />
          </SheetFooter>
        </SheetContent>
      </SheetRoot>
    </div>
  );
};

/* ============================================================================================= */

const DesktopNavigation = (): ReactElement<HTMLDivElement> => {
  return (
    //

    <div className="header--desktop">
      {/*  */}
      <nav>
        <List unstyled>
          {Object.values(docsConfig.links.navigations).map((link) => {
            return (
              <li key={link.url}>
                <Link navLink href={link.url} title={link.title ?? link.label}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </List>
      </nav>

      <Separator vertical />

      <SearchPopup />

      <Separator vertical />

      <Socials />

      <Separator vertical />

      <ThemeToggle />
    </div>
  );
};

/* ============================================================================================= */

const SearchPopup = (): ReturnType<typeof DialogRoot> => {
  return (
    <DialogRoot>
      {/*  */}
      <DialogTrigger render={<Button hasIcon variant="ghost" size="icon-sm" />}>
        <SearchIcon />
        <span className="screen-reader">open search popup</span>
      </DialogTrigger>

      <DialogContent hideCloseButton className="search-content">
        {/*  */}
        <Search DEV={docsConfig.constants.DEV} {...contentBaseOptions.search} />
        {/*  */}
      </DialogContent>
    </DialogRoot>
  );
};

/* ============================================================================================= */

const Socials = (): ReturnType<typeof List> => {
  return (
    <List unstyled className="social-icons">
      {Object.values(docsConfig.links.socials).map((link) => {
        return (
          <li key={link.url}>
            <Link href={link.url} title={link.title ?? link.label}>
              {link.icon && <link.icon />}
            </Link>
          </li>
        );
      })}
    </List>
  );
};

/* ============================================================================================= */

export default Header;
