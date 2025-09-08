# 🎨 Angular Theme System

A comprehensive, scalable theme system for Angular applications with support for runtime theme switching, custom color palettes, and consistent design tokens.

## ✨ Features

- **🎨 Complete Design System**: Colors, typography, spacing, shadows, and more
- **🌙 Dark/Light Theme Support**: Automatic theme switching with system preference detection
- **🎯 Runtime Customization**: Change primary and secondary colors on the fly
- **📱 Responsive Design**: Mobile-first approach with breakpoint utilities
- **♿ Accessibility**: High contrast ratios and focus management
- **🔧 TypeScript Support**: Full type safety with interfaces and types
- **📦 Modular Architecture**: Easy to extend and customize

## 🚀 Quick Start

### 1. Import Theme System

The theme system is automatically imported in `src/styles.scss`:

```scss
// Import the complete theme system
@import "styles/theme";
```

### 2. Use in Components

```typescript
import { Component, inject } from "@angular/core";
import { ThemeService } from "../services/theme.service";

@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <div class="card">
      <h2 class="h3">Hello World</h2>
      <p class="body-base">This uses theme typography and spacing.</p>
      <button class="btn btn-primary">Primary Button</button>
    </div>
  `,
  styles: [
    `
      .card {
        @include card;
        @include padding(6);
      }

      h2 {
        @include heading-3;
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-4);
      }

      p {
        @include body-base;
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-6);
      }
    `,
  ],
})
export class ExampleComponent {
  readonly themeService = inject(ThemeService);
}
```

## 🎨 Customizing Colors

### Current Color Palette

The theme system uses a green-based color palette:

```scss
$primary-colors: (
  50: #84d187,
  // Soft Primary
  100: #84d187,
  // Soft Primary
  200: #84d187,
  // Soft Primary
  300: #84d187,
  // Soft Primary
  400: #84d187,
  // Soft Primary
  500: #00b207,
  // Primary Green
  600: #00b207,
  // Primary Green
  700: #2c742f,
  // Hard Primary
  800: #2c742f,
  // Hard Primary
  900: #2c742f,
  // Hard Primary
  contrast:
    (
      50: #1a1a1a,
      100: #1a1a1a,
      200: #1a1a1a,
      300: #1a1a1a,
      400: #1a1a1a,
      500: #ffffff,
      // White text on primary
      600: #ffffff,
      700: #ffffff,
      800: #ffffff,
      900: #ffffff,
    ),
);

$secondary-colors: (
  50: #edf2ee,
  // Green Gray .5
  100: #dae5da,
  // Green Gray 1
  200: #b4ccb4,
  // Green Gray 2
  300: #96b297,
  // Green Gray 3
  400: #7a997c,
  // Green Gray 4
  500: #618062,
  // Green Gray 5
  600: #406b42,
  // Green Gray 6
  700: #2b572e,
  // Green Gray 7
  800: #173b1a,
  // Green Gray 8
  900: #002603,
  // Green Gray 9
  contrast:
    (
      50: #1a1a1a,
      100: #1a1a1a,
      200: #1a1a1a,
      300: #1a1a1a,
      400: #1a1a1a,
      500: #ffffff,
      600: #ffffff,
      700: #ffffff,
      800: #ffffff,
      900: #ffffff,
    ),
);
```

### Customizing Colors

Edit `src/styles/theme/_variables.scss` to customize your color palette:

### Runtime Color Customization

Use the `ColorPickerComponent` or `ThemeService` to change colors at runtime:

```typescript
import { inject } from "@angular/core";
import { ThemeService } from "../services/theme.service";

export class MyComponent {
  readonly themeService = inject(ThemeService);

