import defaultSettings from './config';

const title = defaultSettings.title || 'xxx';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
