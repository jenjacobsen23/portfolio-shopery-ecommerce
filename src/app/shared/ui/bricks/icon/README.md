# Icon Component

A flexible and configurable icon component that supports both predefined SVG paths and external SVG files with dynamic color management.

## Features

- **Multiple Icon Sources**: Predefined SVG paths or external SVG files
- **Dynamic Colors**: Configurable inactive, active, and hover colors for both background and borders
- **SVG State Management**: Each SVG file manages its own color states using unique class names
- **Multiple Shapes**: Circle or square variants
- **Size Variants**: Small (40px), Medium (48px), Large (56px)
- **Interactive States**: Selected, disabled, and hover states
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Type Safety**: Full TypeScript support with predefined icon types

## Icon Types

The component supports the following predefined icon types:

### Social Media Icons

- `facebook`, `twitter`, `instagram`, `pinterest`

### Utility Icons

- `close`, `bag`, `heart`, `eye`, `link`

## Usage

### Basic Usage with Predefined Type

```typescript
<app-icon type="heart" size="medium"></app-icon>
```

### Using Icon Configuration

```typescript
import { IconItem } from '@shared/ui/bricks/icon';

const heartIcon: IconItem = {
  type: 'heart',
  icon: '/images/icon-favorite.svg',
  inactiveColor: 'var(--color-white)',
  activeColor: 'var(--color-primary)',
  hoverColor: 'var(--color-primary)',
  inactiveBorderColor: 'var(--color-gray-05)',
  activeBorderColor: 'var(--color-primary)',
  hoverBorderColor: 'var(--color-primary)'
};

<app-icon [iconConfig]="heartIcon" size="medium"></app-icon>
```

### Using Predefined Icon Models

```typescript
import { socialMediaIcons, utilityIcons } from '@shared/ui/bricks/icon';

// In your component
readonly socialIcons = socialMediaIcons;
readonly utilityIcons = utilityIcons;

// In your template
<div *ngFor="let icon of socialIcons">
  <app-icon [iconConfig]="icon" size="medium"></app-icon>
</div>
```

## Input Properties

| Property          | Type                             | Default     | Description               |
| ----------------- | -------------------------------- | ----------- | ------------------------- |
| `type`            | `IconType`                       | `undefined` | Predefined icon type      |
| `iconConfig`      | `IconItem`                       | `undefined` | Icon configuration object |
| `shape`           | `'circle'`                       | `'circle'`  | Icon shape variant        |
| `hasBorder`       | `boolean`                        | `true`      | Whether to show border    |
| `backgroundColor` | `string`                         | `'#F2F2F2'` | Fallback background color |
| `isSelected`      | `boolean`                        | `false`     | Selected state            |
| `size`            | `'small' \| 'medium' \| 'large'` | `'medium'`  | Icon size                 |
| `disabled`        | `boolean`                        | `false`     | Disabled state            |

## Output Events

| Event       | Type                 | Description                  |
| ----------- | -------------------- | ---------------------------- |
| `iconClick` | `EventEmitter<void>` | Emitted when icon is clicked |

## Icon Configuration Interface

```typescript
interface IconItem {
  type: IconType; // Icon type identifier
  icon: string; // Path to SVG file
  routerLink?: string; // Optional router link for navigation
  inactiveColor?: string; // Background when not selected
  activeColor?: string; // Background when selected
  hoverColor?: string; // Background on hover
  inactiveBorderColor?: string; // Border when not selected
  activeBorderColor?: string; // Border when selected
  hoverBorderColor?: string; // Border on hover
}
```

## Predefined Icon Models

### Social Media Icons

```typescript
import { socialMediaIcons } from "@shared/ui/bricks/icon";

// Contains: facebook, twitter, instagram, pinterest
```

### Utility Icons

```typescript
import { utilityIcons } from "@shared/ui/bricks/icon";

// Contains: close, bag, heart, eye, link
```

## Helper Functions

### Get Background Color

```typescript
import { getBackgroundColor } from "@shared/ui/bricks/icon";

const bgColor = getBackgroundColor(iconItem, "active");
```

### Get Border Color

```typescript
import { getBorderColor } from "@shared/ui/bricks/icon";

const borderColor = getBorderColor(iconItem, "hover");
```

### Convert IconItem to IconConfig (Legacy Support)

```typescript
import { toIconConfig } from "@shared/ui/bricks/icon";

const iconConfig = toIconConfig(iconItem);
```

## Styling

The component uses CSS custom properties for dynamic color management:

- `--icon-hover-bg-color`: Set automatically from `IconItem.hoverColor`
- `--icon-hover-border-color`: Set automatically from `IconItem.hoverBorderColor`
- `--icon-active-bg-color`: Set automatically from `IconItem.activeColor`
- `--icon-active-border-color`: Set automatically from `IconItem.activeBorderColor`
- Background and border colors are applied dynamically based on state
- Each SVG file uses unique class names (e.g., `.close-inactive`, `.twitter-active`) to prevent CSS conflicts

## File Structure

```
src/app/shared/ui/bricks/icon/
├── icon.component.ts          # Main component logic
├── icon.component.html        # Component template
├── icon.component.scss        # Component styles
├── icon.models.ts            # Icon models and configurations
├── index.ts                  # Public exports
└── README.md                 # This documentation
```

## Expected Assets

The component expects SVG files in the `/public/images/` directory:

- `/public/images/icon-facebook.svg`
- `/public/images/icon-twitter.svg`
- `/public/images/icon-instagram.svg`
- `/public/images/icon-pinterest.svg`
- `/public/images/icon-close.svg`
- `/public/images/icon-bag.svg`
- `/public/images/icon-favorite.svg`
- `/public/images/icon-eye.svg`
- `/public/images/icon-link.svg`

Each SVG file should contain:

- Unique class names for each state (e.g., `.close-inactive`, `.close-active`, `.close-hover`)
- Color definitions for each state within the SVG's internal `<style>` block
- Default display states (inactive visible, active/hover hidden by default)

## Examples

### Social Media Icons Example

```typescript
@Component({
  template: `
    <div class="social-icons">
      <app-icon *ngFor="let icon of socialIcons" [iconConfig]="icon" size="medium" (iconClick)="onSocialClick(icon.type)"> </app-icon>
    </div>
  `,
})
export class SocialIconsComponent {
  readonly socialIcons = socialMediaIcons;

  onSocialClick(iconType: IconType) {
    console.log("Social icon clicked:", iconType);
  }
}
```

### Utility Icons with Custom Colors

```typescript
@Component({
  template: `
    <div class="utility-icons">
      <app-icon *ngFor="let icon of utilityIcons" [iconConfig]="icon" size="medium" [hasBorder]="true"> </app-icon>
    </div>
  `,
})
export class UtilityIconsComponent {
  readonly utilityIcons = utilityIcons;
}
```

### Custom Icon Configuration

```typescript
@Component({
  template: ` <app-icon [iconConfig]="customIcon" size="large" [isSelected]="isSelected" (iconClick)="toggleSelection()"> </app-icon> `,
})
export class CustomIconComponent {
  isSelected = false;

  customIcon: IconItem = {
    type: "heart",
    icon: "/images/icon-favorite.svg",
    inactiveColor: "var(--color-white)",
    activeColor: "var(--color-primary)",
    hoverColor: "var(--color-white)",
    inactiveBorderColor: "var(--color-gray-05)",
    activeBorderColor: "var(--color-primary)",
    hoverBorderColor: "var(--color-gray-05)",
  };

  toggleSelection() {
    this.isSelected = !this.isSelected;
  }
}
```
