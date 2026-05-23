import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

import { PROD } from "@/lib/constants";

import type { ReactElement } from "react";

/* ============================================================================================= */

export const GA4 = (): null | ReactElement => {
  //
  if (!PROD) {
    return null;
  }

  return <GoogleAnalytics gaId="G-QFX24FX5X6" />;
};

/* ============================================================================================= */

export const MSClarity = (): null | ReactElement<HTMLScriptElement> => {
  //
  if (!PROD) {
    return null;
  }

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
          c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
          t = l.createElement(r);
          t.async=1;
          t.src="https://www.clarity.ms/tag/"+i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "wf6b8hbm1j");
      `}
    </Script>
  );
};
