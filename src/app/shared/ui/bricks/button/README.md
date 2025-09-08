# Button Component

A comprehensive, accessible button component with three variants and three sizes, designed to match your exact design specifications.

## 🎨 Design Specifications

### **Button Variants**

| Variant     | Normal State                                    | Hover State                                     | Description                           |
| ----------- | ----------------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| **Primary** | `#00B207` background, white text                | `#2C742F` background, white text                | Solid fill button for primary actions |
| **Outline** | Transparent background, `#00B207` text & border | Transparent background, `#2C742F` text & border | Outlined button for secondary actions |
| **Subtle**  | `#56AC59` 10% background, `#00B207` text        | `#2C742F` 20% background, `#2C742F` text        | Subtle background without border      |

### **Button Sizes**

| Size       | Width | Height | Font Size | Use Case                         |
| ---------- | ----- | ------ | --------- | -------------------------------- |
| **Small**  | 94px  | 36px   | 14px      | Compact spaces, forms            |
| **Medium** | 117px | 45px   | 16px      | Standard buttons, CTAs           |
| **Large**  | 141px | 51px   | 18px      | Hero sections, prominent actions |

### **Common Properties**

- **Border Radius**: 43px (pill-shaped)
- **Font Family**: Poppins (via CSS variables)
- **Font Weight**: Medium (500)
- **Transition**: 0.2s ease-in-out for all properties
- **Focus**: 2px outline with primary color

## 🚀 Usage

### **Basic Usage**

```typescript
import { ButtonComponent } from '@shared/ui/bricks/button';

@Component({
  imports: [ButtonComponent],
  // ...
})
```

### **HTML Examples**

```html
<!-- Primary Button (Default) -->
<app-button>Click Me</app-button>

<!-- Outline Button -->
<app-button variant="outline">Outline Button</app-button>

<!-- Subtle Button -->
<app-button variant="subtle">Subtle Button</app-button>

<!-- Different Sizes -->
<app-button size="small">Small</app-button>
<app-button size="medium">Medium</app-button>
<app-button size="large">Large</app-button>

<!-- Submit Button -->
<app-button type="submit">Submit Form</app-button>

<!-- Disabled Button -->
<app-button [disabled]="true">Disabled</app-button>

<!-- With Custom Label -->
<app-button ariaLabel="Custom accessible label">Custom</app-button>
```

### **Event Handling**

```typescript
@Component({
  template: ` <app-button (onClick)="handleButtonClick($event)"> Click Me </app-button> `,
})
export class MyComponent {
  handleButtonClick(event: Event): void {
    console.log("Button clicked!", event);
    // Handle button click
  }
}
```

## 📋 API Reference

### **Inputs**

| Property    | Type                                 | Default     | Description                         |
| ----------- | ------------------------------------ | ----------- | ----------------------------------- |
| `variant`   | `'primary' \| 'outline' \| 'subtle'` | `'primary'` | Button visual style                 |
| `size`      | `'small' \| 'medium' \| 'large'`     | `'medium'`  | Button dimensions                   |
| `disabled`  | `boolean`                            | `false`     | Whether button is disabled          |
| `type`      | `'button' \| 'submit' \| 'reset'`    | `'button'`  | HTML button type                    |
| `ariaLabel` | `string`                             | `undefined` | Custom ARIA label for accessibility |

### **Outputs**

| Event     | Type                  | Description                    |
| --------- | --------------------- | ------------------------------ |
| `onClick` | `EventEmitter<Event>` | Emitted when button is clicked |

### **Types**

```typescript
export type ButtonVariant = "primary" | "outline" | "subtle";
export type ButtonSize = "small" | "medium" | "large";
```

## 🎯 Accessibility Features

- **Keyboard Navigation**: Fully navigable with Tab key
- **Screen Readers**: Proper ARIA labels and button semantics
- **Focus Management**: Visible focus indicators
- **Disabled State**: Proper disabled state handling
- **Semantic HTML**: Uses native `<button>` element

## 🎨 Styling

The component uses CSS custom properties from your theme system:

- **Colors**: Primary, secondary, and neutral color palettes
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Transitions**: Smooth hover and focus transitions

### **CSS Custom Properties Used**

```css
--font-family-primary
--font-weight-medium
--font-size-sm, --font-size-base, --font-size-lg
--spacing-3, --spacing-4, --spacing-5
--color-primary
--color-background-primary
--color-background-secondary
--color-border-primary
--color-border-secondary
--border-radius-base
```

## 🔧 Customization

### **Modifying Colors**

To change button colors, update the CSS custom properties in your theme:

```scss
:root {
  --color-primary: #00b207;
  --color-primary-hover: #2c742f;
  --color-subtle-bg: rgba(86, 172, 89, 0.1);
  --color-subtle-bg-hover: rgba(44, 116, 47, 0.2);
}
```

### **Modifying Sizes**

To change button dimensions, update the size classes in the component:

```scss
.btn-small {
  width: 94px; // Change this value
  height: 36px; // Change this value
}
```

### **Modifying Border Radius**

To change the pill shape, update the border-radius:

```scss
.btn-small,
.btn-medium,
.btn-large {
  border-radius: 43px; // Change this value
}
```

## 📱 Responsive Behavior

- **Mobile**: Buttons maintain their exact dimensions
- **Tablet**: Responsive grid layout in demo
- **Desktop**: Full grid layout with proper spacing

## 🧪 Testing

### **Demo Component**

Use the included `ButtonDemoComponent` to test all variants and sizes:

```typescript
import { ButtonDemoComponent } from "./button-demo.component";

// Add to your routes or use directly
```

### **Unit Testing**

```typescript
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button.component";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit onClick event", () => {
    const spy = jest.fn();
    component.onClick.subscribe(spy);

    const button = fixture.nativeElement.querySelector("button");
    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
```

## 📦 Installation

The button component is part of the shared UI bricks and is automatically available when you import from the shared module.

```typescript
// Import the component
import { ButtonComponent } from "@shared/ui/bricks/button";

// Or import types
import { ButtonVariant, ButtonSize } from "@shared/ui/bricks/button";
```

## 🔄 Version History

- **v1.0.0**: Initial release with three variants and three sizes
- Exact color matching with design specifications
- 43px border radius for pill shape
- Comprehensive accessibility features
- Theme system integration

## 🤝 Contributing

When modifying the button component:

1. Maintain the exact color specifications
2. Preserve the 43px border radius
3. Keep the exact dimensions for each size
4. Ensure accessibility features remain intact
5. Update the demo component if adding new features
6. Test across all variants and sizes

## 📄 License

This component is part of your internal design system and follows your established coding standards and Angular best practices.
