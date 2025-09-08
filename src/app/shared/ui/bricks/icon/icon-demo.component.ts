import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-icon-demo',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="icon-demo">
      <h2>Icon Component Demo</h2>

      <!-- Predefined Icons -->
      <section class="demo-section">
        <h3>Predefined Icons</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <h4>X Icon</h4>
            <app-icon type="close" size="medium"></app-icon>
            <app-icon type="close" size="medium" [isSelected]="true"></app-icon>
          </div>

          <div class="icon-item">
            <h4>Bag Icon</h4>
            <app-icon type="bag" size="medium"></app-icon>
            <app-icon type="bag" size="medium" [isSelected]="true"></app-icon>
          </div>

          <div class="icon-item">
            <h4>Heart Icon</h4>
            <app-icon type="heart" size="medium"></app-icon>
            <app-icon type="heart" size="medium" [isSelected]="true"></app-icon>
          </div>
        </div>
      </section>

      <!-- SVG File Icons -->
      <section class="demo-section">
        <h3>SVG File Icons</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <h4>Custom SVG</h4>
            <app-icon
              iconSrc="assets/icons/custom-icon.svg"
              size="medium"
              [hasBorder]="true"
            ></app-icon>
          </div>
        </div>
      </section>

      <!-- Size Variants -->
      <section class="demo-section">
        <h3>Size Variants</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <h4>Small</h4>
            <app-icon type="close" size="small"></app-icon>
          </div>
          <div class="icon-item">
            <h4>Medium</h4>
            <app-icon type="close" size="medium"></app-icon>
          </div>
          <div class="icon-item">
            <h4>Large</h4>
            <app-icon type="close" size="large"></app-icon>
          </div>
        </div>
      </section>

      <!-- Shape Variants -->
      <section class="demo-section">
        <h3>Shape Variants</h3>
        <div class="icon-grid">
          <div class="icon-item">
            <h4>Circle</h4>
            <app-icon type="heart" shape="circle"></app-icon>
          </div>
          <div class="icon-item">
            <h4>Square</h4>
            <app-icon type="heart" shape="circle"></app-icon>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .icon-demo {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .demo-section {
        margin-bottom: 3rem;
        padding: 1.5rem;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
      }

      .demo-section h3 {
        margin-top: 0;
        color: #333;
        border-bottom: 2px solid #00b207;
        padding-bottom: 0.5rem;
      }

      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-top: 1rem;
      }

      .icon-item {
        text-align: center;
        padding: 1rem;
        border: 1px solid #f0f0f0;
        border-radius: 6px;
        background: #fafafa;
      }

      .icon-item h4 {
        margin: 0 0 1rem 0;
        color: #666;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .icon-item app-icon {
        margin: 0.5rem;
      }
    `,
  ],
})
export class IconDemoComponent {}
