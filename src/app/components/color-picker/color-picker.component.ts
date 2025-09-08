import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  readonly themeService = inject(ThemeService);

  primaryColor = '#00b207'; // Your primary green
  secondaryColor = '#618062'; // Your secondary green-gray

  constructor() {
    // Initialize with current theme colors
    const currentColors = this.themeService.customColors();
    if (currentColors.primaryColor) {
      this.primaryColor = currentColors.primaryColor;
    }
    if (currentColors.secondaryColor) {
      this.secondaryColor = currentColors.secondaryColor;
    }
  }

  updatePrimaryColor(): void {
    if (this.isValidHexColor(this.primaryColor)) {
      this.themeService.setCustomColors({
        primaryColor: this.primaryColor,
      });
    }
  }

  updateSecondaryColor(): void {
    if (this.isValidHexColor(this.secondaryColor)) {
      this.themeService.setCustomColors({
        secondaryColor: this.secondaryColor,
      });
    }
  }

  applyColors(): void {
    if (
      this.isValidHexColor(this.primaryColor) &&
      this.isValidHexColor(this.secondaryColor)
    ) {
      this.themeService.setCustomColors({
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor,
      });
    }
  }

  resetColors(): void {
    this.primaryColor = '#00b207'; // Your primary green
    this.secondaryColor = '#618062'; // Your secondary green-gray
    this.themeService.resetTheme();
  }

  private isValidHexColor(color: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  }
}
