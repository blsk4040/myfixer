# MyFixer ranking-improvement audit

**Prepared:** 6 November 2026  
**Scope:** Organic local-search opportunity audit only. No site files or configuration were changed.  
**Business model applied:** MyFixer is a mobile, on-site appliance-repair service; recommendations do not assume a walk-in workshop.

## 1. Executive summary

The most important constraint on this audit is missing Google Search Console (GSC) data. No CSV, XLS/XLSX or TSV Search Console export was found in the project. Therefore no conclusion below claims that MyFixer ranks for, receives impressions for, loses traffic from, or cannibalises a particular query. Those findings are **unverified until GSC data is supplied**.

The site has a sound core structure: a focused homepage, eight appliance service pages and three canonical city pages. The prior technical audit found no currently reproducible unknown-URL routing problem and confirmed canonical/redirect consistency. The practical ranking opportunity is not a broad expansion of city/suburb pages. It is to make the existing highest-commercial-intent pages more useful at the moment a customer needs to book a mobile technician, then validate the priorities with GSC.

Current live-result observations show competitors repeatedly provide: appliance/location-specific pages, fault-specific practical guidance, a clear diagnostic and approval process, and concrete booking details. MyFixer already has service-specific pages and an on-site proposition; its strongest likely candidates for measured optimisation are its Centurion appliance-repair location page plus washing-machine and fridge-repair services. This is a hypothesis, not an observed MyFixer performance result.

## 2. Data sources and reporting periods

| Source | Availability | Used for | Limitation |
|---|---:|---|---|
| Repository and live MyFixer site | Available | Site structure, metadata, service positioning and previous verified technical findings | Does not reveal Google demand or MyFixer rankings |
| `SEO_AUDIT.md` | Available | Existing technical findings and validation context | Not a ranking/performance report |
| Google Search Console exports | **Not supplied** | Required for clicks, impressions, CTR, average position, country/device/page/query changes | No three-month comparison can be calculated |
| Public web search research, 6 Nov 2026 | Available | Examples of pages surfaced for target queries and observable page features | Search results are personalised, location/device/time dependent; this is not a precise rank tracker |

### Required GSC exports before performance prioritisation

Export two complete, non-overlapping 3-month periods, most recent first, from **Search results**. Use Web search type and export CSV or Google Sheets/Excel.

| Export | Filter/settings | Required dimensions and metrics |
|---|---|---|
| Query performance | Search type: Web; dates: latest complete 3 months and preceding 3 months | Query, Clicks, Impressions, CTR, Position |
| Page performance | Same periods | Page, Clicks, Impressions, CTR, Position |
| Query × page | Same periods; use a query filter for priority appliances if row limits apply | Query, Page, Clicks, Impressions, CTR, Position |
| Country | Same periods; country = South Africa and all countries | Country, Clicks, Impressions, CTR, Position |
| Device | Same periods | Device, Clicks, Impressions, CTR, Position |
| Country × device | South Africa | Device, Clicks, Impressions, CTR, Position |

Also supply the Search Console **Pages indexing** and **Sitemaps** exports/screenshots after the next deployment, plus any existing keyword/rank-tracker report. Never merge a partial current period with a completed comparison period.

## 3. Existing site: observed position and page intent

| Page group | Observed intent and strengths | Ranking relevance / caveat |
|---|---|---|
| Homepage | Broad on-site appliance repair across Centurion, Pretoria and Johannesburg; prominent call/WhatsApp/booking actions; links to services | Appropriate broad entry point. It should not be expanded to target every appliance-plus-suburb combination. |
| Fridge repair | Fridge/refrigerator/freezer faults, including cooling, leaks, defrost and compressor-related issues | Good appliance intent. Strong candidate for GSC review against “fridge repair” and “not cooling” query impressions. |
| Washing machine repair | Spin, drainage, leaks, water supply, motor/pump/electrical/door/control faults | Good commercial intent and useful fault coverage. Strong candidate for GSC review. |
| Dishwasher, microwave, oven/stove, TV, coffee-machine, HVAC | One appliance/service intent each, unique canonical URLs and page metadata | Retain distinct pages. Do not infer their priority without GSC evidence. |
| Centurion, Pretoria, Johannesburg pages | City-specific mobile/on-site appliance repair positioning | Appropriate limited location architecture. No pages exist for Midrand, Sandton, Randburg, Roodepoort or Fourways; do not create them solely from a keyword list. |
| Blog | A hub is present, but no individual article HTML pages were found | A genuine informational-content gap, but article investment needs query evidence and operational ownership. |

