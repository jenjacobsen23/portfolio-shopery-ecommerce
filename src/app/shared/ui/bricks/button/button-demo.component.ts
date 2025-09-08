import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="button-demo">
      <h1 class="demo-title">Button Component Demo</h1>

      <!-- Primary Buttons -->
      <section class="demo-section">
        <h2 class="section-title">Primary Buttons</h2>
        <div class="button-grid">
          <div class="button-item">
            <h3>Small (94×36)</h3>
            <app-button
              variant="primary"
              size="small"
              (onClick)="handleClick('Primary Small')"
            >
              Button
            </app-button>
          </div>

          <div class="button-item">
            <h3>Medium (117×45)</h3>
            <app-button
              variant="primary"
              size="medium"
              (onClick)="handleClick('Primary Medium')"
            >
              Button
            </app-button>
          </div>

          <div class="button-item">
            <h3>Large (141×51)</h3>
            <app-button
              variant="primary"
              size="large"
              (onClick)="handleClick('Primary Large')"
            >
              Button
            </app-button>
          </div>
        </div>
      </section>

      <!-- Outline Buttons -->
      <section class="demo-section">
        <h2 class="section-title">Outline Buttons</h2>
        <div class="button-grid">
          <div class="button-item">
            <h3>Small (94×36)</h3>
            <app-button
              variant="outline"
              size="small"
              (onClick)="handleClick('Outline Small')"
            >
              Button
            </app-button>
          </div>

          <div class="button-item">
            <h3>Medium (117×45)</h3>
            <app-button
              variant="outline"
              size="medium"
              (onClick)="handleClick('Outline Medium')"
            >
              Button
            </app-button>
          </div>

          <div class="button-item">
            <h3>Large (141×51)</h3>
            <app-button
              variant="outline"
              size="large"
              (onClick)="handleClick('Outline Large')"
            >
              Button
            </app-button>
          </div>
        </div>
      </section>

      <!-- Subtle Buttons -->
      <section class="demo-section">
        <h2 class="section-title">Subtle Buttons</h2>
        <div class="button-grid">
          <div class="button-item">
            <h3>Small (94×36)</h3>
            <app-button
              variant="subtle"
              size="small"
              (onClick)="handleClick('Subtle Small')"
            >
              Button
            </app-button>
          </div>

          <div class="button-item">
            <h3>Medium (117×45)</h3>
            <app-button
              variant="subtle"
              size="medium"
              (onClick)="handleClick('Subtle Medium')"
            >
              Button
            </app-button>
          </div>

          <div class="button-item">
            <h3>Large (141×51)</h3>
            <app-button
              variant="subtle"
              size="large"
              (onClick)="handleClick('Subtle Large')"
            >
              Button
            </app-button>
          </div>
        </div>
      </section>

      <!-- Interactive Examples -->
      <section class="demo-section">
        <h2 class="section-title">Interactive Examples</h2>
        <div class="button-grid">
          <div class="button-item">
            <h3>Submit Button</h3>
            <app-button
              variant="primary"
              size="medium"
              type="submit"
              (onClick)="handleClick('Submit')"
            >
              Submit Form
            </app-button>
          </div>

          <div class="button-item">
            <h3>Disabled Button</h3>
            <app-button
              variant="primary"
              size="medium"
              [disabled]="true"
              (onClick)="handleClick('Disabled')"
            >
              Disabled
            </app-button>
          </div>

          <div class="button-item">
            <h3>Custom Label</h3>
            <app-button
              variant="outline"
              size="medium"
              ariaLabel="Custom accessible label"
              (onClick)="handleClick('Custom Label')"
            >
              Custom
            </app-button>
          </div>
        </div>
      </section>

      <!-- Click Log -->
      <section class="demo-section" *ngIf="clickLog.length > 0">
        <h2 class="section-title">Click Log</h2>
        <div class="click-log">
          <div class="log-item" *ngFor="let log of clickLog">
            <span class="log-time">{{ log.time | date : 'HH:mm:ss' }}</span>
            <span class="log-text">{{ log.text }}</span>
          </div>
        </div>
        <button class="clear-log" (click)="clearLog()">Clear Log</button>
      </section>
    </div>
  `,
  styles: [
    `
      .button-demo {
        padding: var(--spacing-6);
        max-width: 1200px;
        margin: 0 auto;
        font-family: var(--font-family-primary);
      }

      .demo-title {
        font-size: var(--font-size-4xl);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-8);
        text-align: center;
      }

      .demo-section {
        margin-bottom: var(--spacing-8);
        padding: var(--spacing-6);
        background-color: var(--color-background-secondary);
        border-radius: var(--border-radius-lg);
        border: 1px solid var(--color-border-primary);
      }

      .section-title {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-6);
        padding-bottom: var(--spacing-3);
        border-bottom: 2px solid var(--color-border-primary);
      }

      .button-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-6);
      }

      .button-item {
        text-align: center;
        padding: var(--spacing-4);
        background-color: var(--color-background-primary);
        border-radius: var(--border-radius-base);
        border: 1px solid var(--color-border-secondary);
      }

      .button-item h3 {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-3);
        font-family: var(--font-family-mono);
      }

      .click-log {
        background-color: var(--color-background-primary);
        border: 1px solid var(--color-border-primary);
        border-radius: var(--border-radius-base);
        padding: var(--spacing-4);
        max-height: 200px;
        overflow-y: auto;
        margin-bottom: var(--spacing-4);
      }

      .log-item {
        display: flex;
        gap: var(--spacing-3);
        padding: var(--spacing-2) 0;
        border-bottom: 1px solid var(--color-border-secondary);
      }

      .log-item:last-child {
        border-bottom: none;
      }

      .log-time {
        font-family: var(--font-family-mono);
        font-size: var(--font-size-sm);
        color: var(--color-text-muted);
        min-width: 80px;
      }

      .log-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
      }

      .clear-log {
        background-color: var(--color-error-500);
        color: white;
        border: none;
        padding: var(--spacing-2) var(--spacing-4);
        border-radius: var(--border-radius-base);
        cursor: pointer;
        font-size: var(--font-size-sm);
        transition: background-color 0.2s ease;
      }

      .clear-log:hover {
        background-color: var(--color-error-600);
      }

      @media (max-width: 768px) {
        .button-demo {
          padding: var(--spacing-4);
        }

        .button-grid {
          grid-template-columns: 1fr;
        }

        .demo-section {
          padding: var(--spacing-4);
        }
      }
    `,
  ],
})
export class ButtonDemoComponent {
  clickLog: Array<{ time: Date; text: string }> = [];

  handleClick(buttonText: string): void {
    this.clickLog.unshift({
      time: new Date(),
      text: `Clicked: ${buttonText}`,
    });

    // Keep only last 20 clicks
    if (this.clickLog.length > 20) {
      this.clickLog = this.clickLog.slice(0, 20);
    }
  }

  clearLog(): void {
    this.clickLog = [];
  }
}
