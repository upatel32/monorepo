/** Where the live resume lives. Used by the validate script now and by the page once it's wired up. */
export const RESUME_GIST_ID = '70c5be9edab15b2de790a960ef94eb76';
export const RESUME_GIST_USER = 'upatel32';
export const RESUME_GIST_FILE = 'resume.json';

/** Human-facing gist page. */
export const RESUME_GIST_URL = `https://gist.github.com/${RESUME_GIST_USER}/${RESUME_GIST_ID}`;

/** Latest raw file. Served from a CDN, so it can lag a few minutes behind an edit. */
export const RESUME_RAW_URL = `https://gist.githubusercontent.com/${RESUME_GIST_USER}/${RESUME_GIST_ID}/raw/${RESUME_GIST_FILE}`;

/** GitHub API endpoint: always fresh, but rate-limited to 60 requests/hour without a token. */
export const RESUME_API_URL = `https://api.github.com/gists/${RESUME_GIST_ID}`;
