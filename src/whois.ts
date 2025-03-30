/**
 * Get RDAP or WHOIS information for the current domain using ICANN's lookup
 * tool. Especially useful because the tool errors with "The value entered is
 * not valid" if the protocol (e.g. http://) is included in the URL.
 */
location.assign(`https://lookup.icann.org/whois?q=${location.hostname}`);
