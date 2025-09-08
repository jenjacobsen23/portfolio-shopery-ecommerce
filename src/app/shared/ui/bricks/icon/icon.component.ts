import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  IconType,
  IconItem,
  socialMediaIcons,
  utilityIcons,
  getBackgroundColor,
  getBorderColor,
} from './icon.models';

export type IconShape = 'circle';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() type?: IconType;
  @Input() iconConfig?: IconItem;
  @Input() shape: IconShape = 'circle';
  @Input() hasBorder = true;
  @Input() backgroundColor = '#F2F2F2';
  @Input() isSelected = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled = false;

  @Output() iconClick = new EventEmitter<void>();

  get iconClasses(): string {
    const classes = ['icon', `icon--${this.shape}`, `icon--${this.size}`];

    // Add type class only if using predefined type
    if (this.type) {
      classes.push(`icon--${this.type}`);
    }

    if (this.hasBorder) classes.push('icon--bordered');
    if (this.isSelected) classes.push('icon--selected');
    if (this.disabled) classes.push('icon--disabled');

    return classes.join(' ');
  }

  get currentIconConfig(): IconItem | undefined {
    if (this.iconConfig) {
      return this.iconConfig;
    }

    if (this.type) {
      // Search through all icon arrays to find the matching type
      const allIcons = [...socialMediaIcons, ...utilityIcons];
      return allIcons.find((icon) => icon.type === this.type);
    }

    return undefined;
  }

  get currentIconSrc(): string {
    return this.currentIconConfig?.icon || '';
  }

  get currentBackgroundColor(): string {
    if (this.disabled) return this.backgroundColor;
    if (!this.currentIconConfig) return this.backgroundColor;

    const state = this.isSelected ? 'active' : 'inactive';
    return getBackgroundColor(this.currentIconConfig, state);
  }

  get iconStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {
      'background-color': this.currentBackgroundColor,
    };

    // Add border color if border is enabled
    if (this.hasBorder && this.currentIconConfig) {
      const state = this.isSelected ? 'active' : 'inactive';
      styles['border-color'] = getBorderColor(this.currentIconConfig, state);
    }

    if (this.currentIconConfig) {
      const hoverBgColor = getBackgroundColor(this.currentIconConfig, 'hover');
      const activeBgColor = getBackgroundColor(
        this.currentIconConfig,
        'active'
      );

      styles['--icon-hover-bg-color'] = hoverBgColor;
      styles['--icon-active-bg-color'] = activeBgColor;

      // Add border colors if border is enabled
      if (this.hasBorder) {
        const hoverBorderColor = getBorderColor(
          this.currentIconConfig,
          'hover'
        );
        const activeBorderColor = getBorderColor(
          this.currentIconConfig,
          'active'
        );
        styles['--icon-hover-border-color'] = hoverBorderColor;
        styles['--icon-active-border-color'] = activeBorderColor;
      }
    }

    return styles;
  }

  get svgIconClass(): string {
    if (this.disabled) return 'inactive';
    return this.isSelected ? 'active' : 'inactive';
  }

  onIconClick(): void {
    if (!this.disabled) {
      this.isSelected = !this.isSelected;
      this.iconClick.emit();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onIconClick();
    }
  }
}
