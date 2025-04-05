/**
 * In a new tab, opens the RDAP or WHOIS information for the current domain
 * using ICANN's lookup tool. Especially useful because the tool errors with
 * "The value entered is not valid" if the protocol (e.g. http://) is included
 * in the URL. Also, it works on `about:newtab` to directly open
 * lookup.icann.org.
 */
window.open(`https://lookup.icann.org/whois?q=${location.hostname}`, "_blank");
