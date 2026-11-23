import type { Route } from './+types/home'
import App from '../App'
import { MESSAGE } from '../constants/Text'
import { LINK } from '../constants/HyperLink'

export function meta(): Route.MetaDescriptors {
  return [
    { title: MESSAGE.META_TITLE },
    { name: 'description', content: MESSAGE.META_DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: MESSAGE.META_TITLE },
    { property: 'og:description', content: MESSAGE.META_DESCRIPTION },
    { property: 'og:url', content: LINK.LINK_SITE },
    { property: 'og:locale', content: 'ko_KR' },
  ]
}

export default function Home() {
  return <App />
}
