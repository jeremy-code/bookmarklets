/**
 * Given either a Reddit post a Reddit media URL, fetch the image or video
 * associated with the post and open it as a blob URL. This is useful since by
 * default, Reddit will redirect you to those URLs if you attempt to open any
 * media source URL on a browser.
 */

const SUBREDDIT_COMMENTS_PATH_REGEX =
  /^\/r\/[A-Za-z0-9][_A-Za-z0-9]{2,20}\/comments\//;

export type RedditApiResponse = [
  RedditApiResponsePostListing,
  {
    kind: "Listing";
    data: {
      after: null;
      before: null;
      dist: null;
      geo_filter: "";
      children: unknown[];
    };
  },
];

export interface RedditApiResponsePostListing {
  kind: "Listing";
  data: {
    after: null;
    before: null;
    modhash: string;
    geofilter: "";
    dist: 1;
    children: [
      {
        kind: "t3";
        data: RedditApiResponsePostData;
      },
    ];
  };
}

export interface RedditApiResponsePostData {
  is_reddit_media_domain: boolean;
  media: {
    reddit_video: {
      dash_url: string;
      fallback_url: string;
      height: number;
      width: number;
      scrubber_media_url: string;
      dash_manifest: string;
      duration: number;
    };
  } | null;
  url: string;
  is_video: boolean;
}

/**
 * For a `reddit.com/media?url=...` URL, fetch the image and open the response
 * in the current tab as a blob URL.
 */
const getRedditMedia = async () => {
  const imageUrl = new URL(window.location.href).searchParams.get("url");

  if (!imageUrl) {
    throw new Error(
      `No image URL found in query string ${window.location.href}`,
    );
  }

  const response = await fetch(imageUrl);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  window.open(URL.createObjectURL(await response.blob()));
};

/**
 * For a `reddit.com/r/.../comments/...` URL, fetch the post metadata and find
 * the image or video associated with the post. Then, fetch that media URL and
 * open the response in a new tab as a blob URL.
 */
const getRedditPostMedia = async () => {
  /**
   * Fetch data of the post using Reddit API's aliased `/.json` endpoint
   *
   * @see {@link https://www.reddit.com/dev/api#GET_comments_%7Barticle%7D}
   */
  const redditApiResponse = (await fetch(
    new URL("./.json?limit=1", window.location.href),
  ).then((response) => response.json())) as RedditApiResponse;

  const metadata = redditApiResponse[0].data.children[0].data;

  /**
   * For a `v.reddit.com` URL, parse the XML MPD manifest and return the URL of
   * the largest video
   */
  const getVideoUrl = async (metadata: RedditApiResponsePostData) => {
    const mpdUrl = metadata.media?.reddit_video.dash_url;

    if (!mpdUrl) {
      throw new Error("MPD URL not found in Reddit video metadata");
    }

    const document = new DOMParser().parseFromString(
      await (await fetch(mpdUrl)).text(),
      "text/xml",
    );

    const adaptationSet = document.querySelector(
      "AdaptationSet[contentType='video']",
    );

    if (adaptationSet === null) {
      throw new Error("Adaptation set not found");
    }

    const baseUrlElement =
      adaptationSet.querySelector(
        `Representation[height="${adaptationSet.getAttribute(
          "maxHeight",
        )}"] > BaseURL`,
      ) ?? adaptationSet.querySelector("Representation:last-of-type > BaseURL");

    const baseUrl = baseUrlElement?.textContent?.trim();

    return new URL(`./${baseUrl}`, mpdUrl);
  };

  if (!metadata.is_reddit_media_domain) {
    throw new Error("This is not a Reddit media domain URL.");
  }

  const response = await fetch(
    metadata.is_video ? await getVideoUrl(metadata) : metadata.url,
  );

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  window.open(URL.createObjectURL(await response.blob()), "_blank");
};

try {
  if (!window.location.hostname.endsWith("reddit.com")) {
    throw new Error("This is not a Reddit page.");
  }

  if (window.location.pathname === "/media") {
    /**
     * By default, `i.reddit.com` redirects to `/media` image viewer when the
     * "Accept" header is a browser default.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation/List_of_default_Accept_values#default_values}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation/List_of_default_Accept_values#values_for_an_image}
     */
    getRedditMedia();
  } else if (SUBREDDIT_COMMENTS_PATH_REGEX.test(window.location.pathname)) {
    getRedditPostMedia();
  } else {
    throw new Error("Reddit media not found");
  }
} catch (error) {
  if (error instanceof Error) {
    alert(`An error has occurred: ${error.message}`);
  }
}
