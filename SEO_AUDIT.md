# MyFixer SEO audit — 6 November 2026

## Scope and public-page inventory

The canonical indexable inventory is the 14 URLs in `public/sitemap.xml`: the home page, `/gallery`, `/blog`, eight appliance-service pages under `/services/`, and three appliance-repair location pages under `/locations/`. The repository contains no individual blog-article HTML files. `404.html`, shared components, verification files, APIs and assets are not indexable content pages.

## Verified findings

### Critical

None currently reproducible in production. Live checks on 6 November found the custom 404 body (not homepage content) with a 404 status for `/txets.php`, `/Jenkinsfile`, `/edit-account/`, `/images/` and `/pi`. `/txets.php` was visible in an older crawler snapshot as homepage content, so its index status must be checked again in Search Console after a later crawl.

### High priority

* The custom error document was directly reachable at `/404` with HTTP 200 and had no noindex directive. The template is now `noindex, follow` so a direct error-page URL cannot be indexed.
* Fridge structured data referenced `/img/fridge-repair.webp`, which does not exist in the repository. It now uses the real fridge image already used by the page.

### Medium priority

* The homepage description contained `On-Siterepair`; social/schema copy on two service pages repeated `On-Site, on-site`. These have been corrected without changing search intent.
* Service schema contains a `Services` breadcrumb item pointing to `/services/`, but no public services-hub page exists. Create a genuine hub or remove that intermediate schema crumb; do not redirect it to the homepage.
* LocalBusiness markup and visible contact content publish a street address. The owner must verify that it is a genuine customer-facing location before retaining it, since MyFixer is described as mobile service.

### Low priority / recommendations

* The site has no standalone advice articles despite a blog hub. Only create content the business can maintain; the best initial gaps are washing-machine drainage, fridge cooling and repair-versus-replace guidance.
* Use Lighthouse mobile and Search Console field data after deployment before making performance changes. No performance change was made without measured evidence.

## Validation evidence

* `robots.txt` preserves the stated policy: general crawl access, explicit OAI bot access, and GPTBot/Google-Extended blocks.
* Sitemap URLs use the preferred HTTPS WWW, extensionless convention and contain no non-canonical URL.
* Production checks: home and `/services/fridge-repair` returned 200; each cited unknown path returned 404; HTTP and non-WWW homepage variants resolved to `https://www.myfixer.co.za/`; the `.html` fridge URL resolved to its extensionless URL.
* Google indexing status, sitemap processing, Core Web Vitals and backlinks cannot be verified without Search Console and field/performance data.
