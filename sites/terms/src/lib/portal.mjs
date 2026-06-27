import {loadEcosystemConfig, buildNavItems, resolvePortalBase} from '@itu/portal-shared/ecosystem';

export function getPortalContext() {
  const config = loadEcosystemConfig({
    dev: import.meta.env.DEV,
  });
  const navItems = buildNavItems(config, 'terms');
  const brandHref = resolvePortalBase(config, 'terms') + '/glossary/intro';
  const ecosystemConfigJson = JSON.stringify({
    postMessage: config.postMessage,
    domains: config.domains,
  });

  return {
    config,
    navItems,
    brandHref,
    brandLabel: 'Глоссарий IT',
    ecosystemConfigJson,
  };
}
