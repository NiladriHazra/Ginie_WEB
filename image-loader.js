export default function myImageLoader({ src, width, quality }) {
    // Return the URL without preload hints
    return `${src}?w=${width}&q=${quality || 75}`
  }