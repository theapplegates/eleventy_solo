const analyticsCode = require('../../../assets/utils/analytics.js')
let socialImg = `https://res.cloudinary.com/brycewray-com/image/upload/`
socialImg += `c_fill,w_1024,h_512,q_auto:eco,f_auto,x_0,z_1/`
let fallbackImg = `typewriter-monochrome_2242164_6260x4374.jpg`

module.exports = function(eleventyConfig) {

  eleventyConfig.addShortcode('headTag', function(data) {
    
    return `
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=10"><!-- due to IE 11 issue with TWCSS -->
    <meta name="generator" content="Eleventy v${require(`@11ty/eleventy/package.json`).version}" />  
    ${
      (data.title == "Home page")
      ? `
      <title>${data.siteparams.siteTitle}</title> 
      <meta property="og:title" content="${data.siteparams.siteTitle}" />
      `
      : `
      <title>${data.title} | ${data.siteparams.siteTitle}</title>
      <meta property="og:title" content="${data.title} | ${data.siteparams.siteTitle}" />
      `
    }

    <!-- IndieWeb -->
    ${
      (data.title == "Home page")
      ? `
      <link rel="me" href="https://twitter.com/BryceWrayTX" />
      <link rel="me" href="https://github.com/brycewray" />
      `
      : ``
    }
    <link rel="webmention" href="https://webmention.io/brycewray.com/webmention" />
    <link rel="pingback" href="https://webmention.io/brycewray.com/xmlrpc" />

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta property="og:image" content="${data.featured_image
      ? `${socialImg + data.featured_image}`
      : `${socialImg + fallbackImg}`
    }" />

    <meta name="description" content="${data.description
      ? `${data.description}`
      : `${data.siteparams.siteDescription}`
    }" />

    <meta name="og:description" content="${data.description
      ? `${data.description}`
      : `${data.siteparams.siteDescription}`
    }" />

    <meta property="og:url" content="${data.page.url
      ? `${data.page.url}`
      : `${data.siteparams.siteURLforOG}`
    }" />

    <!-- Twitter meta -->
    <meta name="twitter:site" content="@BryceWrayTX">
    <meta name="twitter:creator" content="@BryceWrayTX">
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${data.featured_image
      ? `${socialImg + data.featured_image}`
      : `${socialImg + fallbackImg}`
    }" />

    <meta name="twitter:description" content="${data.description
      ? `${data.description}`
      : `${data.siteparams.siteDescription}`
    }" />

    <meta name="twitter:title" content="${data.title
      ? `${data.title}`
      : `${data.siteparams.siteTitle}`   
    }" />


    <!-- **** BEGINNING, favicons **** -->

    <!-- generics -->
    <link rel="icon" type="image/svg+xml" href="/assets/svg/svgNavIcon_reduced.svg" />
    <link rel="icon" type="image/png" href="/images/icons/favicon-16x16.png" sizes="16x16">
    <!--
    <link rel="icon" type="image/png" href="/images/icons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/images/icons/favicon-96x96.png" sizes="96x96">
    -->

    <!-- iOS -->
    <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/images/icons/apple-touch-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png">
    <link rel="apple-touch-icon" sizes="1024x1024" href="/images/icons/apple-icon-1024x1024.png">

    <!-- Android -->
    <link rel="shortcut icon" sizes="196x196" href="/images/icons/favicon-196x196.png">

    <!-- Windows 8, IE 10 -->
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png">

    <!-- Windows 8.1 and up, IE 11 -->
    <meta name="msapplication-config" content="/browserconfig.xml">

    <!-- **** CONCLUSION, favicons **** -->

    <link rel="preconnect" href="https://res.cloudinary.com" />

    <link rel="preload" href="/assets/fonts/Inter-3-15_subset_2020-08-20.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/css/${data.csshash['index.css']}" as="style" />
    <link rel="stylesheet" href="/css/${data.csshash['index.css']}" type="text/css" />
    <style>@-moz-document url-prefix() {.lazy:-moz-loading {visibility:hidden;}}.ieOnly {display: none;}@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {.ieOnly {display: block;}.notInIE{display: none;}}</style>

    ${analyticsCode}
    
  </head>
    `

  })

}