  changePrimaryColor(color: string) {
    this.themeService.setCustomColors({
      primaryColor: color,
    });
  }
}
```

## 📝 Customizing Typography

### Font Families

Update the font families in `_variables.scss`:

```scss
$font-families: (
  primary: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  secondary: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'SF Mono, Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
);
```

### Font Sizes

Customize the typography scale:

```scss
$font-sizes: (
  xs: 0.75rem,
  // 12px - Body Tiny
  sm: 0.875rem,
  // 14px - Body Small
  base: 1rem,
  // 16px - Body Medium
  lg: 1.125rem,
  // 18px - Body Large
  xl: 1.25rem,
  // 20px - Body XL
  "2xl": 1.5rem,
  // 24px - Body XXL
  "3xl": 2rem,
  // 32px - Heading 05
  "4xl": 2.25rem,
  // 36px - Heading 04
  "5xl": 3rem,
  // 48px - Heading 03
  "6xl": 3.5rem,
  // 56px - Heading 02
  "7xl": 4.5rem,
  // 72px - Heading 01
  "8xl": 4.5rem,
  // 72px - Display 01
  "9xl": 8rem,
  // 128px
);
```

### Using Typography Mixins

```scss
.my-heading {
  @include heading-1; // Uses h1 styles
}

.my-text {
  @include body-large; // Uses large body text styles
}

.custom-typography {
  @include typography("lg", "semibold", "tight", "secondary");
}
```

## 📏 Spacing and Layout

### Spacing Scale

The spacing system uses a consistent scale from 4px to 384px:

```scss
$spacing: (
  0: 0,
  1: 0.25rem,
  // 4px
  2: 0.5rem,
  // 8px
  3: 0.75rem,
  // 12px
  4: 1rem,
  // 16px
  5: 1.25rem,
  // 20px
  6: 1.5rem,
  // 24px
  7: 1.75rem,
  // 28px
  8: 2rem,
  // 32px
  9: 2.25rem,
  // 36px
  10: 2.5rem,
  // 40px
  12: 3rem,
  // 48px
  14: 3.5rem,
  // 56px
  16: 4rem,
  // 64px
  20: 5rem,
  // 80px
  24: 6rem,
  // 96px
  28: 7rem,
  // 112px
  32: 8rem,
  // 128px
  36: 9rem,
  // 144px
  40: 10rem,
  // 160px
  44: 11rem,
  // 176px
  48: 12rem,
  // 192px
  52: 13rem,
  // 208px
  56: 14rem,
  // 224px
  60: 15rem,
  // 240px
  64: 16rem,
  // 256px
  72: 18rem,
  // 288px
  80: 20rem,
  // 320px
  96: 24rem,
  // 384px
);
```

### Layout Mixins

```scss
.my-container {
  @include container(1200px); // Centered container with max-width
}

.my-layout {
  @include flex-center; // Flexbox with center alignment
  @include padding(6); // 24px padding
  @include margin-y(8); // 32px top/bottom margin
}
```

## 🌙 Theme Switching

### Theme Toggle Component

Include the theme toggle in your app:

```html
<app-theme-toggle />
```

### Programmatic Theme Control

```typescript
import { inject } from "@angular/core";
import { ThemeService, ThemeMode } from "../services/theme.service";

export class MyComponent {
  readonly themeService = inject(ThemeService);

  setLightTheme() {
    this.themeService.setThemeMode("light");
  }

  setDarkTheme() {
    this.themeService.setThemeMode("dark");
  }

