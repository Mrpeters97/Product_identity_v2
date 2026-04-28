// Selector options
export const VARIANT_OPTIONS = [
  { label: 'Monthly terminable - 1 GB', value: 'Monthly terminable - 1 GB' },
  { label: 'Monthly terminable - Unlimited', value: 'Monthly terminable - Unlimited' },
  { label: '1 year terminable - 1 GB', value: '1 year terminable - 1 GB' },
  { label: '1 year terminable - Unlimited', value: '1 year terminable - Unlimited' },
  { label: '2 years terminable - 1 GB', value: '2 years terminable - 1 GB' },
  { label: '2 years terminable - Unlimited', value: '2 years terminable - Unlimited' },
]

export const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'English' },
  { label: 'Dutch', value: 'Dutch' },
]

export const CHANNEL_OPTIONS = [
  { label: 'Belsimpel.nl', value: 'Belsimpel.nl' },
  { label: 'Gomibo.de', value: 'Gomibo.de' },
  { label: 'Gomibo.pl', value: 'Gomibo.pl' },
  { label: 'Gomibo.hu', value: 'Gomibo.hu' },
  { label: 'Gomibo.be', value: 'Gomibo.be' },
  { label: 'Gomibo.ie', value: 'Gomibo.ie' },
  { label: 'Gomibo.pt', value: 'Gomibo.pt' },
  { label: 'Gomibo.bg', value: 'Gomibo.bg' },
  { label: 'Gomibo.it', value: 'Gomibo.it' },
  { label: 'Gomibo.ro', value: 'Gomibo.ro' },
  { label: 'Gomibo.cy', value: 'Gomibo.cy' },
  { label: 'Gomibo.hr', value: 'Gomibo.hr' },
  { label: 'Gomibo.si', value: 'Gomibo.si' },
  { label: 'Gomibo.dk', value: 'Gomibo.dk' },
  { label: 'Gomibo.lv', value: 'Gomibo.lv' },
  { label: 'Gomibo.sk', value: 'Gomibo.sk' },
  { label: 'Gomibo.es', value: 'Gomibo.es' },
  { label: 'Gomibo.ee', value: 'Gomibo.ee' },
  { label: 'Gomibo.lu', value: 'Gomibo.lu' },
  { label: 'Gomibo.cz', value: 'Gomibo.cz' },
  { label: 'Gomibo.fi', value: 'Gomibo.fi' },
  { label: 'Gomibo.mt', value: 'Gomibo.mt' },
  { label: 'Gomibo.co.uk', value: 'Gomibo.co.uk' },
  { label: 'Gomibo.fr', value: 'Gomibo.fr' },
  { label: 'Gomibo.no', value: 'Gomibo.no' },
  { label: 'Gomibo.ch', value: 'Gomibo.ch' },
]

// Sticky positioning constants
export const STICKY_CONFIG = {
  triggerScroll: 141, // px
  stickyTop: 118, // px
  zIndex: 9997,
}

// Styles
export const LABEL_STYLE = {
  overflow: 'hidden',
  color: 'var(--base-sidebar-foreground, #3F3F46)',
  textOverflow: 'ellipsis',
  fontFamily: 'var(--typography-font-family-font-sans, Inter)',
  fontSize: '14px',
  fontWeight: 'var(--font-weight-medium, 500)',
  lineHeight: 'var(--typography-base-sizes-small-line-height, 20px)',
}

export const HEADING_STYLE = {
  color: 'var(--base-foreground, #18181B)',
  fontFamily: 'var(--typography-font-family-font-sans, Inter)',
  fontSize: '18px',
  fontWeight: 'var(--font-weight-semibold, 600)',
  lineHeight: 'var(--typography-base-sizes-large-line-height, 28px)',
  margin: 0,
}

export const DESCRIPTION_STYLE = {
  color: 'var(--base-muted-foreground, #71717A)',
  fontFamily: 'var(--typography-font-family-font-sans, Inter)',
  fontSize: '14px',
  fontWeight: 'var(--font-weight-normal, 400)',
  lineHeight: 'var(--typography-base-sizes-small-line-height, 20px)',
  margin: 0,
  marginTop: '4px',
}

export const BUTTON_STYLE = {
  color: 'var(--base-foreground, #18181B)',
  fontFamily: 'var(--typography-font-family-font-sans, Inter)',
  fontSize: '14px',
  fontWeight: 'var(--font-weight-normal, 400)',
  lineHeight: 'var(--typography-base-sizes-small-line-height, 20px)',
}

export const DIVIDER_STYLE = {
  width: '1px',
  height: '65px',
  background: 'var(--base-border, #E4E4E7)',
}