### Existing technical context retained

The prior audit confirmed extensionless canonical URLs, sitemap consistency and working live 404s for the previously reported suspicious paths. Its unresolved technical item is a schema breadcrumb that references `/services/`, although no actual public services hub exists. This is a structured-data/information-architecture decision, not evidence of a ranking loss.

## 4. Search Console performance findings

**Unavailable.** No GSC exports were found, so the following cannot be calculated:

* highest-impression, low-CTR queries;
* queries in positions 5–20 or 20–50;
* branded versus non-branded performance;
* query/page cannibalisation;
* three-month clicks, impressions, CTR and position changes;
* South Africa-only visibility; and
* mobile versus desktop performance.

### Analysis method once data is available

1. Separate brand variants (`myfixer`, phone number, domain) from non-brand queries.
2. Prioritise non-brand commercial queries with material impressions, positions 5–20, and CTR below the query-position peer group.
3. Investigate 20–50 only where the query closely matches an existing service/location page and an observed competitor page is more relevant.
4. Flag one query shown by more than one MyFixer URL at meaningful impressions as possible cannibalisation; compare intent before consolidating anything.
5. Compare South Africa/mobile performance to all-country/desktop performance, rather than assuming the aggregate represents the local mobile market.

## 5. Live competitor comparison (observed, not a rank order)

Search result providers do not expose a stable, location-neutral full SERP in this audit. “Appeared in public search results” below is deliberately not called a position or a claim that it outranks MyFixer.

