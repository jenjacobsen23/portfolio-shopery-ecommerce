import { IconType, IconConfig } from './icon.component';

/**
 * Defines the structure of an icon item with background and border colors for each state
 */
export interface IconItem {
  /** The type of action this item represents */
  type: IconType;
  /** Path to the SVG icon asset */
  icon: string;
  /** Optional router link for navigation */
  routerLink?: string;
  /** Background color when not selected */
  inactiveColor?: string;
  /** Background color when selected */
  activeColor?: string;
  /** Background color on hover */
  hoverColor?: string;
  /** Border color when not selected */
  inactiveBorderColor?: string;
  /** Border color when selected */
  activeBorderColor?: string;
  /** Border color on hover */
  hoverBorderColor?: string;
}

/**
 * Social media icon configurations
 */
export const socialMediaIcons: IconItem[] = [
  {
    type: 'facebook',
    icon: '/images/icon-facebook.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
  },
  {
    type: 'twitter',
    icon: '/images/icon-twitter.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
  },
  {
    type: 'instagram',
    icon: '/images/icon-instagram.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
  },
  {
    type: 'pinterest',
    icon: '/images/icon-pinterest.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
  },
  {
    type: 'link',
    icon: '/images/icon-link.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
  },
];

/**
 * Utility icon configurations
 */
export const utilityIcons: IconItem[] = [
  {
    type: 'close',
    icon: '/images/icon-close.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-white)',
    hoverColor: 'var(--color-white)',
    inactiveBorderColor: 'var(--color-gray-2)',
    activeBorderColor: 'var(--color-gray-9)',
    hoverBorderColor: 'var(--color-gray-9)',
  },
  {
    type: 'bag',
    icon: '/images/icon-bag.svg',
    inactiveColor: 'var(--color-gray-05)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
    inactiveBorderColor: 'var(--color-gray-05)',
  },
  {
    type: 'heart',
    icon: '/images/icon-favorite.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
    inactiveBorderColor: 'var(--color-gray-05)',
  },
  {
    type: 'eye',
    icon: '/images/icon-eye.svg',
    inactiveColor: 'var(--color-white)',
    activeColor: 'var(--color-primary)',
    hoverColor: 'var(--color-primary)',
    inactiveBorderColor: 'var(--color-gray-05)',
  },
];

/**
 * Get background color for a specific state
 */
export function getBackgroundColor(
  item: IconItem,
  state: 'inactive' | 'active' | 'hover'
): string {
  switch (state) {
    case 'inactive':
      return item.inactiveColor || 'var(--color-gray-05)';
    case 'active':
      return item.activeColor || 'var(--color-primary)';
    case 'hover':
      return item.hoverColor || 'var(--color-success-700)';
    default:
      return 'var(--color-gray-05)';
  }
}

/**
 * Get border color for a specific state
 */
export function getBorderColor(
  item: IconItem,
  state: 'inactive' | 'active' | 'hover'
): string {
  switch (state) {
    case 'inactive':
      return (
        item.inactiveBorderColor || item.inactiveColor || 'var(--color-gray-05)'
      );
    case 'active':
      return (
        item.activeBorderColor || item.activeColor || 'var(--color-primary)'
      );
    case 'hover':
      return (
        item.hoverBorderColor || item.hoverColor || 'var(--color-success-700)'
      );
    default:
      return 'var(--color-gray-05)';
  }
}

/**
 * Convert IconItem to IconConfig for use with IconComponent (legacy support)
 */
export function toIconConfig(item: IconItem): IconConfig {
  return {
    type: item.type,
    icon: item.icon,
    inactiveColor: getBackgroundColor(item, 'inactive'),
    activeColor: getBackgroundColor(item, 'active'),
    hoverColor: getBackgroundColor(item, 'hover'),
  };
}
