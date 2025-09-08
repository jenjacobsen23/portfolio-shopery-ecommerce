import { Injectable, signal, computed } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  secondaryColor?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _themeMode = signal<ThemeMode>('light');
  private readonly _customColors = signal<Partial<ThemeConfig>>({});

  // Public signals
  readonly themeMode = this._themeMode.asReadonly();
  readonly customColors = this._customColors.asReadonly();

  // Computed values
  readonly isDarkMode = computed(() => {
    const mode = this._themeMode();
    if (mode === 'system') {
      return this.getSystemPreference();
    }
    return mode === 'dark';
  });

  readonly currentTheme = computed(() => ({
    mode: this._themeMode(),
    isDark: this.isDarkMode(),
    colors: this._customColors(),
  }));

  constructor() {
    this.initializeTheme();
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    const savedColors = localStorage.getItem('theme-colors');

    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      this._themeMode.set(savedMode);
    }

    if (savedColors) {
      try {
        const colors = JSON.parse(savedColors);
        this._customColors.set(colors);
      } catch (error) {
        console.warn('Failed to parse saved theme colors:', error);
      }
    }

    this.applyTheme();
  }

  /**
   * Set theme mode (light, dark, or system)
   */
  setThemeMode(mode: ThemeMode): void {
    this._themeMode.set(mode);
    localStorage.setItem('theme-mode', mode);
    this.applyTheme();
  }

  /**
   * Set custom colors for the theme
   */
  setCustomColors(colors: Partial<ThemeConfig>): void {
    this._customColors.set(colors);
    localStorage.setItem('theme-colors', JSON.stringify(colors));
    this.applyCustomColors();
  }

  /**
   * Toggle between light and dark modes
   */
  toggleTheme(): void {
    const currentMode = this._themeMode();
    const newMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  /**
   * Get system preference for dark mode
   */
  private getSystemPreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme(): void {
    const isDark = this.isDarkMode();
    const root = document.documentElement;

    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }
  }

  /**
   * Apply custom colors to CSS custom properties
   */
  private applyCustomColors(): void {
    const colors = this._customColors();
    const root = document.documentElement;

    if (colors.primaryColor) {
      root.style.setProperty('--color-primary-500', colors.primaryColor);
      // Generate shades for the primary color
      this.generateColorShades(colors.primaryColor, 'primary').forEach(
        (shade, key) => {
          root.style.setProperty(`--color-primary-${key}`, shade);
        }
      );
    }

    if (colors.secondaryColor) {
      root.style.setProperty('--color-secondary-500', colors.secondaryColor);
      // Generate shades for the secondary color
      this.generateColorShades(colors.secondaryColor, 'secondary').forEach(
        (shade, key) => {
          root.style.setProperty(`--color-secondary-${key}`, shade);
        }
      );
    }
  }

  /**
   * Generate color shades from a base color
   */
  private generateColorShades(
    baseColor: string,
    colorType: 'primary' | 'secondary'
  ): Map<string, string> {
    // Simple color shade generation - you might want to use a more sophisticated algorithm
    const shades = new Map<string, string>();

    try {
      // Convert hex to RGB for manipulation
      const hex = baseColor.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Generate lighter shades (50-400)
      for (let i = 50; i <= 400; i += 50) {
        const factor = (500 - i) / 500;
        const newR = Math.round(r + (255 - r) * factor);
        const newG = Math.round(g + (255 - g) * factor);
        const newB = Math.round(b + (255 - b) * factor);
        shades.set(
          i.toString(),
          `#${newR.toString(16).padStart(2, '0')}${newG
            .toString(16)
            .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
        );
      }

      // Generate darker shades (600-900)
      for (let i = 600; i <= 900; i += 100) {
        const factor = (i - 500) / 500;
        const newR = Math.round(r * (1 - factor));
        const newG = Math.round(g * (1 - factor));
        const newB = Math.round(b * (1 - factor));
        shades.set(
          i.toString(),
          `#${newR.toString(16).padStart(2, '0')}${newG
            .toString(16)
            .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
        );
      }

      // Base color
      shades.set('500', baseColor);
    } catch (error) {
      console.warn('Failed to generate color shades:', error);
      // Fallback to base color for all shades
      for (let i = 50; i <= 900; i += 50) {
        shades.set(i.toString(), baseColor);
      }
    }

    return shades;
  }

  /**
   * Reset theme to default
   */
  resetTheme(): void {
    this._themeMode.set('light');
    this._customColors.set({});
    localStorage.removeItem('theme-mode');
    localStorage.removeItem('theme-colors');
    this.applyTheme();
    this.applyCustomColors();
  }

  /**
   * Get available theme modes
   */
  getAvailableModes(): ThemeMode[] {
    return ['light', 'dark', 'system'];
  }

  /**
   * Listen for system theme preference changes
   */
  watchSystemPreference(): void {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this._themeMode() === 'system') {
          this.applyTheme();
        }
      });
    }
  }
}
