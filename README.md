# sitemap-visual
> A visual searchable representation of the sitemap.xml file for VSU

![code jQuery build](https://img.shields.io/badge/build-jQuery-brightgreen)
![code JavaScript build](https://img.shields.io/badge/build-JavaScript-brightgreen)
![XML](https://img.shields.io/badge/build-XML-yellowgreen)
![CSS3](https://img.shields.io/badge/build-CSS3-yellowgreen)
![HTML5](https://img.shields.io/badge/build-HTML5-yellowgreen)
![Chrome](https://img.shields.io/badge/Chrome-compatable-green)
![Firefox](https://img.shields.io/badge/Firefox-compatable-green)
![Edge](https://img.shields.io/badge/Edge-compatable-green)
![MIT license](https://img.shields.io/badge/license-mit-blue)

> Cascade CMS Dependent Technologies

![code Java build](https://img.shields.io/badge/build-Java-brightgreen)
![code Velocity Template Language build](https://img.shields.io/badge/build-Velocity%20Template%20Language-brightgreen)
---

## Users
- VSU Technology Services employees for webpage auditing
- Public users can use visual sitemap for advanced search capabilities
---

## Functions
This web application provides a searchable function of all .php webpages located on: https://www.vsu.edu

There is a live version located here: https://www.vsu.edu/sitemap-visual.php 

---

User is presented with sitemap-visual search with all results listed and page results

![start](screenshots/sitemap-visual-start.JPG)

By default, search text input can be filered by **keywords**, **page title**, and **URLs**

![options](screenshots/sitemap-visual-search-options.JPG)

Under *Advanced Filters*, user is able to filter results by **Search Priority** and **Page Frequency**.  These search parameters are metadata found in https://www.vsu.edu/sitemap.xml

![advanced](screenshots/sitemap-visual-advanced-filters.JPG)

As user types in search text input, results populate automatically, updating the **Page Results count**

![results-list](screenshots/sitemap-visual-search.JPG)

Results display with an open graph image and metadata along with the URL and link of each page found.

![result](screenshots/sitemap-visual-result.JPG)

---

### Installation

To have a local install of the working project you would need to have the following:

- xampp
- Sublime text editor
- Download of local files through GitHub desktop app

---

## Overview

The sitemap-visual app was developed in order to audit webpage metadata for SEO analysis.  A secondary function allows users to search the VSU website more effectively than the current search.

---

### Visual Sitemap Technical Functions
- the sitemap.xml URL is fed into function `getXMLSitemapObject()` and `parseXMLSitemap()` in order to get sitemap content, parse and teturn a XML DOM object
- a callback function with the parameter `sitemapObject` is ran to create an array of URLs which is iterated through, parsing metatag information of each entry
- div elements are created with corresponding `changefreq` and `priority` dynamic metatag information
- a `data` object literal of a deferred promise function generating the `title`, `loc`, `lastmod`, `changefreq`, and `priority` within html structure and appending it within the div elements created earlier.
