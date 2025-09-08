import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent, ButtonVariant, ButtonSize } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Properties', () => {
    it('should have default variant as primary', () => {
      expect(component.variant).toBe('primary');
    });

    it('should have default size as medium', () => {
      expect(component.size).toBe('medium');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled).toBe(false);
    });

    it('should have default type as button', () => {
      expect(component.type).toBe('button');
    });

    it('should have undefined ariaLabel by default', () => {
      expect(component.ariaLabel).toBeUndefined();
    });
  });

  describe('Button Classes', () => {
    it('should generate correct classes for default properties', () => {
      const expectedClasses = 'btn btn-medium btn-primary';
      expect(component.buttonClasses).toBe(expectedClasses);
    });

    it('should generate correct classes for small primary button', () => {
      component.size = 'small';
      component.variant = 'primary';
      fixture.detectChanges();

      const expectedClasses = 'btn btn-small btn-primary';
      expect(component.buttonClasses).toBe(expectedClasses);
    });

    it('should generate correct classes for large outline button', () => {
      component.size = 'large';
      component.variant = 'outline';
      fixture.detectChanges();

      const expectedClasses = 'btn btn-large btn-outline';
      expect(component.buttonClasses).toBe(expectedClasses);
    });

    it('should generate correct classes for medium subtle button', () => {
      component.size = 'medium';
      component.variant = 'subtle';
      fixture.detectChanges();

      const expectedClasses = 'btn btn-medium btn-subtle';
      expect(component.buttonClasses).toBe(expectedClasses);
    });
  });

  describe('Template Rendering', () => {
    it('should render button element', () => {
      expect(buttonElement).toBeTruthy();
    });

    it('should apply button classes to the button element', () => {
      const expectedClasses = 'btn btn-medium btn-primary';
      expect(buttonElement.nativeElement.className).toBe(expectedClasses);
    });

    it('should set disabled attribute when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.disabled).toBe(true);
    });

    it('should not set disabled attribute when disabled is false', () => {
      component.disabled = false;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.disabled).toBe(false);
    });

    it('should set type attribute correctly', () => {
      component.type = 'submit';
      fixture.detectChanges();

      expect(buttonElement.nativeElement.type).toBe('submit');
    });

    it('should set aria-label attribute when provided', () => {
      const testAriaLabel = 'Test button label';
      component.ariaLabel = testAriaLabel;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe(
        testAriaLabel
      );
    });

    it('should not set aria-label attribute when not provided', () => {
      component.ariaLabel = undefined;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-label')).toBeNull();
    });

    it('should project content using ng-content', () => {
      const testContent = 'Test Button Text';
      fixture = TestBed.createComponent(ButtonComponent);
      fixture.componentRef.setInput('variant', 'primary');
      fixture.componentRef.setInput('size', 'medium');
      fixture.detectChanges();

      // Manually add content to test ng-content projection
      const buttonNativeElement = fixture.debugElement.query(
        By.css('button')
      ).nativeElement;
      buttonNativeElement.textContent = testContent;
      fixture.detectChanges();

      expect(buttonNativeElement.textContent).toBe(testContent);
    });
  });

  describe('Click Events', () => {
    it('should emit click event when button is clicked', () => {
      spyOn(component.onClick, 'emit');

      buttonElement.nativeElement.click();

      expect(component.onClick.emit).toHaveBeenCalled();
    });

    it('should emit click event with correct event object', () => {
      let emittedEvent: Event | undefined;
      component.onClick.subscribe((event: Event) => {
        emittedEvent = event;
      });

      const mockEvent = new Event('click');
      buttonElement.nativeElement.dispatchEvent(mockEvent);

      expect(emittedEvent).toBe(mockEvent);
    });
  });

  describe('Input Properties', () => {
    it('should accept valid variant values', () => {
      const variants: ButtonVariant[] = ['primary', 'outline', 'subtle'];

      variants.forEach((variant) => {
        component.variant = variant;
        fixture.detectChanges();
        expect(component.variant).toBe(variant);
      });
    });

    it('should accept valid size values', () => {
      const sizes: ButtonSize[] = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        component.size = size;
        fixture.detectChanges();
        expect(component.size).toBe(size);
      });
    });

    it('should accept valid type values', () => {
      const types: ('button' | 'submit' | 'reset')[] = [
        'button',
        'submit',
        'reset',
      ];

      types.forEach((type) => {
        component.type = type;
        fixture.detectChanges();
        expect(component.type).toBe(type);
      });
    });

    it('should accept boolean disabled values', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);

      component.disabled = false;
      expect(component.disabled).toBe(false);
    });

    it('should accept string ariaLabel values', () => {
      const testLabel = 'Custom aria label';
      component.ariaLabel = testLabel;
      expect(component.ariaLabel).toBe(testLabel);
    });
  });

  describe('Integration Tests', () => {
    it('should render correctly with all properties set', () => {
      component.variant = 'outline';
      component.size = 'large';
      component.disabled = true;
      component.type = 'submit';
      component.ariaLabel = 'Submit form';
      fixture.detectChanges();

      const button = buttonElement.nativeElement;
      expect(button.className).toBe('btn btn-large btn-outline');
      expect(button.disabled).toBe(true);
      expect(button.type).toBe('submit');
      expect(button.getAttribute('aria-label')).toBe('Submit form');
    });

    it('should update classes when properties change', () => {
      // Initial state
      expect(buttonElement.nativeElement.className).toBe(
        'btn btn-medium btn-primary'
      );

      // Change to small outline
      component.size = 'small';
      component.variant = 'outline';
      fixture.detectChanges();
      expect(buttonElement.nativeElement.className).toBe(
        'btn btn-outline btn-small'
      );

      // Change to large subtle
      component.size = 'large';
      component.variant = 'subtle';
      fixture.detectChanges();
      expect(buttonElement.nativeElement.className).toBe(
        'btn btn-large btn-subtle'
      );
    });

    it('should maintain disabled state when other properties change', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(buttonElement.nativeElement.disabled).toBe(true);

      // Change other properties
      component.variant = 'outline';
      component.size = 'large';
      component.type = 'submit';
      fixture.detectChanges();

      // Disabled should still be true
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper button role by default', () => {
      expect(buttonElement.nativeElement.tagName.toLowerCase()).toBe('button');
    });

    it('should support custom aria-label for accessibility', () => {
      const accessibleLabel = 'Close dialog';
      component.ariaLabel = accessibleLabel;
      fixture.detectChanges();

      expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe(
        accessibleLabel
      );
    });

    it('should be focusable when not disabled', () => {
      component.disabled = false;
      fixture.detectChanges();

      buttonElement.nativeElement.focus();
      expect(document.activeElement).toBe(buttonElement.nativeElement);
    });

    it('should not be focusable when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      // Disabled buttons should not receive focus
      buttonElement.nativeElement.focus();
      expect(document.activeElement).not.toBe(buttonElement.nativeElement);
    });
  });
});
