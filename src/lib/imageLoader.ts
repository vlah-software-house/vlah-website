// next/image loader for the static export.
//
// On Vercel, images go through Vercel's Image Optimization API
// (/_vercel/image), configured in vercel.json. Every width Next.js asks for
// (its deviceSizes and imageSizes) and every quality the site uses (75 and 90)
// must be listed there, or that image fails to load.
//
// Anywhere else (a local build served from out/) the original file is used.

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  if (process.env.VERCEL_IMAGES !== '1') {
    return `${src}?w=${width}`
  }
  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}
