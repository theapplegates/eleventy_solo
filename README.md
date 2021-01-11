# Repo for brycewray.com

This is the repository from which the [Eleventy](https://11ty.dev)-generated version of [brycewray.com](https://brycewray.com) is built.

For a **starter set** based on this repo’s design, please see either [eleventy_solo_starter](https://github.com/brycewray/eleventy_solo_starter) or [eleventy_solo_starter_njk](https://github.com/brycewray/eleventy_solo_starter_njk). The former uses JavaScript (.11ty.js) templating; the latter uses Nunjucks templating.

**Note**: If you clone **this** repo (rather than the starter set) for your use, be sure to change the `_data/metadata.json` file to reflect **your** information rather than mine, especially if you want to use `src/utils/analytics.js` with `src/_includes/layouts/partials/head.js` to inject your own Web analytics provider’s code. **However**, I mainly suggest you use this repo **only for reference** and, instead, use the aforementioned [starter set](https://github.com/brycewray/eleventy_solo_starter) if you wish to build your own Eleventy site with (at least at the start) a similar look-and-feel.

## What&rsquo;s under the hood

- Eleventy, of course, outfitted with a number of plugins that are probably self-explanatory once you see them in `package.json`.
- [PostCSS](https://postcss.org) and [Tailwind CSS](https://tailwindcss.com).
- [Cloudinary](https://www.cloudinary.com)’s free tier for handling the site’s images, controlling their sizes, and working with my `lazypicture` shortcode to make them [responsive](https://developers.google.com/web/fundamentals/design-and-ux/responsive/images). Another element of the image-handling is  [LazyLoad](https://github.com/verlok/lazyload) (sometimes called &ldquo;vanilla-lazyload&rdquo;).
- CSS cache-busting through my run-time `cssdate.js` script, and appropriate handling in the `head.js` partial template and the PostCSS-related parts of `package.json`. (For more details, see “[Cache-busting in Eleventy, take two](https://brycewray.com/posts/2020/12/cache-busting-eleventy-take-two/).”) **Note**: If you use [Netlify](https://netlify.com), be sure you **turn off** its post-processing of your CSS, which I’ve found can bollix up this method. *(My repos’ code already handles such processing anyway.)* You can do it either through the Netlify GUI (**Build &amp; deploy** &gt; **Post processing** &gt; **Asset optimization**) or through use of an appropriately configured top-level `netlify.toml` file such as what I’ve added to this repo. Whether other hosts’ settings would be similarly disruptive, I can’t say; the only ones on which I’ve tested this method so far are [Cloudflare Workers](https://workers.cloudflare.com), [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/), [Firebase](https://firebase.google.com), Netlify, [Render](https://render.com), and [Vercel](https://vercel.com).