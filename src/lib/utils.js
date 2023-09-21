const auth = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const BASE_URL = "https://api.unsplash.com";

/**
 * Gets the first 20 images from Unsplash
 * @returns {Object} data
 */
export async function getUnsplashImages() {
  const res = await fetch(`${BASE_URL}/photos/`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${auth}`,
    },
  });

  const data = await res.json();

  return data;
}

/**
 * Searches for photos from Unsplash based on the search query
 * @param {string} query
 * @returns {Object} data
 */
export async function searchImages(query) {
  const res = await fetch(`${BASE_URL}/search/photos?page=1&query=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Client-ID ${auth}`,
    },
  });

  const data = await res.json();

  return data;
}

// console.log(searchImages("hello"));
