import {loadEcosystemConfig, buildNavItems, resolvePortalBase} from '@itu/portal-shared/ecosystem';

export function getPortalContext() {
  const config = loadEcosystemConfig({dev: import.meta.env.DEV});
  return {
    config,
    navItems: buildNavItems(config, 'lab'),
    brandHref: resolvePortalBase(config, 'lab') + '/',
    brandLabel: 'Лаборатория IT',
    ecosystemConfigJson: JSON.stringify({
      postMessage: config.postMessage,
      domains: config.domains,
    }),
  };
}
