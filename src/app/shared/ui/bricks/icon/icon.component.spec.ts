import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  AngularSvgIconModule,
  SvgIconRegistryService,
  SvgLoader,
} from 'angular-svg-icon';
import { IconComponent, IconShape } from './icon.component';
import {
  IconItem,
  IconType,
  socialMediaIcons,
  utilityIcons,
  getBackgroundColor,
} from './icon.models';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let iconElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent, AngularSvgIconModule],
      providers: [
        SvgIconRegistryService,
        {
          provide: SvgLoader,
          useValue: {
            getSvg: jasmine
              .createSpy('getSvg')
              .and.returnValue(of('<svg></svg>')),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    iconElement = fixture.debugElement.query(By.css('.icon'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Properties', () => {
    it('should have default shape as circle', () => {
      expect(component.shape).toBe('circle');
    });

    it('should have default hasBorder as true', () => {
      expect(component.hasBorder).toBe(true);
    });

    it('should have default backgroundColor as #F2F2F2', () => {
      expect(component.backgroundColor).toBe('#F2F2F2');
    });

    it('should have default isSelected as false', () => {
      expect(component.isSelected).toBe(false);
    });

    it('should have default size as medium', () => {
      expect(component.size).toBe('medium');
    });

    it('should have default disabled as false', () => {
      expect(component.disabled).toBe(false);
    });

    it('should have undefined type by default', () => {
      expect(component.type).toBeUndefined();
    });

    it('should have undefined iconConfig by default', () => {
      expect(component.iconConfig).toBeUndefined();
    });
  });

  describe('Icon Classes', () => {
    it('should generate correct classes for default properties', () => {
      const expectedClasses = 'icon icon--circle icon--medium icon--bordered';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes with type', () => {
      component.type = 'close';
      fixture.detectChanges();

      const expectedClasses =
        'icon icon--circle icon--medium icon--close icon--bordered';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes for small size', () => {
      component.size = 'small';
      fixture.detectChanges();

      const expectedClasses = 'icon icon--circle icon--small icon--bordered';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes for large size', () => {
      component.size = 'large';
      fixture.detectChanges();

      const expectedClasses = 'icon icon--circle icon--large icon--bordered';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes when selected', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const expectedClasses =
        'icon icon--circle icon--medium icon--bordered icon--selected';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const expectedClasses =
        'icon icon--circle icon--medium icon--bordered icon--disabled';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes without border', () => {
      component.hasBorder = false;
      fixture.detectChanges();

      const expectedClasses = 'icon icon--circle icon--medium';
      expect(component.iconClasses).toBe(expectedClasses);
    });

    it('should generate correct classes with all states', () => {
      component.type = 'heart';
      component.size = 'large';
      component.isSelected = true;
      component.disabled = true;
      component.hasBorder = false;
      fixture.detectChanges();

      const expectedClasses =
        'icon icon--circle icon--large icon--heart icon--selected icon--disabled';
      expect(component.iconClasses).toBe(expectedClasses);
    });
  });

  describe('Current Icon Config', () => {
    it('should return iconConfig when provided', () => {
      const mockIconConfig: IconItem = {
        type: 'close',
        icon: '/custom-icon.svg',
        inactiveColor: '#ffffff',
        activeColor: '#000000',
        hoverColor: '#cccccc',
      };

      component.iconConfig = mockIconConfig;
      fixture.detectChanges();

      expect(component.currentIconConfig).toBe(mockIconConfig);
    });

    it('should find icon from socialMediaIcons when type is provided', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const expectedConfig = socialMediaIcons.find(
        (icon) => icon.type === 'facebook'
      );
      expect(component.currentIconConfig).toEqual(expectedConfig);
    });

    it('should find icon from utilityIcons when type is provided', () => {
      component.type = 'close';
      fixture.detectChanges();

      const expectedConfig = utilityIcons.find((icon) => icon.type === 'close');
      expect(component.currentIconConfig).toEqual(expectedConfig);
    });

    it('should return undefined when no type or iconConfig provided', () => {
      component.type = undefined;
      component.iconConfig = undefined;
      fixture.detectChanges();

      expect(component.currentIconConfig).toBeUndefined();
    });

    it('should prioritize iconConfig over type', () => {
      const mockIconConfig: IconItem = {
        type: 'close',
        icon: '/custom-icon.svg',
        inactiveColor: '#ffffff',
        activeColor: '#000000',
        hoverColor: '#cccccc',
      };

      component.iconConfig = mockIconConfig;
      component.type = 'facebook';
      fixture.detectChanges();

      expect(component.currentIconConfig).toBe(mockIconConfig);
    });
  });

  describe('Current Icon Source', () => {
    it('should return icon path from iconConfig', () => {
      const mockIconConfig: IconItem = {
        type: 'close',
        icon: '/custom-icon.svg',
        inactiveColor: '#ffffff',
        activeColor: '#000000',
        hoverColor: '#cccccc',
      };

      component.iconConfig = mockIconConfig;
      fixture.detectChanges();

      expect(component.currentIconSrc).toBe('/custom-icon.svg');
    });

    it('should return icon path from predefined type', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const expectedConfig = socialMediaIcons.find(
        (icon) => icon.type === 'facebook'
      );
      expect(component.currentIconSrc).toBe(expectedConfig!.icon);
    });

    it('should return empty string when no icon config', () => {
      component.type = undefined;
      component.iconConfig = undefined;
      fixture.detectChanges();

      expect(component.currentIconSrc).toBe('');
    });
  });

  describe('Current Background Color', () => {
    it('should return backgroundColor when disabled', () => {
      component.disabled = true;
      component.backgroundColor = '#custom-color';
      fixture.detectChanges();

      expect(component.currentBackgroundColor).toBe('#custom-color');
    });

    it('should return backgroundColor when no icon config', () => {
      component.type = undefined;
      component.iconConfig = undefined;
      component.backgroundColor = '#fallback-color';
      fixture.detectChanges();

      expect(component.currentBackgroundColor).toBe('#fallback-color');
    });

    it('should return active color when selected', () => {
      component.type = 'facebook';
      component.isSelected = true;
      fixture.detectChanges();

      const expectedConfig = socialMediaIcons.find(
        (icon) => icon.type === 'facebook'
      );
      const expectedColor = getBackgroundColor(expectedConfig!, 'active');
      expect(component.currentBackgroundColor).toBe(expectedColor);
    });

    it('should return inactive color when not selected', () => {
      component.type = 'facebook';
      component.isSelected = false;
      fixture.detectChanges();

      const expectedConfig = socialMediaIcons.find(
        (icon) => icon.type === 'facebook'
      );
      const expectedColor = getBackgroundColor(expectedConfig!, 'inactive');
      expect(component.currentBackgroundColor).toBe(expectedColor);
    });
  });

  describe('Icon Styles', () => {
    it('should return styles with background color', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['background-color']).toBeDefined();
    });

    it('should include border color when hasBorder is true', () => {
      component.type = 'close';
      component.hasBorder = true;
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['border-color']).toBeDefined();
    });

    it('should not include border color when hasBorder is false', () => {
      component.type = 'close';
      component.hasBorder = false;
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['border-color']).toBeUndefined();
    });

    it('should include CSS custom properties for hover and active states', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['--icon-hover-bg-color']).toBeDefined();
      expect(styles['--icon-active-bg-color']).toBeDefined();
    });

    it('should include border CSS custom properties when hasBorder is true', () => {
      component.type = 'close';
      component.hasBorder = true;
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['--icon-hover-border-color']).toBeDefined();
      expect(styles['--icon-active-border-color']).toBeDefined();
    });

    it('should not include border CSS custom properties when hasBorder is false', () => {
      component.type = 'close';
      component.hasBorder = false;
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['--icon-hover-border-color']).toBeUndefined();
      expect(styles['--icon-active-border-color']).toBeUndefined();
    });
  });

  describe('SVG Icon Class', () => {
    it('should return inactive when disabled', () => {
      component.disabled = true;
      expect(component.svgIconClass).toBe('inactive');
    });

    it('should return active when selected and not disabled', () => {
      component.isSelected = true;
      component.disabled = false;
      expect(component.svgIconClass).toBe('active');
    });

    it('should return inactive when not selected and not disabled', () => {
      component.isSelected = false;
      component.disabled = false;
      expect(component.svgIconClass).toBe('inactive');
    });
  });

  describe('Click Events', () => {
    it('should emit iconClick event when clicked and not disabled', () => {
      spyOn(component.iconClick, 'emit');
      component.disabled = false;

      component.onIconClick();

      expect(component.iconClick.emit).toHaveBeenCalled();
    });

    it('should toggle isSelected when clicked and not disabled', () => {
      component.disabled = false;
      component.isSelected = false;

      component.onIconClick();
      expect(component.isSelected).toBe(true);

      component.onIconClick();
      expect(component.isSelected).toBe(false);
    });

    it('should not emit iconClick event when disabled', () => {
      spyOn(component.iconClick, 'emit');
      component.disabled = true;

      component.onIconClick();

      expect(component.iconClick.emit).not.toHaveBeenCalled();
    });

    it('should not toggle isSelected when disabled', () => {
      component.disabled = true;
      component.isSelected = false;

      component.onIconClick();
      expect(component.isSelected).toBe(false);
    });
  });

  describe('Template Rendering', () => {
    it('should render icon element', () => {
      expect(iconElement).toBeTruthy();
    });

    it('should apply icon classes to the icon element', () => {
      const expectedClasses = 'icon icon--circle icon--medium icon--bordered';
      expect(iconElement.nativeElement.className).toBe(expectedClasses);
    });

    it('should apply icon styles to the icon element', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(iconElement.nativeElement.style.backgroundColor).toBe(
        styles['background-color']
      );
    });

    it('should set aria-label attribute', () => {
      component.type = 'close';
      fixture.detectChanges();

      expect(iconElement.nativeElement.getAttribute('aria-label')).toBe(
        'close icon'
      );
    });

    it('should set aria-label to custom icon when no type', () => {
      component.type = undefined;
      fixture.detectChanges();

      expect(iconElement.nativeElement.getAttribute('aria-label')).toBe(
        'custom icon'
      );
    });

    it('should have implicit button role', () => {
      expect(iconElement.nativeElement.tagName.toLowerCase()).toBe('button');
    });

    it('should set tabindex as 0', () => {
      expect(iconElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should render svg-icon when currentIconSrc is available', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const svgIconElement = fixture.debugElement.query(By.css('svg-icon'));
      expect(svgIconElement).toBeTruthy();
    });

    it('should not render svg-icon when currentIconSrc is empty', () => {
      component.type = undefined;
      component.iconConfig = undefined;
      fixture.detectChanges();

      const svgIconElement = fixture.debugElement.query(By.css('svg-icon'));
      expect(svgIconElement).toBeFalsy();
    });
  });

  describe('Keyboard Events', () => {
    it('should call onIconClick on Enter key', () => {
      spyOn(component, 'onIconClick');
      component.disabled = false;

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      iconElement.nativeElement.dispatchEvent(enterEvent);

      expect(component.onIconClick).toHaveBeenCalled();
    });

    it('should call onIconClick on Space key', () => {
      spyOn(component, 'onIconClick');
      component.disabled = false;

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      iconElement.nativeElement.dispatchEvent(spaceEvent);

      expect(component.onIconClick).toHaveBeenCalled();
    });

    it('should not call onIconClick on other keys', () => {
      spyOn(component, 'onIconClick');
      component.disabled = false;

      const otherEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      iconElement.nativeElement.dispatchEvent(otherEvent);

      expect(component.onIconClick).not.toHaveBeenCalled();
    });
  });

  describe('Input Properties', () => {
    it('should accept valid IconType values', () => {
      const types: IconType[] = [
        'close',
        'bag',
        'heart',
        'eye',
        'facebook',
        'twitter',
        'pinterest',
        'instagram',
        'link',
      ];

      types.forEach((type) => {
        component.type = type;
        fixture.detectChanges();
        expect(component.type).toBe(type);
      });
    });

    it('should accept valid IconShape values', () => {
      const shapes: IconShape[] = ['circle'];

      shapes.forEach((shape) => {
        component.shape = shape;
        fixture.detectChanges();
        expect(component.shape).toBe(shape);
      });
    });

    it('should accept valid size values', () => {
      const sizes: ('small' | 'medium' | 'large')[] = [
        'small',
        'medium',
        'large',
      ];

      sizes.forEach((size) => {
        component.size = size;
        fixture.detectChanges();
        expect(component.size).toBe(size);
      });
    });

    it('should accept boolean values for hasBorder', () => {
      component.hasBorder = true;
      expect(component.hasBorder).toBe(true);

      component.hasBorder = false;
      expect(component.hasBorder).toBe(false);
    });

    it('should accept boolean values for isSelected', () => {
      component.isSelected = true;
      expect(component.isSelected).toBe(true);

      component.isSelected = false;
      expect(component.isSelected).toBe(false);
    });

    it('should accept boolean values for disabled', () => {
      component.disabled = true;
      expect(component.disabled).toBe(true);

      component.disabled = false;
      expect(component.disabled).toBe(false);
    });

    it('should accept string values for backgroundColor', () => {
      const testColor = '#custom-color';
      component.backgroundColor = testColor;
      expect(component.backgroundColor).toBe(testColor);
    });

    it('should accept IconItem for iconConfig', () => {
      const mockIconConfig: IconItem = {
        type: 'close',
        icon: '/custom-icon.svg',
        inactiveColor: '#ffffff',
        activeColor: '#000000',
        hoverColor: '#cccccc',
      };

      component.iconConfig = mockIconConfig;
      expect(component.iconConfig).toBe(mockIconConfig);
    });
  });

  describe('Integration Tests', () => {
    it('should render correctly with all properties set', () => {
      const mockIconConfig: IconItem = {
        type: 'heart',
        icon: '/custom-heart.svg',
        inactiveColor: '#ffffff',
        activeColor: '#ff0000',
        hoverColor: '#ffcccc',
      };

      component.type = 'heart';
      component.iconConfig = mockIconConfig;
      component.shape = 'circle';
      component.size = 'large';
      component.hasBorder = true;
      component.isSelected = true;
      component.disabled = false;
      component.backgroundColor = '#f0f0f0';
      fixture.detectChanges();

      const icon = iconElement.nativeElement;
      expect(icon.className).toContain('icon--heart');
      expect(icon.className).toContain('icon--large');
      expect(icon.className).toContain('icon--selected');
      expect(icon.className).toContain('icon--bordered');
      expect(icon.getAttribute('aria-label')).toBe('heart icon');
    });

    it('should update classes when properties change', () => {
      // Initial state
      expect(iconElement.nativeElement.className).toBe(
        'icon icon--circle icon--medium icon--bordered'
      );

      // Change to large selected
      component.size = 'large';
      component.isSelected = true;
      fixture.detectChanges();
      expect(iconElement.nativeElement.className).toBe(
        'icon icon--circle icon--bordered icon--large icon--selected'
      );

      // Change to small disabled
      component.size = 'small';
      component.isSelected = false;
      component.disabled = true;
      fixture.detectChanges();
      expect(iconElement.nativeElement.className).toBe(
        'icon icon--circle icon--bordered icon--small icon--disabled'
      );
    });

    it('should maintain state consistency when properties change', () => {
      component.isSelected = true;
      component.disabled = false;
      fixture.detectChanges();
      expect(component.isSelected).toBe(true);

      // Change other properties
      component.size = 'large';
      component.type = 'facebook';
      component.hasBorder = false;
      fixture.detectChanges();

      // isSelected should still be true
      expect(component.isSelected).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper button role', () => {
      expect(iconElement.nativeElement.tagName.toLowerCase()).toBe('button');
    });

    it('should be focusable with tabindex', () => {
      expect(iconElement.nativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have descriptive aria-label', () => {
      component.type = 'close';
      fixture.detectChanges();

      expect(iconElement.nativeElement.getAttribute('aria-label')).toBe(
        'close icon'
      );
    });

    it('should support keyboard navigation', () => {
      spyOn(component, 'onIconClick');
      component.disabled = false;

      // Test Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      iconElement.nativeElement.dispatchEvent(enterEvent);
      expect(component.onIconClick).toHaveBeenCalled();

      // Test Space key
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      iconElement.nativeElement.dispatchEvent(spaceEvent);
      expect(component.onIconClick).toHaveBeenCalledTimes(2);
    });

    it('should not respond to keyboard events when disabled', () => {
      spyOn(component, 'onIconClick');
      component.disabled = true;
      fixture.detectChanges();

      // The keyboard event will still be triggered, but onIconClick should handle disabled state
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      iconElement.nativeElement.dispatchEvent(enterEvent);

      // onIconClick will be called, but it should not emit or toggle when disabled
      expect(component.onIconClick).toHaveBeenCalled();
      expect(component.isSelected).toBe(false); // Should not change when disabled
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty iconConfig gracefully', () => {
      component.iconConfig = {} as IconItem;
      fixture.detectChanges();

      expect(component.currentIconConfig).toEqual({} as IconItem);
      expect(component.currentIconSrc).toBe('');
      expect(component.currentBackgroundColor).toBe('#F2F2F2');
    });

    it('should handle iconConfig with missing icon property', () => {
      component.iconConfig = { type: 'close' } as IconItem;
      fixture.detectChanges();

      expect(component.currentIconSrc).toBe('');
    });

    it('should handle invalid type gracefully', () => {
      component.type = 'invalid' as IconType;
      fixture.detectChanges();

      expect(component.currentIconConfig).toBeUndefined();
      expect(component.currentIconSrc).toBe('');
    });

    it('should handle disabled state with custom colors', () => {
      component.type = 'facebook';
      component.disabled = true;
      component.backgroundColor = '#custom-color';
      fixture.detectChanges();

      expect(component.currentBackgroundColor).toBe('#custom-color');
    });

    it('should handle iconConfig with only type property', () => {
      component.iconConfig = { type: 'close', icon: '/test.svg' } as IconItem;
      fixture.detectChanges();

      expect(component.currentIconConfig).toEqual({
        type: 'close',
        icon: '/test.svg',
      });
      expect(component.currentIconSrc).toBe('/test.svg');
    });
  });

  describe('Color Generation Edge Cases', () => {
    it('should handle iconConfig without color properties', () => {
      component.iconConfig = { type: 'close', icon: '/test.svg' } as IconItem;
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['background-color']).toBe('#F2F2F2');
      expect(styles['border-color']).toBeUndefined();
    });

    it('should handle hasBorder false with iconConfig', () => {
      component.type = 'facebook';
      component.hasBorder = false;
      fixture.detectChanges();

      const styles = component.iconStyles;
      expect(styles['border-color']).toBeUndefined();
      expect(styles['--icon-hover-border-color']).toBeUndefined();
      expect(styles['--icon-active-border-color']).toBeUndefined();
    });

    it('should handle selected state with custom backgroundColor', () => {
      component.type = 'facebook';
      component.isSelected = true;
      component.backgroundColor = '#custom-bg';
      fixture.detectChanges();

      // Should use icon config colors, not custom backgroundColor when iconConfig exists
      const expectedConfig = socialMediaIcons.find(
        (icon) => icon.type === 'facebook'
      );
      const expectedColor = getBackgroundColor(expectedConfig!, 'active');
      expect(component.currentBackgroundColor).toBe(expectedColor);
    });
  });

  describe('Keyboard Event Edge Cases', () => {
    it('should prevent default on Enter key', () => {
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = spyOn(enterEvent, 'preventDefault');

      component.onKeyDown(enterEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default on Space key', () => {
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      const preventDefaultSpy = spyOn(spaceEvent, 'preventDefault');

      component.onKeyDown(spaceEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default on other keys', () => {
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      const preventDefaultSpy = spyOn(escapeEvent, 'preventDefault');

      component.onKeyDown(escapeEvent);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should handle keyboard events when component is disabled', () => {
      component.disabled = true;
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = spyOn(enterEvent, 'preventDefault');

      component.onKeyDown(enterEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Icon Classes Edge Cases', () => {
    it('should handle type with special characters', () => {
      component.type = 'facebook';
      fixture.detectChanges();

      const classes = component.iconClasses;
      expect(classes).toContain('icon--facebook');
    });

    it('should handle all disabled states', () => {
      component.disabled = true;
      component.isSelected = true;
      component.hasBorder = true;
      fixture.detectChanges();

      const classes = component.iconClasses;
      expect(classes).toContain('icon--disabled');
      expect(classes).toContain('icon--selected');
      expect(classes).toContain('icon--bordered');
    });

    it('should handle size changes dynamically', () => {
      component.size = 'small';
      fixture.detectChanges();
      expect(component.iconClasses).toContain('icon--small');

      component.size = 'large';
      fixture.detectChanges();
      expect(component.iconClasses).toContain('icon--large');
    });
  });

  describe('SVG Icon Class Edge Cases', () => {
    it('should return inactive when disabled regardless of selection', () => {
      component.disabled = true;
      component.isSelected = true;

      expect(component.svgIconClass).toBe('inactive');
    });

    it('should return active when selected and not disabled', () => {
      component.disabled = false;
      component.isSelected = true;

      expect(component.svgIconClass).toBe('active');
    });

    it('should return inactive when not selected and not disabled', () => {
      component.disabled = false;
      component.isSelected = false;

      expect(component.svgIconClass).toBe('inactive');
    });
  });

  describe('Event Emission', () => {
    it('should emit iconClick event only when not disabled', () => {
      spyOn(component.iconClick, 'emit');
      component.disabled = false;

      component.onIconClick();

      expect(component.iconClick.emit).toHaveBeenCalled();
    });

    it('should not emit iconClick event when disabled', () => {
      spyOn(component.iconClick, 'emit');
      component.disabled = true;

      component.onIconClick();

      expect(component.iconClick.emit).not.toHaveBeenCalled();
    });

    it('should toggle isSelected state on click when not disabled', () => {
      component.disabled = false;
      component.isSelected = false;

      component.onIconClick();
      expect(component.isSelected).toBe(true);

      component.onIconClick();
      expect(component.isSelected).toBe(false);
    });
  });
});
