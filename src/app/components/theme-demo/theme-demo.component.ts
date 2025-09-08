import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ButtonComponent } from '../../shared/ui/bricks/button/button.component';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../../shared/ui/bricks/icon/icon.component';
import {
  socialMediaIcons,
  utilityIcons,
} from '../../shared/ui/bricks/icon/icon.models';

@Component({
  selector: 'app-theme-demo',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    ColorPickerComponent,
    ButtonComponent,
    IconComponent,
  ],
  templateUrl: './theme-demo.component.html',
  styleUrl: './theme-demo.component.scss',
})
export class ThemeDemoComponent {
  readonly themeService = inject(ThemeService);
  readonly socialMediaIcons = socialMediaIcons;
  readonly utilityIcons = utilityIcons;
}
