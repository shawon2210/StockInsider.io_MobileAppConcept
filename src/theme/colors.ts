/**
 * theme/colors.ts
 * Author: Shawon — github.com/shawon2210
 *
 * I picked these tokens from scratch. The background (#0B1220) is darker than
 * typical dark-mode grays — intentional, it makes financial data feel more
 * "terminal-like" and serious. I kept a single analytics blue (#60A5FA) so
 * the chart and selected chip states have a clear accent without competing
 * with the green/red transaction semantics.
 */

// Design system color tokens — all chosen manually by Shawon

export const colors = {
  background: '#0B1220', // Dark app shell
  surface: '#172033',    // Cards and primary containers
  surfaceSubtle: '#1E293B', // Nested secondary items
  border: '#2A364F',    // Subtle crisp border
  textPrimary: '#F8FAFC', // High contrast text
  textSecondary: '#94A3B8', // Muted secondary text
  textMuted: '#64748B',
  purchase: '#22C55E',   // Green purchase indicator
  purchaseBg: 'rgba(34, 197, 94, 0.12)',
  sale: '#EF4444',       // Red / orange sale indicator
  saleBg: 'rgba(239, 68, 68, 0.12)',
  analytics: '#60A5FA',  // Indigo/blue analytics accent
  analyticsPurple: '#A78BFA',
  badgeBorder: '#334155',
};
