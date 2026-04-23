import { useEffect, useState } from "react";

export function useDomain() {
  const [domain, setDomain] = useState("webseitig.ch");

  useEffect(() => {
    const hostname = window.location.hostname.toLowerCase();
    if (hostname.includes("webseitig.de") || hostname.includes("web-seitig.de")) {
      setDomain("webseitig.de");
    } else if (hostname.includes("webseitig.ch") || hostname.includes("web-seitig.ch")) {
      setDomain("webseitig.ch");
    }
  }, []);

  const contactEmail = `hello@${domain}`;
  const contactUrl = `https://${domain}`;
  const businessTerm = domain === "webseitig.de" ? "unternehmen" : "KMU";

  return {
    domain,
    contactEmail,
    contactUrl,
    businessTerm,
  };
}