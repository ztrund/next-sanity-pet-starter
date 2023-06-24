# Next Sanity Pet Starter

This is a starter template for creating pet adoption or breeding websites using Next.js, Sanity CMS, and Cloudflare
Pages. It's a fully-fledged solution for anyone who wants to create a modern, efficient, and fully customizable pet
related website. This project also uses tailwindcss for styling, embla-carousel-react for a customizable carousel,
react-lite-youtube-embed for lightweight YouTube video embedding, and Preact for a smaller overall bundle size.

## Getting Started

Follow these steps to get the project running on your local machine:

1. Clone this repository: `git clone https://github.com/ztrund/next-sanity-pet-starter.git`
2. Move into the project directory: `cd next-sanity-pet-starter`
3. Install the dependencies: `npm install`
4. Copy the `.env.local.example` to a new file named `.env.local` and fill in your Sanity Studio settings.
5. Copy the `.dev.vars.example` to a new file named `.dev.vars` and fill in the YouTube API Key.
6. Start the development server: `npm run dev`

## Configuration

### Local Development

For local development, you need to set the environment variables. Rename the `.env.local.example` file to `.env.local`
and fill in the values:

```plaintext
# Required, find them on https://manage.sanity.io
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
# see https://www.sanity.io/docs/api-versioning for how versioning works
SANITY_STUDIO_API_VERSION="2023-04-12"
```

Also, rename the .dev.vars.example file to .dev.vars and fill in the values:

```plaintext
# Required for checkYoutubeStatus pages function, found at https://console.cloud.google.com/apis/api/youtube.googleapis.com/
YOUTUBE_API_KEY=
```

## CMS (Sanity)

The CMS for this project is hosted on another
repo [Next Sanity Pet Starter CMS](https://github.com/ztrund/next-sanity-pet-starter-cms). Follow the instructions there
to set up the CMS.

## Dependencies

- [Next.js](https://nextjs.org/) as the React framework.
- [Sanity](https://www.sanity.io/) as the headless CMS.
- [Cloudflare Pages](https://pages.cloudflare.com/) for continuous deployment and hosting.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS.
- [Embla Carousel](https://www.embla-carousel.com/) for creating a powerful, customizable
  carousel.
- [React Lite YouTube Embed](https://www.npmjs.com/package/react-lite-youtube-embed) for a performant way to embed
  YouTube videos.
- [Preact](https://preactjs.com/) for a smaller overall bundle size.

## Acknowledgments

### Icons

- Icons from [Lucide](https://lucide.dev/) are used under the ISC License. Copyright (c) Lucide Contributors 2022.
- Icons from [Font Awesome](https://fontawesome.com/) are used under the [Font Awesome Free License](https://fontawesome.com/license/free).

## License

[MIT](LICENSE)