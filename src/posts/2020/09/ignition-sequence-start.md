---
layout: layouts/posts/singlepostherofit.11ty.js
tags: post
title: "Ignition sequence start"
subtitle: "A GitHub Action to deploy a Hugo site to Firebase Hosting"
description: "Missing that easy workflow you get with other hosts? This script is for you."
author: Bryce Wray
date: 2020-09-27T13:05:00
lastmod: 2020-10-24T20:20:00
#draft: true
discussionId: "2020-09-ignition-sequence-start"
featured_image: spacex-OHOU-5UVIYQ-unsplash_3000x2000.jpg
featured_image_width: 3000
featured_image_height: 2000
featured_image_alt: "SpaceX rocket launching from the Kennedy Space Center in Florida"
featured_image_caption: |
  <span class="caption">Image: <a href="https://unsplash.com/@spacex?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">SpaceX</a>; <a href="https://unsplash.com/s/photos/launch?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

<div class="yellowBox"><p><strong>Note</strong>: Unlike the <a href="/posts/2020/09/normal-persons-guide-static-websites">last</a> <a href="/posts/2020/09/normal-persons-guide-static-website-hosting">two</a> posts, this one very definitely is for <strong>only</strong> my fellow web geeks&mdash;and, anyway, they&rsquo;re the only folks likely to be using <a href="https://firebase.google.com" target="_blank" rel="noopener">Firebase Hosting</a>, I would think.</p></div>

I mentioned in a footnote to my [previous post](/posts/2020/09/normal-persons-guide-static-website-hosting) that my “[lurch](/posts/2020/09/goodbye-hello-part-5)” among hosts now has this site on Firebase. If you’ve read both the original “[Goodbye and hello](/posts/2020/07/goodbye-hello)” and its semi-[retconned](https://www.merriam-webster.com/words-at-play/retcon-history-and-meaning) [second part](/posts/2020/07/goodbye-hello-part-2), you may remember my describing why I chose **not** to use Firebase. If so, you then may also wonder what changed my mind.

Actually, there were multiple reasons:

- Last month, [Firebase belatedly adopted Brotli compression](https://firebase.googleblog.com/2020/08/firebase-hosting-new-features.html), its previous lack of which had been a deal-breaker for me.
- I had already been an admirer of the performance of the [Fastly](https://fastly.com) content delivery network (CDN) that Firebase uses, and found it was consistently better than the CDN setups provided with the free tiers for the other three hosts I’d been using and testing ([Netlify](https://netlify.com), [Render](https://render.com), and [Vercel](https://vercel.com)).
- In the last few days, I tinkered around and was able to come up with a [GitHub Action](https://github.com/features/actions) that made it possible to **deploy** (in Firebase terminology) to Firebase Hosting every time I pushed a change to the site repo’s default branch—*i.e.*, making it as easy as when using the repo with those other three hosts. Yes, you can just do a local site build and then invoke `firebase deploy`, but that’s an extra step; I’ve kinda gotten accustomed to the ease of the push-to-repo method and didn’t want to give it up.

Sharing that GitHub Action with you is the purpose of this post, in case it might be of use to those who use both Firebase Hosting and the [Hugo](https://gohugo.io) static site generator, which I've used in the past (and switched back to recently, before reverting later to [Eleventy](https://11ty.dev)).

This GitHub Action purposely does **not** use the widely used and excellent [GitHub Actions for Hugo](https://github.com/peaceiris/actions-hugo) by [Shohei Ueda (peaceiris)](https://github.com/peaceiris) to install Hugo during the build process, because—as was the case with [Andrew Connell](https://andrewconnell.com), whose example I followed and to whom I am grateful for the information he imparted in “[Automated Hugo Releases With GitHub Actions](https://www.andrewconnell.com/blog/automated-hugo-releases-with-github-actions/)”—I preferred having more control over that exact part.

Enough talk; on with the GitHub Action. Of course, it’s based on two assumptions: (a.) you’ve initialized your repo for Firebase, thus creating the `.firebaserc` and `firebase.json` files mentioned at the end; and (b.) you’ve stored your Firebase token—called below by `${{ secrets.FIREBASE_TOKEN }}`—in your repo’s **Secrets**. If you don’t **have** a Firebase token, you get that with `firebase login:ci` from the CLI, as explained in the [documentation](https://firebase.google.com/docs/cli#cli-ci-systems). You’ll note that I have `npm run build` in the *Build site with Hugo* step; but that’s peculiar to my formerly-using-[NodeJS](https://nodejs.org) repo (a long story) and, in fact, only does `rm -rf public && hugo --gc --minify`—so you may want to use a variation of that, instead, if you’ve kept *your* Hugo repo Node-free. The Hugo version shown is the latest as of this post’s original publication; set it as you wish.[^versionInfo] When I use Hugo, I use the [extended version](https://gohugo.io/troubleshooting/faq/#i-get-tocss--this-feature-is-not-available-in-your-current-hugo-version) because, sometimes, I support [SCSS through Hugo Pipes](https://gohugo.io/hugo-pipes/scss-sass/); I switch the themes back and forth among SCSS, PostCSS without Tailwind, and PostCSS with Tailwind as situations warrant.[^diffThemes]

[^versionInfo]: Just be sure the version conforms to how it shows up in the Hugo release filename, since this reference helps build that name for the download process in the GitHub Action; always check the [Hugo releases page](https://github.com/gohugoio/hugo/releases) to be sure about the accurate filename.

[^diffThemes]: I now have the Hugo version of this site’s repo set up so that there are **three** themes for Hugo’s use—one with purely SCSS, one with CSS-on-PostCSS (but still no Tailwind), and one with Tailwind. So, now, depending on which I want to use, I can simply switch themes in the site’s <code>config.yaml</code> file.

{% raw %}
```yaml
name: CI-Hugo-site-to-Firebase

on:
  push:
    branches:
      - master

env:
  HUGO_VERSION: 0.75.1 # steps below will pick extended version

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout master branch
        uses: actions/checkout@v2
      - name: Download Hugo v${{ env.HUGO_VERSION }} Linux x64
        run: "wget https://github.com/gohugoio/hugo/releases/download/v${{ env.HUGO_VERSION }}/hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb -O hugo_extended_${{ env.HUGO_VERSION }}_Linux-64bit.deb"
      - name: Install Hugo
        run: sudo dpkg -i hugo*.deb
      - name: Build site with Hugo
        run: npm run build
      - name: Install Firebase Tools
        run: npm install firebase-tools
      - name: Deploy to Firebase
        run: npx firebase deploy
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
          # Other args should come from .firebaserc and firebase.json
```
{% endraw %}

<div class="yellowBox">
  <p><strong>Note</strong>: Having learned all I wanted to learn from the experience, I decided a few days later to leave Firebase Hosting.</p>
</div>