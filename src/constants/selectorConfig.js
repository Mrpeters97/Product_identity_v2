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

// Sticky positioning constants
export const STICKY_CONFIG = {
  triggerScroll: 141, // px
  stickyTop: 71, // px
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
