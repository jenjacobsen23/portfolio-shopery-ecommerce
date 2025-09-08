import { TestBed } from '@angular/core/testing';
import { ThemeService, ThemeMode, ThemeConfig } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Default Properties', () => {
    it('should have default theme mode as light', () => {
      expect(service.themeMode()).toBe('light');
    });

    it('should have empty custom colors by default', () => {
      expect(service.customColors()).toEqual({});
    });

    it('should not be in dark mode by default', () => {
      expect(service.isDarkMode()).toBe(false);
    });

    it('should return correct current theme', () => {
      const currentTheme = service.currentTheme();
      expect(currentTheme.mode).toBe('light');
      expect(currentTheme.isDark).toBe(false);
      expect(currentTheme.colors).toEqual({});
    });
  });

  describe('Theme Mode Management', () => {
    it('should set theme mode to dark', () => {
      service.setThemeMode('dark');
      expect(service.themeMode()).toBe('dark');
      expect(service.isDarkMode()).toBe(true);
    });

    it('should set theme mode to light', () => {
      service.setThemeMode('light');
      expect(service.themeMode()).toBe('light');
      expect(service.isDarkMode()).toBe(false);
    });

    it('should set theme mode to system', () => {
      service.setThemeMode('system');
      expect(service.themeMode()).toBe('system');
    });

    it('should save theme mode to localStorage', () => {
      service.setThemeMode('dark');
      expect(localStorage.getItem('theme-mode')).toBe('dark');
    });

    it('should load theme mode from localStorage on initialization', () => {
      localStorage.setItem('theme-mode', 'dark');
      // Create a new service instance to test initialization
      const newService = new ThemeService();
      expect(newService.themeMode()).toBe('dark');
    });

    it('should handle invalid theme mode from localStorage', () => {
      localStorage.setItem('theme-mode', 'invalid');
      const newService = new ThemeService();
      expect(newService.themeMode()).toBe('light'); // Should default to light
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle from light to dark', () => {
      service.setThemeMode('light');
      service.toggleTheme();
      expect(service.themeMode()).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      service.setThemeMode('dark');
      service.toggleTheme();
      expect(service.themeMode()).toBe('light');
    });

    it('should not toggle when in system mode', () => {
      service.setThemeMode('system');
      service.toggleTheme();
      expect(service.themeMode()).toBe('light'); // Should go to light, not stay system
    });
  });

  describe('Custom Colors', () => {
    it('should set custom primary color', () => {
      const colors = { primaryColor: '#ff0000' };
      service.setCustomColors(colors);
      expect(service.customColors()).toEqual(colors);
    });

    it('should set custom secondary color', () => {
      const colors = { secondaryColor: '#00ff00' };
      service.setCustomColors(colors);
      expect(service.customColors()).toEqual(colors);
    });

    it('should set both primary and secondary colors', () => {
      const colors = { primaryColor: '#ff0000', secondaryColor: '#00ff00' };
      service.setCustomColors(colors);
      expect(service.customColors()).toEqual(colors);
    });

    it('should save custom colors to localStorage', () => {
      const colors = { primaryColor: '#ff0000' };
      service.setCustomColors(colors);
      expect(localStorage.getItem('theme-colors')).toBe(JSON.stringify(colors));
    });

    it('should load custom colors from localStorage on initialization', () => {
      const colors = { primaryColor: '#ff0000' };
      localStorage.setItem('theme-colors', JSON.stringify(colors));
      const newService = new ThemeService();
      expect(newService.customColors()).toEqual(colors);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('theme-colors', 'invalid-json');
      const consoleSpy = spyOn(console, 'warn');
      const newService = new ThemeService();
      expect(newService.customColors()).toEqual({});
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('System Preference', () => {
    let mockMatchMedia: jasmine.Spy;

    beforeEach(() => {
      // Mock matchMedia
      mockMatchMedia = jasmine.createSpy('matchMedia').and.returnValue({
        matches: false,
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
      });
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: mockMatchMedia,
      });
    });

    it('should return system preference for dark mode', () => {
      mockMatchMedia.and.returnValue({ matches: true } as any);

      service.setThemeMode('system');
      expect(service.isDarkMode()).toBe(true);
    });

    it('should return system preference for light mode', () => {
      mockMatchMedia.and.returnValue({ matches: false } as any);

      service.setThemeMode('system');
      expect(service.isDarkMode()).toBe(false);
    });

    it('should watch for system preference changes', () => {
      const mockMediaQuery = {
        matches: false,
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
      };
      mockMatchMedia.and.returnValue(mockMediaQuery);

      service.watchSystemPreference();
      expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
        'change',
        jasmine.any(Function)
      );
    });

    it('should apply system theme based on preference', () => {
      mockMatchMedia.and.returnValue({ matches: true } as any);

      service.setThemeMode('system');
      const root = document.documentElement;
      expect(root.getAttribute('data-theme')).toBe('dark');
      expect(root.classList.contains('dark')).toBe(true);
    });
  });

  describe('Color Shade Generation', () => {
    it('should generate color shades for primary color', () => {
      const colors = { primaryColor: '#ff0000' };
      service.setCustomColors(colors);

      // Check if CSS custom properties are set
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-primary-500')).toBe(
        '#ff0000'
      );
    });

    it('should generate color shades for secondary color', () => {
      const colors = { secondaryColor: '#00ff00' };
      service.setCustomColors(colors);

      // Check if CSS custom properties are set
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-secondary-500')).toBe(
        '#00ff00'
      );
    });

    it('should handle invalid color format gracefully', () => {
      // Use a color that will cause issues in the parsing logic
      const colors = { primaryColor: 'invalid-color' };
      service.setCustomColors(colors);

      // Should not throw error and should still set the base color
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--color-primary-500')).toBe(
        'invalid-color'
      );
    });
  });

  describe('Theme Application', () => {
    it('should apply dark theme to document', () => {
      service.setThemeMode('dark');
      const root = document.documentElement;
      expect(root.getAttribute('data-theme')).toBe('dark');
      expect(root.classList.contains('dark')).toBe(true);
    });

    it('should apply light theme to document', () => {
      service.setThemeMode('light');
      const root = document.documentElement;
      expect(root.getAttribute('data-theme')).toBeNull();
      expect(root.classList.contains('dark')).toBe(false);
    });
  });

  describe('Theme Reset', () => {
    it('should reset theme to default values', () => {
      // Set some custom values
      service.setThemeMode('dark');
      service.setCustomColors({ primaryColor: '#ff0000' });

      // Reset
      service.resetTheme();

      expect(service.themeMode()).toBe('light');
      expect(service.customColors()).toEqual({});
      expect(localStorage.getItem('theme-mode')).toBeNull();
      expect(localStorage.getItem('theme-colors')).toBeNull();
    });

    it('should apply default theme after reset', () => {
      service.setThemeMode('dark');
      service.resetTheme();

      const root = document.documentElement;
      expect(root.getAttribute('data-theme')).toBeNull();
      expect(root.classList.contains('dark')).toBe(false);
    });
  });

  describe('Available Modes', () => {
    it('should return all available theme modes', () => {
      const modes = service.getAvailableModes();
      expect(modes).toEqual(['light', 'dark', 'system']);
    });
  });

  describe('Readonly Signals', () => {
    it('should provide readonly access to theme mode', () => {
      const mode = service.themeMode();
      expect(typeof mode).toBe('string');
      expect(['light', 'dark', 'system']).toContain(mode);
    });

    it('should provide readonly access to custom colors', () => {
      const colors = service.customColors();
      expect(typeof colors).toBe('object');
    });

    it('should provide computed dark mode state', () => {
      const isDark = service.isDarkMode();
      expect(typeof isDark).toBe('boolean');
    });

    it('should provide computed current theme', () => {
      const theme = service.currentTheme();
      expect(theme.mode).toBeDefined();
      expect(theme.isDark).toBeDefined();
      expect(theme.colors).toBeDefined();
    });
  });

  describe('Integration Tests', () => {
    it('should maintain state consistency across multiple operations', () => {
      // Set dark mode with custom colors
      service.setThemeMode('dark');
      service.setCustomColors({
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
      });

      // Verify state
      expect(service.themeMode()).toBe('dark');
      expect(service.isDarkMode()).toBe(true);
      expect(service.customColors()).toEqual({
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
      });

      // Toggle theme
      service.toggleTheme();
      expect(service.themeMode()).toBe('light');
      expect(service.isDarkMode()).toBe(false);
      expect(service.customColors()).toEqual({
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
      });
    });

    it('should persist and restore complete theme state', () => {
      // Set complete theme state
      service.setThemeMode('dark');
      service.setCustomColors({
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
      });

      // Create new service instance (simulating page reload)
      const newService = new ThemeService();

      // Verify state is restored
      expect(newService.themeMode()).toBe('dark');
      expect(newService.isDarkMode()).toBe(true);
      expect(newService.customColors()).toEqual({
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
      });
    });
  });
});