  setSystemTheme() {
    this.themeService.setThemeMode("system");
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
```

## 🔧 Available Mixins

### Typography Mixins

- `@include heading-1` through `@include heading-6`
- `@include body-large`, `@include body-base`, `@include body-small`
- `@include caption`, `@include button-text`
- `@include typography($size, $weight, $line-height, $family)`
- `@include ui-heading-01` through `@include ui-heading-05` (UI-specific)
- `@include ui-body-xxl`, `@include ui-body-xl`, `@include ui-body-large`, etc. (UI-specific)

### Layout Mixins

- `@include container($max-width)`
- `@include flex-center`, `@include flex-between`, `@include flex-start`, `@include flex-end`
- `@include grid($columns, $gap)`

### Spacing Mixins

- `@include margin($size)`, `@include margin-x($size)`, `@include margin-y($size)`
- `@include padding($size)`, `@include padding-x($size)`, `@include padding-y($size)`

### Component Mixins

- `@include button-base`, `@include button-variant($variant)`
- `@include card`, `@include input-base`
- `@include form-group`, `@include badge($variant)`

### Responsive Mixins

- `@include respond-to($breakpoint)`
- `@include mobile-first($breakpoint)`
- `@include desktop-down($breakpoint)`

## 📱 Breakpoints

```scss
$breakpoints: (
  xs: 0,
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  "2xl": 1536px,
);
```

### Usage

```scss
.my-component {
  // Mobile first
  @include mobile-first("md") {
    // Styles for medium screens and up
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @include mobile-first("lg") {
    // Styles for large screens and up
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 🎯 Utility Classes

The theme system provides utility classes for common patterns:

### Typography Utilities

```html
<h1 class="text-heading-01">Heading 1</h1>
<h2 class="text-heading-02">Heading 2</h2>
<p class="text-body-large">Large body text</p>
<p class="text-body-medium">Medium body text</p>
<span class="text-body-tiny">Small caption text</span>
```

### Spacing Utilities

```html
<div class="p-6 m-4">Padding 24px, margin 16px</div>
<div class="px-4 py-2">Horizontal padding 16px, vertical padding 8px</div>
<div class="mt-8 mb-4">Top margin 32px, bottom margin 16px</div>
```

### Color Utilities

```html
<div class="text-primary bg-secondary">Primary text on secondary background</div>
<div class="text-success">Success text color</div>
```

### Layout Utilities

```html
<div class="container">Centered container</div>
<div class="flex flex-center">Centered flexbox</div>
<div class="grid grid-cols-2 gap-4">2-column grid with 16px gap</div>
<div class="flex flex-between">Space between items</div>
```

## 🚀 Performance Features

- **CSS Custom Properties**: Runtime theme switching without recompilation
- **Efficient SASS**: Minimal CSS output with smart mixins
- **Tree Shaking**: Only import what you need
- **Optimized Builds**: Production-ready with minification

## 🔒 Browser Support

- **Modern Browsers**: Full support for CSS custom properties
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality works everywhere

## 📚 File Structure

```
src/styles/theme/
├── _variables.scss      # Design tokens and variables
├── _css-variables.scss  # CSS custom properties
├── _mixins.scss        # SASS mixins and functions
├── _utilities.scss     # Utility classes
└── _index.scss         # Main import file

src/app/services/
└── theme.service.ts     # Theme management service

src/app/components/
├── theme-toggle/        # Theme switching component
│   ├── theme-toggle.component.ts
│   ├── theme-toggle.component.html
│   └── theme-toggle.component.scss
├── color-picker/        # Color customization component
│   ├── color-picker.component.ts
│   ├── color-picker.component.html
│   └── color-picker.component.scss
└── theme-demo/          # Demo showcase component
    ├── theme-demo.component.ts
    ├── theme-demo.component.html
    └── theme-demo.component.scss
```

## 🎨 Customization Examples

### Custom Color Palette

```scss
// In _variables.scss
$brand-colors: (
  50: #fef2f2,
  100: #fee2e2,
  200: #fecaca,
  300: #fca5a5,
  400: #f87171,
  500: #ef4444,
  // Your brand red
  600: #dc2626,
  700: #b91c1c,
  800: #991b1b,
  900: #7f1d1d,
);

// Add to CSS variables
:root {
  --color-brand-500: #{map-get($brand-colors, 500)};
}
```

### Custom Component Styles

```scss
@mixin custom-button($variant: "default") {
  @include button-base;

  @if $variant == "default" {
    background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
    border-radius: var(--border-radius-full);
    box-shadow: var(--shadow-lg);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }
  }
}

.custom-btn {
  @include custom-button("default");
}
```

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add tests for new functionality
3. Update documentation for new features
4. Ensure accessibility compliance

## 📄 License

This theme system is part of your Angular application and follows the same license terms.

---

**Happy Theming! 🎨✨**