| Query researched | Competitor page observed | Observable approach | Useful implication for MyFixer |
|---|---|---|---|
| Appliance repair Centurion | [Absolute Repairs – Centurion](https://absoluterepairs.co.za/appliance-repair-centurion) | Appliance-and-city landing page; lists specific suburbs, booking methods, diagnosis/call-out details and fault/brand sections | Strengthen only verified MyFixer booking/process information on its Centurion page; do not copy unverified prices, years, warranties or service promises. |
| Appliance repair Centurion | [MasterCare – Centurion](https://www.mastercare.co.za/appliance-repair-in-centurion/) | Location page with a defined service centre, coverage and booking options | MyFixer should emphasise the contrasting but valid mobile model: technicians travel to the customer. It must not imply a service centre. |
| Fridge repair Centurion | [CMB Appliance Repairs](https://cmbappliancerepairs.co.za/fridge-repairs-centurion/) | Fault-specific FAQ, service-area statement, direct call/WhatsApp and booking explanation | MyFixer fridge page can improve practical pre-booking guidance and fault-to-diagnosis explanation if operationally accurate. |
| Fridge repair Centurion | [Topworks Fridge Repair](https://fridgerepairexpert.co.za/fridge-repairs-centurion/) | On-site positioning, form fields for brand/model/fault/location, access-preparation checklist | The MyFixer booking form/process can request model, symptom and access details more explicitly if its workflow supports it. |
| Washing machine repair Pretoria/Centurion | [Absolute Repairs – Washing Machine](https://absoluterepairs.co.za/washing-machine-repair-pretoria) | Appliance-specific fault guidance, model type detail, simple checks and a clear booking brief | MyFixer can make its existing washing-machine fault sections more decision-useful: drainage, spin, leak, fill, door/error code, and what information to send. |
| Washing machine repair Centurion | [Best Appliances](https://www.bestappliances.co.za/washing-machine-repairs-centurion) | Centurion sub-area detail and practical explanations of fault causes | Add local detail only where genuinely served; concise, specific guidance beats a list of unverified suburbs. |
| Dishwasher repair Johannesburg | [Fridge Man – Dishwasher Repairs](https://fridgeman.co.za/dishwasher-repairs/) | Clear common-fault list, appliance scope, four-step on-site process and FAQs | This validates the value of MyFixer clearly explaining diagnosis, quote approval and on-site completion “where practical.” |
| Appliance repair Pretoria/Centurion | [Pretoria Appliances Repair](https://pretoriaappliancesrepair.co.za/) | Broad residential/commercial positioning, hours, address, stated experience and service categories | MyFixer should compete on accurate mobile convenience and service clarity, not add commercial claims or credentials without evidence. |

### Observed competitor strengths

* Pages closely match an appliance-plus-location or appliance-plus-fault intent.
* Booking copy explains what information is needed, what happens during diagnosis, and when a quote is approved.
* Several surface concrete trust details (hours, prices, guarantees, experience, premises). These are **their claims**, not claims MyFixer should adopt.
* Stronger examples use useful fault/diagnostic detail rather than just repeating city names.

## 6. Page-by-page opportunity assessment

| MyFixer page | Current intended query family | What works | Evidence-led opportunity | Recommendation status |
|---|---|---|---|---|
| `/` | Appliance repair + core cities | Clear on-site positioning, services and booking actions | Avoid dilution. Use GSC to determine whether title/snippet CTR is weak before changing metadata. | Measure first |
| `/locations/appliance-repair-centurion` | Appliance repair Centurion | Direct city intent; genuine page already exists | Competitor pages observed for this query give a clearer booking brief and more useful on-site process detail. Confirm actual service coverage, then improve those sections. | High, conditional on GSC/local operations confirmation |
| `/services/fridge-repair` | Fridge repair; cooling/freezer faults | Specific fridge/fault coverage and correct canonical | Competitors emphasise “not cooling,” model/symptom preparation and diagnosis. Compare GSC query terms before adding sections or changing title. | High, conditional on GSC |
| `/services/washingmachine-repair` | Washing-machine repair; drain/spin/leak faults | Strong fault coverage already | Competitors provide clearer user actions/pre-booking details. GSC should decide whether a drainage-focused article or on-page FAQ is warranted. | High, conditional on GSC |
| `/locations/appliance-repair-pretoria` | Appliance repair Pretoria | City-specific intent, avoids a proliferation of suburbs | Review with GSC separately from Centurion: they are adjacent but not automatically interchangeable intents. | Medium, measure first |
| `/locations/appliance-repair-johannesburg` | Appliance repair Johannesburg | Separate location page | Confirm actual coverage and lead quality; do not add unsupported suburb lists. | Medium, measure first |
| Dishwasher, oven/stove, microwave, coffee machine, TV, HVAC | Respective service intent | Dedicated, non-duplicated URLs | No performance evidence identifies one as weak. Maintain; review only when query/page report identifies opportunity. | No change yet |
| `/blog` | Informational troubleshooting | Relevant hub but no article pages | A single article can be justified only if GSC reveals recurring non-brand question impressions or customer-support demand. | Medium research opportunity |

### Cannibalisation

**Unverified.** Site architecture shows sensible separation: broad homepage, distinct appliance pages and three city pages. Likely overlap exists only at a normal level (for example, homepage and Centurion page both mention appliance repair). No action should be taken without GSC query × page data demonstrating material overlap and a weaker user landing experience.

## 7. Local SEO and trust

| Area | Current position | Opportunity | Guardrail |
|---|---|---|---|
| Centurion | Dedicated location page; primary positioning | Highest logical local page to validate first because it is the base area described in site content | Confirm every named suburb/coverage statement operationally |
| Pretoria | Dedicated location page | Tailor practical on-site booking/service-area explanation if GSC supports demand | Do not imply a Pretoria premises |
| Johannesburg | Dedicated location page | Validate area demand and lead quality before expanding local copy | Do not imply a Johannesburg office |
| Midrand, Sandton, Randburg, Roodepoort, Fourways | Mentioned service areas, no dedicated pages | Use GBP/service-area accuracy, consistent NAP/contact data and selective genuine local partnerships | Do not create near-duplicate suburb pages |

**Trust priority:** confirm whether the published street address is a genuine customer-facing address. If it is not, remove/adjust it consistently in the website and Google Business Profile under a separately approved implementation task. A mobile service business should accurately configure its service area rather than simulate a walk-in location.

## 8. Prioritised action plan

### A. Existing-page relevance

| Priority | Pages | Evidence | Exact improvement | Benefit / effort / risk |
|---|---|---|---|---|
| High | Centurion, fridge, washing machine | Relevant competitor pages use fault-specific guidance and a clear diagnostic/booking process; MyFixer GSC data is still required | After GSC validation, add only truthful, page-specific “what to send when booking,” diagnostic process, and common-fault explanation. | Better intent match and qualified enquiries; medium effort; operational claims require approval. |
| Medium | Pretoria/Johannesburg | Separate city pages already exist; no city-specific performance data | Improve only if GSC shows non-brand impressions and weak CTR/relevance. | Potential relevance/CTR gain; low–medium effort; risk of duplication if copied. |
| Low | All other service pages | No evidence identifies a deficit | Preserve rather than bulk-rewrite. | Avoids dilution; no current effort. |

### B. CTR improvements

| Priority | Pages | Evidence | Exact improvement | Benefit / effort / risk |
|---|---|---|---|---|
| High | Pages with GSC positions 5–20 and low CTR | GSC required | Test title/description only where a page underperforms its actual query set. Keep mobile/on-site proposition and appliance/location intent accurate. | Higher qualified click-through; low effort; avoid changing successful snippets blindly. |

### C. Internal linking

| Priority | Pages | Evidence | Exact improvement | Benefit / effort / risk |
|---|---|---|---|---|
| Medium | Homepage, location pages, service pages | Existing architecture has service and city pages; prior audit found no broken local links | Add contextual links only where a visitor benefits: Centurion → key repair services; appliance pages → relevant city pages; future articles → matching service page. | Clearer discovery/context; low effort; do not over-link identical anchors. |
| Medium | Service-page schema | Prior audit: non-existent `/services/` breadcrumb schema item | Choose either a real services hub or removal of the intermediate breadcrumb. | Cleaner structured data; requires architecture decision. |

### D. Local SEO and trust

| Priority | Pages/systems | Evidence | Exact improvement | Benefit / effort / risk |
|---|---|---|---|---|
| High | Google Business Profile and site contact data | Mobile business model; published address needs verification | Owner verifies business name, phone, email, service areas, address visibility and booking URL; align only verified facts. | Local trust/eligibility consistency; low effort; incorrect address is a material risk. |
| Medium | GBP/reviews | Competitors visibly surface trust details | Maintain an ethical review-request process after completed jobs and respond to reviews. Do not add review schema without compliant, visible evidence. | Better local conversion/trust; ongoing operational effort. |

### E. New content, only if justified

| Priority | Candidate | Triggering evidence required | Scope |
|---|---|---|---|
| Medium | “Why is my washing machine not draining?” | GSC question-query impressions, internal support demand or booked-job pattern | Safety-aware troubleshooting, when to stop using the appliance, what information to provide, natural link to washing-machine repair. |
| Medium | “Why is my fridge not cooling?” | Same evidence | Explain symptoms and diagnosis boundaries without promising refrigerant/repair outcomes. |
| Low | Repair-versus-replace guide | Repeated query/support demand | Neutral decision factors; no fabricated pricing or lifespan claims. |

### F. External links and partnerships

| Priority | Opportunity | Evidence / guardrail |
|---|---|---|
| Medium | Genuine referral relationships with appliance parts suppliers, property managers and local business associations | Pursue only where an actual business relationship exists and a listing/editorial mention is natural. |
| Low | Existing directories | Audit and correct existing listings first; avoid mass submissions, paid schemes and automated backlink services. |

## 9. Five immediate next actions

1. Export and provide the six GSC data sets listed in section 2 for the latest complete three months and the preceding three months.
2. Verify Google Business Profile/service-area and address representation against the mobile, on-site business model.
3. Use the GSC query × page report to select **one** of Centurion, fridge, or washing-machine page for first optimisation—based on commercial impressions, position and CTR, not intuition.
4. Compare that chosen page against the relevant observed competitor page for booking clarity, fault information and on-site process; approve only accurate additions.
5. Decide whether a genuine services hub is useful. If not, schedule the narrow schema breadcrumb cleanup separately.

## 10. Limitations and what would change the conclusions

* This audit cannot state which MyFixer pages have the strongest organic opportunity without GSC data.
* It does not have access to Google Business Profile insights, Search Console, competitor analytics, backlink profiles, review platforms or private customer data.
* Competitor observations are public-page facts seen in current search research; they are not verification of competitors’ operational claims, rankings, conversions or authority.
* Results may vary by searcher location, device and time. A local rank tracker configured from Gauteng grid points would complement—not replace—GSC.
* No implementation is authorised or included in this report.

---

## Addendum — supplied Search Console query export analysed 7 November 2026

### Data received and limitations

`Queries.csv` was supplied from the owner’s local Search Console export. It contains **781 query rows** with Clicks, Impressions, CTR and Position. It does **not** identify the selected date range, country, device, search type beyond the export context, or landing page. Consequently, this section is genuine query evidence, but it cannot yet assign a query to a MyFixer page or prove page-level cannibalisation. A Page export and Query × Page export remain required before implementation.

### What the query data actually shows

* MyFixer has substantial non-brand impressions across core appliance terms, but most generic terms sit far below page one. This is a relevance/competitive gap, not a low-CTR snippet problem alone.
* The strongest immediate non-brand opportunities are queries already near page one or page two: `appliance repair centurion` (74 impressions, position 13.69), `microwave repairs centurion` (23, 8.74) and `coffee machine repairs centurion` (18, 8.83).
* Branded visibility has a conversion/snippet issue: `my fixer` has 728 impressions, position 6.34 and 0.55% CTR; `myfixer` has 115 impressions, position 5.10 and 2.61% CTR. This needs an actual branded-SERP and landing-page check, not keyword stuffing.
* Certain terms are likely navigational for other businesses or otherwise ambiguous—for example `the oven repair man` (453 impressions, position 29.82) and `fine appliance repair` (156, position 47.84). They must not drive MyFixer content decisions until the exact SERP and intent are checked.

### Query opportunities mapped to existing pages (provisional until Page export)

| Priority | Existing page most likely relevant | Query | Clicks | Impressions | CTR | Avg. position | Interpretation and next approved optimisation target |
|---|---|---:|---:|---:|---:|---:|---|
| High | `/locations/appliance-repair-centurion` | appliance repair centurion | 0 | 74 | 0% | 13.69 | Closest realistic page-one opportunity. Confirm this landing page in Query × Page, then improve only accurate Centurion on-site booking/process and coverage information. |
| High | `/services/microwave-repair` | microwave repairs centurion | 2 | 23 | 8.70% | 8.74 | Already page-one average. Protect relevance; inspect actual landing page and CTR before changing title/H1. |
| High | `/services/coffeemachine-repair` | coffee machine repairs centurion | 1 | 18 | 5.56% | 8.83 | Already page-one average. Validate the landing page, then improve conversion clarity rather than expand into unsupported commercial claims. |
| High | `/services/microwave-repair` | microwave service | 0 | 431 | 0% | 27.10 | Strong demand at roughly page three. Compare search intent/landing URL before adding service/diagnostic language. |
| High | `/services/microwave-repair` | microwave repair | 0 | 583 | 0% | 33.78 | Significant opportunity, but not a rapid page-one claim. Improve only after seeing its actual landing page and desktop/mobile split. |
| High | `/services/washingmachine-repair` | washing machine repair | 1 | 686 | 0.15% | 43.15 | Largest measured core-service opportunity. Needs page-level and competitor review; likely longer-term than Centurion/local terms. |
| High | `/services/dishwasher-repair` | dishwasher repair | 0 | 671 | 0% | 40.72 | High demand, weak average position. Confirm intent and landing page before content changes. |
| High | `/services/fridge-repair` | refrigerator repair | 0 | 530 | 0% | 44.18 | High demand but weak rank. The existing page covers fridge/refrigerator/freezer; use query-page data to verify it is selected. |
| Medium | `/services/stove-oven-repair` | stove repair | 0 | 457 | 0% | 47.55 | High demand but competitive. Do not target the competitor-like navigational query `the oven repair man` as a core keyword. |
| Medium | `/services/tv-repair` | tv repair centurion | 0 | 101 | 0% | 26.35 | Page-three opportunity; assess page assignment and local intent before adding location copy. |
| Medium | `/services/dishwasher-repair` | dishwasher repair centurion | 0 | 91 | 0% | 27.57 | Reasonable local page-three opportunity; existing service page likely has the correct primary intent. |
| Medium | `/services/coffeemachine-repair` | coffee machine repair | 1 | 23 | 4.35% | 25.00 | Borderline page-three opportunity; preserve successful Centurion-local relevance while evaluating generic query alignment. |

### Service keyword clusters from the supplied export

| Existing service page | Primary measured commercial terms | Supporting measured terms | Current evidence-based priority |
|---|---|---|---|
| Washing machine repair | washing machine repair (686 / 43.15); washing machine repair man (252 / 33.67) | washing machine repair centurion (128 / 32.16); washing machine repairs centurion (86 / 41.79); washing machine repair johannesburg (79 / 51.94) | High: large demand, mostly page 3–5 |
| Dishwasher repair | dishwasher repair (671 / 40.72); dishwasher repairs (133 / 46.73) | dishwasher repair centurion (91 / 27.57); Pretoria (80 / 48.71); Johannesburg (59 / 44.17) | High: large demand, page 3–5 |
| Fridge repair | refrigerator repair (530 / 44.18); freezer repairs (387 / 54.04); fridge repair (323 / 51.83) | fridge repair guy (284 / 46.36); fridge repair man (162 / 43.92); fridge repairs centurion (118 / 52.04) | High: large demand, mostly page 4–6 |
| Microwave repair | microwave repair (583 / 33.78); microwave service (431 / 27.10) | microwave repairs centurion (23 / 8.74); microwave repair near me (20 / 36.90) | High: protect local page-one query; improve generic relevance carefully |
| Stove & oven repair | stove repair (457 / 47.55); oven repairs (215 / 52.86); oven repair (107 / 47.01) | oven repairs centurion (90 / 41.84); oven repair man near me (81 / 26.38) | Medium: large demand but intent/SERP needs careful review |
| TV repair | tv repair (132 / 44.48) | tv repair centurion (101 / 26.35); tv repair Pretoria (81 / 34.05) | Medium |
| Coffee machine repair | coffee machine service (81 / 46.83); coffee machines repairs (62 / 41.48) | coffee machine repairs centurion (18 / 8.83) | Medium: protect local result first |
| HVAC / aircon | aircon repair centurion (86 / 44.03) | air conditioning repair (37 / 51.03); hvac repair (24 / 28.54) | Medium: do not expand service claims without operational confirmation |

Values are formatted as **impressions / average position** in this table. Position is an aggregate average, not a fixed Google rank.

### Revised five immediate actions

1. Export **Pages** and **Queries × Pages** for the same exact date range as `Queries.csv`; this is essential to assign the measured opportunities to an actual URL.
2. Validate and improve `/locations/appliance-repair-centurion` first only if the page report confirms it is the main landing page for `appliance repair centurion`.
3. Protect existing local winners: do not rewrite the microwave or coffee-machine pages until the page report confirms which URL ranks for their Centurion queries and whether CTR/conversion is a problem.
4. Prioritise a measured content-and-competitor gap review for washing-machine, dishwasher and fridge pages; these hold the highest generic impression volume but average positions around 40–44 or worse.
5. Inspect branded queries (`my fixer`, `myfixer`) in a Gauteng mobile/incognito SERP and GSC page report to diagnose the unusual low CTR before changing branded metadata.

---

## Addendum — supplied Search Console Page export analysed 7 November 2026

### Data received and limitations

`Pages.csv` was supplied for the same export set. It contains **20 URL rows** with Clicks, Impressions, CTR and Position, but no stated date range, country/device segmentation or query-to-page relationship. It confirms URL-level visibility; it does not prove which individual query generated each URL’s impressions. A Query × Page export remains required before editing a page for a specific query.

### Page performance: actual measured opportunities

| Priority | Canonical MyFixer page | Clicks | Impressions | CTR | Avg. position | Evidence-based interpretation |
|---|---|---:|---:|---:|---:|---|
| High | `/` | 25 | 4,168 | 0.60% | 23.33 | The largest visibility source and nearest broad opportunity. Assess the actual high-impression query mix before changing the homepage; it must remain broad, not become an appliance-keyword list. |
| High | `/services/fridge-repair` | 0 | 2,857 | 0% | 50.98 | Highest-impression service page and weakest performance among core pages. The query export supports fridge/refrigerator demand, but Query × Page must confirm matching before content work. |
| High | `/locations/appliance-repair-johannesburg` | 0 | 2,550 | 0% | 47.80 | Substantial visibility with no clicks. Review location-specific queries and operational service coverage; do not add unsupported Johannesburg suburb claims. |
| High | `/services/stove-oven-repair` | 1 | 1,604 | 0.06% | 43.44 | Strong impression volume around stove/oven demand but below page four. Requires specific intent/SERP gap review, not generic copy expansion. |
| High | `/locations/appliance-repair-centurion` | 0 | 1,485 | 0% | 54.62 | Poor aggregate page average despite the query-level `appliance repair centurion` position of 13.69. This strongly demonstrates why Query × Page is needed: broad/irrelevant terms may be depressing the page average. |
| High | `/locations/appliance-repair-pretoria` | 1 | 1,399 | 0.07% | 49.66 | High visibility with weak ranking/clicks. Confirm query mix and genuine coverage before any local-content improvement. |
| High | `/services/dishwasher-repair` | 0 | 1,343 | 0% | 43.31 | Measured service opportunity consistent with the high-demand dishwasher query cluster. |
| High | `/services/microwave-repair` | 0 | 1,202 | 0% | 31.66 | Best-performing high-impression service page by average position, but still no clicks. Protect the documented Centurion query winner while diagnosing generic terms. |
| High | `/services/washingmachine-repair` | 1 | 1,187 | 0.08% | 49.12 | Measured high-demand opportunity; query export confirms 686 impressions for the generic core term. |
| Medium | `/services/tv-repair` | 0 | 817 | 0% | 27.70 | Page-three average and the strongest non-microwave service-page position. Confirm the query mix, especially Centurion/Pretoria terms, before revision. |
| Medium | `/services/coffeemachine-repair` | 3 | 586 | 0.51% | 28.96 | Receives the most service-page clicks and has a local page-one query. Improve carefully; avoid disrupting the existing local match. |
| Medium | `/services/hvac-repair` | 0 | 498 | 0% | 46.21 | Visibility exists, but service availability/claims must be confirmed before expansion. |
| Low | `/gallery` | 0 | 121 | 0% | 27.30 | Not a primary lead-generation page; do not prioritise ahead of service pages. |
| Low | `/blog` | 0 | 38 | 0% | 18.37 | Too little visibility to justify content expansion without a query/demand case. |

### Key interpretation

The Page report confirms a real site-wide pattern: MyFixer is being shown for appliance repair searches but nearly all high-impression service and location pages have an average position beyond page three and practically no clicks. The homepage has the clearest potential for a measured CTR/relevance review because it averages position 23.33 across 4,168 impressions. The core service pages require a page-specific content/SERP comparison after the query-page relationship is available.

It also shows why page averages must not be treated as a single keyword rank. The Centurion page averages 54.62 across all its impressions while `appliance repair centurion` averages 13.69 in the query report. Both values can be true because they measure different query sets.

### Legacy/non-canonical URLs surfaced by Search Console

| URL in Page export | Search Console data | Live check, 7 Nov 2026 | Required action |
|---|---:|---|---|
| `https://myfixer.co.za/` | 2 clicks / 54 impressions / position 4.41 | 301 to `https://www.myfixer.co.za/` | Redirect is correct. Inspect canonical status in Search Console; no new redirect required. |
| `/services/coffeemachinerepair` | 1 click / 1 impression / position 1 | 301 to `/services/coffeemachine-repair` | Existing legacy redirect is correct. Do not change it. |
| `/services/coffeemachine-repair.html` | 0 clicks / 1 impression / position 2 | 301 to canonical extensionless URL | Existing extensionless redirect is correct. Do not change it. |
| `/microwave-repair` | 0 clicks / 3 impressions / position 8 | 301 to `/services/microwave-repair` | Existing legacy redirect is correct. Do not change it. |
| `/blog/fridge-compressor-gas-refill-signs` | 0 clicks / 10 impressions / position 13.8 | 404 | Confirm in GSC Pages indexing whether it is excluded as Not found. If it remains indexed or has meaningful links/traffic, decide separately whether a genuine replacement article is warranted; do not redirect it to an unrelated page. |

### Revised implementation order once Query × Page data arrives

1. Homepage: analyse its exact query mix and identify high-impression commercial terms in positions 10–25 with low CTR.
2. Fridge repair: analyse query-to-page mapping; it has the greatest service-page impression volume (2,857) and 0 clicks.
3. Centurion: isolate the page’s actual query set; distinguish the encouraging exact-city query from the poor aggregate average.
4. Microwave and coffee machine: protect their existing page-one Centurion-query relevance while testing why the wider pages receive no clicks.
5. Johannesburg, Pretoria, washing machine, dishwasher and stove/oven: prioritise by commercial query impressions and operational coverage after the mapping report is available.

---

## Addendum — query-to-page evidence supplied by owner, 7 November 2026

The owner supplied Search Console page distributions for appliance query groups and selected exact queries. This resolves the main query-to-page uncertainty for the areas below. The exports show clicks and impressions only; no positions/date range were supplied with these filtered views, so conclusions concern page selection and demand distribution rather than a specific Google rank.

### Page-selection and cannibalisation findings

| Query / query group | Dominant page(s) shown | Finding | Priority action |
|---|---|---|---|
| Washing machine | `/services/washingmachine-repair`: 986 impressions; homepage: 405; Johannesburg: 319; Centurion: 234; Pretoria: 201 | The dedicated page is correctly dominant (about 46% of the listed impressions), but the homepage and city pages collectively receive substantial matching visibility. This is **potential cannibalisation**, not yet a reason to consolidate pages. | High: clarify service-page authority through contextual links from each city page to the washing-machine service page using natural appliance wording; review overlap in city-page washing-machine sections. |
| Fridge | `/services/fridge-repair`: 1,021; homepage: 167; Centurion: 115; Pretoria: 104; Johannesburg: 82 | The dedicated fridge page is correctly dominant (about 69% of the listed impressions). Supporting visibility from broad/location pages is normal and not itself harmful. | High: improve the dedicated fridge page first; retain relevant but concise fridge links on city/home pages. |
| **fridge repairs near me** | Pretoria: 18; homepage: 6; Centurion: 2; fridge service page: 2 | The dedicated fridge page is not the principal selected landing page for this exact local-intent query. Low volume, but this is a genuine **page-selection mismatch**. | Medium: do not create a “near me” page. Strengthen the fridge page’s truthful on-site/areas-served booking language and link to it naturally from Pretoria; then observe whether selection changes. |
| **appliance repair centurion** | Homepage: 64; Centurion page: 13 | The homepage—not the dedicated Centurion page—is Google’s main selected page for the exact city query. This is the clearest verified **cannibalisation/page-selection issue**. | Critical: make the Centurion location page unmistakably the best answer for Centurion mobile appliance repair, and make homepage links to it prominent and descriptive. Do not merely repeat the phrase on both pages. |
| Coffee machine repair | `/services/coffeemachine-repair`: 148; homepage: 11 | Correct service-page selection (about 93% of listed impressions). | Preserve. Improve conversion or content only after reviewing positions/CTR for this filtered query group. |
| Aircon | `/services/hvac-repair`: 154 | Correct dedicated-page selection. | Preserve; do not broaden claims unless service availability is confirmed. |
| Stove | `/services/stove-oven-repair`: 574; other listed pages: 10 combined | Correct, highly concentrated service-page selection. | Preserve service-page focus. |
| Oven | `/services/stove-oven-repair`: 912; Centurion: 155; Pretoria: 74; Johannesburg: 69; homepage: 63; microwave: 34 | Dedicated page dominates (about 69%), but city pages/homepage also surface meaningfully. Microwave visibility is a weak topical overlap to inspect. | Medium: keep stove/oven page primary; remove only genuinely duplicated oven copy from microwave page if inspection confirms it. Do not consolidate city pages. |

Percentages are calculated from the listed rows supplied by the owner, not from the complete Search Console dataset.

### What this changes in the action plan

1. **Centurion now becomes the first implementation candidate.** The problem is measurable: for the exact query `appliance repair centurion`, the homepage has 64 impressions and the dedicated Centurion page only 13. The fix should differentiate page roles, not force a keyword onto every page.
2. **Fridge repair is the top service-page candidate.** It already earns the right landing-page selection for the broad fridge query group (1,021 impressions), but produces no clicks in the supplied data. Improve relevance, result presentation and booking usefulness on that existing service page.
3. **Washing machine is the next service-page candidate.** The dedicated page is selected most often, but city/home pages share a large proportion of the query group. Use internal links and non-duplicated city summaries to reinforce the dedicated page.
4. **Do not “fix” coffee, aircon, stove or oven by creating new pages.** Their service pages already receive the dominant share of relevant impressions. Changes should be limited to verified weak CTR/position or content gaps.
5. **Do not create a “fridge repairs near me” page.** The 28 listed impressions are insufficient to justify a duplicate page; improve the existing fridge/location relationship instead.

### Recommended implementation brief for approval (no changes made)

| Priority | Page(s) | Exact change to consider after approval | Reason / risk |
|---|---|---|---|
| Critical | Homepage + Centurion location | Differentiate the homepage as Gauteng-wide service overview; make the Centurion page provide the clearest verified Centurion appointment/coverage/on-site process and link it prominently from home. | Targets the demonstrated wrong-page selection. Requires careful non-duplicated wording. |
| High | Fridge service + Pretoria location | Add truthful, practical fridge fault and on-site booking guidance to the service page; add a natural “fridge repair” path from Pretoria content to that page. | Redirects relevance from the weak near-me page selection without a duplicate page. |
| High | Washing-machine service + three city pages | Make city-page appliance summaries concise and link users to the dedicated washing-machine repair page; improve unique diagnostic/pre-booking content on the service page. | Reinforces the dominant service URL while preserving useful city pages. |
| Medium | Stove/oven + microwave service | Inspect the 34 microwave-page oven impressions before altering copy. Remove only a genuine misleading/duplicated oven reference, if present. | Prevents accidental cross-topic dilution. |
| Medium | Coffee, HVAC, stove/oven | Check filtered positions and CTR before any metadata/content changes. | They already have correct URL selection. |
