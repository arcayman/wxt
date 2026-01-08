export default defineContentScript({
  matches: [
    'https://x.com/*',
    'https://twitter.com/*',
    'https://www.facebook.com/*',
  ],
  main() {
    console.log('📌 Universal content script active')

    const getPlatform = (): 'x' | 'facebook' | 'unknown' => {
      if (location.hostname.includes('x.com')) return 'x'
      if (location.hostname.includes('facebook.com')) return 'facebook'
      return 'unknown'
    }

    const extractContent = () => {
      const platform = getPlatform()

      let text = ''
      let title = ''

      if (platform === 'x') {
        // X posts live inside <article>
        const article = document.querySelector('article')
        text = article?.innerText ?? ''
      }

      if (platform === 'facebook') {
        // FB posts are div-heavy, text-first approach
        text = document.body.innerText.slice(0, 500)
      }

      chrome.runtime.sendMessage({
        type: 'CONTENT_DETECTED',
        payload: {
          platform,
          type: 'post',
          text,
          url: location.href,
          createdAt: Date.now(),
        },
      })
    }

    // Trigger once per page load
    setTimeout(extractContent, 2000)
  },
})