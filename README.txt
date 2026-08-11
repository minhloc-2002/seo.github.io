minhloc — GITHUB PAGES BLOG TEMPLATE
============================================================

This ZIP is ready to upload to the ROOT of a GitHub Pages repository.
After extraction, index.html must be at repository root (do not upload an extra minhloc/ wrapper folder).

DEFAULT TEST TARGET
-------------------
Owner: minhloc-2002
Repository: seo.github.io
Base URL: https://minhloc-2002.github.io/seo.github.io/

QUICK DEPLOY
------------
1. Extract the ZIP.
2. Upload every extracted file/folder to the root of the main branch.
3. In GitHub: Settings > Pages > Build and deployment.
4. Choose “Deploy from a branch”, then main and / (root), and Save.
5. Wait for Pages to publish, then open the Base URL above.

CONFIGURATION TO CHANGE WHEN THE REPOSITORY CHANGES
----------------------------------------------------
A) File: config.js
   Line 2 — owner
   Current: owner: "minhloc-2002",
   Change to: owner: "YOUR_GITHUB_USERNAME",

   Line 3 — repository
   Current: repository: "seo.github.io",
   Change to: repository: "YOUR_REPOSITORY_NAME",

   Line 4 — published Pages URL (must end with /)
   Current: baseUrl: "https://minhloc-2002.github.io/seo.github.io/",
   Change to: baseUrl: "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/",

   Line 5 — optional subfolder path
   Current: pathPrefix: "",
   Keep empty when this template is uploaded to repository root.
   For a subfolder test, change to: pathPrefix: "minhloc",

   Line 7 — planned standalone repository
   Current: futureRepository: "minhloc.github.io",
   Change only if you choose a different final repository name.

B) File: agent/publish-config.json
   Line 3 — owner
   Current: "owner": "minhloc-2002",
   Change to your GitHub username.

   Line 4 — repository
   Current: "repository": "seo.github.io",
   Change to the active repository name.

   Line 6 — site URL
   Current: "siteUrl": "https://minhloc-2002.github.io/seo.github.io/",
   Change to the exact Pages URL and keep the trailing slash.

   Line 7 — optional base path
   Current: "basePath": "",
   Keep empty for repository root. Use "minhloc" only when testing in that subfolder.

TESTING ALL FIVE TEMPLATES IN ONE REPOSITORY
---------------------------------------------
If you place this whole template in /minhloc/ inside seo.github.io:
1. Change config.js line 4 to:
   baseUrl: "https://minhloc-2002.github.io/seo.github.io/minhloc/",
2. Change config.js line 5 to:
   pathPrefix: "minhloc",
3. Change agent/publish-config.json line 6 to the same URL.
4. Change agent/publish-config.json line 7 to:
   "basePath": "minhloc",
5. Visit:
   https://minhloc-2002.github.io/seo.github.io/minhloc/

FUTURE STANDALONE REPOSITORY
----------------------------
Suggested repository: minhloc.github.io
Suggested Pages URL under the current owner:
https://minhloc-2002.github.io/minhloc.github.io/

Update the two configuration files listed above. No HTML, CSS or JavaScript path changes are required because all browser assets use relative paths.

CONTENT AND AGENT ENTRY POINTS
------------------------------
data/profile.json             Visible identity and biography data.
data/articles.json            Article list and article body data used by the site.
data/research.json            Research/projects data entry point.
agent/profile.json            Agent voice, expertise, audience and review rules.
agent/content-schema.json     JSON Schema for future generated articles.
agent/content-plan.json       Suggested content lanes and cadence.
agent/publish-config.json     Repository and Pages publishing target.
agent/writing-style.json      Editorial rules and prohibited claims.
agent/workflows/agent-publish.yml.example
                              Example future workflow (inactive until moved to .github/workflows/ and reviewed).

EDITING ARTICLES
----------------
Edit data/articles.json and keep every id unique. article.html reads the id query parameter, for example:
article.html?id=rates-explained

IMPORTANT
---------
- Use a web server or GitHub Pages for testing; browsers block JSON fetches when index.html is opened directly as file://.
- Keep the trailing slash on baseUrl/siteUrl.
- The included content is educational and must not be presented as investment advice.
- No external framework, package install, build command or database is required.
