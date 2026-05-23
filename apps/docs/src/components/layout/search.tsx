"use client";

/* ============================================================================================= */

import { ChevronBarUpIcon } from "@icons";
import { useState, useEffect, startTransition, useRef } from "react";

import Button from "@/components/button";
import { DialogClose } from "@/components/dialog";
import Link from "@/components/link";
import List from "@/components/list";
import AlienLife from "@/components/loaders/alien-life";
import ZZZZ from "@/components/loaders/zzzz";
import Separator from "@/components/separator";
import useSearch from "@/hooks/use-search";
import debounce from "@/lib/debounce";

import type { ReactElement } from "react";

import type { SearchQueryResult } from "@/hooks/use-search";

/* ============================================================================================= */

const Search = (): ReactElement<HTMLDivElement> => {
  //
  const { initialize, ready, error, query } = useSearch();

  const [search, setSearch] = useState("");
  const [result, setResult] = useState<SearchQueryResult>();

  useEffect(() => {
    if (!ready) {
      // oxlint-disable typescript/no-floating-promises
      initialize();
    }
  }, [ready, initialize]);

  const handleSearch = (text: string) => {
    setSearch(text);
    setResult(undefined);

    startTransition(() => {
      //
      debounce(() => {
        const fn = async () => {
          const queryResult = await query(text);
          setResult(queryResult);
        };
        // oxlint-disable typescript/no-floating-promises
        fn();
      });
    });
  };

  return (
    <div className="search">
      {/*  */}
      <CloseButton />

      <SearchInput ready={ready} search={search} handleSearch={handleSearch} />

      {error && <SearchError message={error.message} />}

      {!error && result ? (
        <Result result={result} />
      ) : (
        /* show loader when result is not available */
        <div className="search-loader__wrapper">
          <Loaders search={search} ready={ready} />
        </div>
      )}
    </div>
  );
};

/* ============================================================================================= */

interface SearchErrorOptions {
  message: string;
}

const SearchError = ({ message }: SearchErrorOptions): ReactElement<HTMLDivElement> => (
  <div className="search-error">
    <p className="search-error__message">{message || "Something went wrong!"}</p>
  </div>
);

/* ============================================================================================= */

interface SearchInputProps {
  ready: boolean;
  search: string;
  handleSearch: (text: string) => void;
}

const SearchInput = ({
  ready,
  search,
  handleSearch,
}: SearchInputProps): ReactElement<HTMLDivElement> => {
  //
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ready) {
      inputRef.current?.focus();
    }
  }, [ready]);

  return (
    <div className="search__input">
      <input
        type="text"
        name="search"
        ref={inputRef}
        placeholder="Search docs..."
        autoComplete="off"
        disabled={!ready}
        value={search}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
      />
    </div>
  );
};

/* ============================================================================================= */

interface ResultProps {
  result?: SearchQueryResult;
}

const Result = ({ result }: ResultProps): ReactElement<HTMLDivElement> => (
  <div className="search-result">
    {/*  */}

    <div className="search-result__states">
      <span>
        Found {result?.count ?? 0} results in {((result?.time ?? 0) / 10).toFixed(2)} seconds
      </span>{" "}
      <br />
      <span>Search isn&apos;t perfect. some results may be unrelated.</span>
    </div>

    <Separator />

    <div
      className="search-result__container scroll-fade"
      data-search-empty={result?.count === 0 ? true : undefined}
    >
      {/* no content message */}
      {result?.count === 0 && <p>Data not available.</p>}

      {/* result list */}
      {(result?.count ?? 0) > 0 && (
        <List unstyled>
          {result?.data?.map((data) => (
            /* oxlint-disable typescript/no-unsafe-assignment */
            <li key={data.id}>
              <DialogClose isWrapper hideFocus>
                {/* oxlint-disable typescript/no-unsafe-assignment */}
                <Link href={data.url} title={data.title}>
                  <span className="link__label">{data.metaTitle ?? data.label}</span>
                  <span className="link__url">{data.url}</span>
                  <span className="link__confidence">Confidence: {data.score.toFixed(2)}%</span>
                </Link>
              </DialogClose>
            </li>
          ))}
        </List>
      )}
    </div>
  </div>
);

/* ============================================================================================= */

const CloseButton = (): ReturnType<typeof DialogClose> => (
  <DialogClose hideCloseButton={false} render={<Button variant="ghost" />}>
    <ChevronBarUpIcon />
    <span className="screen-reader">close search popup</span>
  </DialogClose>
);

/* ============================================================================================= */

interface LoadersProps {
  ready: boolean;
  search: string;
}

const Loaders = ({ search, ready }: LoadersProps) => {
  //

  /* 1. no input */
  if (!search.trim() && ready) {
    return <ZZZZ />;
  }

  /* 2. fetching search index or results */
  return <AlienLife />;
};

/* ============================================================================================= */

export default Search;
