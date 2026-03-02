export const COLLECTION_BG_OVERLAY =
  'linear-gradient(rgba(255,250,243,0.72), rgba(255,236,212,0.78))'

export function buildCollectionBackground(imageSource) {
  const source = String(imageSource || '').trim()
  if (!source) {
    return COLLECTION_BG_OVERLAY
  }

  return `${COLLECTION_BG_OVERLAY}, url(${source}) center/cover no-repeat`
}

export function normalizeCollectionBackground(bgValue, fallbackValue = '') {
  const raw = String(bgValue || '').trim()
  const fallback = String(fallbackValue || '').trim() || COLLECTION_BG_OVERLAY

  if (!raw) {
    return fallback
  }

  if (raw.startsWith('data:image/')) {
    return buildCollectionBackground(raw)
  }

  // Repair legacy values saved as ", data:image..." without url(...)
  if (raw.includes(', data:image/')) {
    const withUrlPrefix = raw.replace(', data:image/', ', url(data:image/')
    if (withUrlPrefix.includes(' center/cover no-repeat')) {
      return withUrlPrefix.replace(' center/cover no-repeat', ') center/cover no-repeat')
    }
    return `${withUrlPrefix})`
  }

  // If data URI exists but payload is missing, fallback to known-good background.
  if (
    raw.includes('url(data:image/') &&
    !raw.includes('base64,') &&
    !raw.includes('%3Csvg') &&
    !raw.includes('<svg')
  ) {
    return fallback
  }

  return raw
}

export function extractCollectionImageUrl(bgValue) {
  const raw = String(bgValue || '').trim()
  if (!raw) return ''

  if (/^https?:\/\//i.test(raw) || raw.startsWith('data:image/')) {
    return raw
  }

  const matches = [...raw.matchAll(/url\((["'])?(.*?)\1\)/gi)]
  if (matches.length > 0) {
    return String(matches.at(-1)?.[2] || '').trim()
  }

  return ''
}
