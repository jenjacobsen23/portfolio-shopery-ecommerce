# 🛒 E-Commerce Platform Demo

> **Portfolio Project** | Built to demonstrate full-stack development capabilities

A modern, scalable e-commerce application built with Angular 19, featuring a comprehensive theme system, reusable UI components, and a clean architecture.

## 🎯 Project Purpose

This is a **technical demonstration** project built to showcase:

- Modern Angular 19 development practices
- Comprehensive theme system implementation
- Reusable UI component architecture
- TypeScript best practices and type safety
- Testing strategies with comprehensive unit tests
- Accessibility-first development approach

## 🚀 Live Demo

- **Demo Site**: [Live Demo URL - Coming Soon]
- **Source Code**: You're looking at it!
- **Documentation**: Complete with component documentation and testing coverage

## 💼 Professional Context

This project demonstrates the same quality and technical approach I bring to client work. It represents my development capabilities and attention to detail for potential freelance clients, showcasing:

- Clean, maintainable code architecture
- Comprehensive testing coverage
- Modern development practices
- Accessibility compliance
- Professional documentation standards

## ✨ Features

- **🎨 Advanced Theme System**: Complete design system with dark/light mode support and runtime color customization
- **🧩 Reusable UI Components**: Modular button and icon components with comprehensive documentation
- **📱 Responsive Design**: Mobile-first approach with consistent spacing and typography
- **♿ Accessibility**: High contrast ratios, focus management, and semantic HTML
- **🔧 TypeScript**: Full type safety with modern Angular patterns
- **🎯 Standalone Components**: Modern Angular architecture with standalone components
- **📦 Modular Architecture**: Clean separation of concerns and easy extensibility

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI 19.2.15+

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shopery-ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
# or
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/           # Feature components
│   │   ├── theme-demo/       # Theme system showcase
│   │   ├── theme-toggle/     # Theme switching component
│   │   └── color-picker/     # Color customization component
│   ├── services/             # Application services
│   │   └── theme.service.ts  # Theme management service
│   ├── shared/               # Shared resources
│   │   └── ui/               # UI component library
│   │       └── bricks/       # Atomic design components
│   │           ├── button/   # Button component
│   │           └── icon/     # Icon component
│   ├── app.component.*       # Root component
│   ├── app.config.ts         # Application configuration
│   └── app.routes.ts         # Routing configuration
├── styles/                   # Global styles and theme system
│   └── theme/               # Theme system files
│       ├── _variables.scss  # Design tokens
│       ├── _css-variables.scss # CSS custom properties
│       ├── _mixins.scss     # SASS mixins
│       ├── _utilities.scss  # Utility classes
│       └── _index.scss      # Theme system entry point
└── main.ts                  # Application bootstrap
```

## 🎨 Theme System

This project includes a comprehensive theme system with:

- **Design Tokens**: Consistent colors, typography, spacing, and shadows
- **CSS Custom Properties**: Runtime theme switching without recompilation
- **SASS Mixins**: Reusable styling patterns and utilities
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Runtime Customization**: Change colors on the fly with the color picker

For detailed theme system documentation, see [THEME_README.md](./THEME_README.md).

## 🧩 UI Components

### Button Component

A flexible button component with multiple variants and sizes:

- Primary, outline, and subtle variants
- Small, medium, and large sizes
- Full accessibility support
- TypeScript interfaces for type safety

### Icon Component

A comprehensive icon system with:

- Social media icons (Facebook, Instagram, Twitter, Pinterest)
- Utility icons (heart, eye, close, link, bag, favorite)
- Multiple sizes and customizable styling
- SVG-based for crisp rendering

## 🛠️ Development

### Code Scaffolding

Generate new components using Angular CLI:

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new directive
ng generate directive directive-name

# For a complete list of available schematics
ng generate --help
```

### Building

Build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory with production optimizations.

### Development Build

For development builds with source maps:

```bash
npm run watch
# or
ng build --watch --configuration development
```

## 🧪 Testing

### Unit Tests

Run unit tests with Karma:

```bash
npm test
# or
ng test
```

### End-to-End Tests

For e2e testing (when configured):

```bash
ng e2e
```

## 📦 Dependencies

### Core Dependencies

- **Angular 19.2.0**: Modern Angular framework with standalone components
- **RxJS 7.8.0**: Reactive programming library
- **TypeScript 5.7.2**: Type-safe JavaScript

### UI Dependencies

- **angular-svg-icon 19.1.1**: SVG icon support

### Development Dependencies

- **Angular CLI 19.2.15**: Development and build tools
- **Karma & Jasmine**: Testing framework
- **SCSS**: CSS preprocessing

## 🎯 Key Technologies

- **Angular 19**: Latest Angular with standalone components and signals
- **TypeScript**: Full type safety and modern JavaScript features
- **SCSS**: Advanced CSS preprocessing with mixins and variables
- **CSS Custom Properties**: Runtime theming capabilities
- **Angular Signals**: Reactive state management
- **Standalone Components**: Modern Angular architecture

## 📱 Browser Support

- **Modern Browsers**: Full support for CSS custom properties
- **Progressive Enhancement**: Core functionality works everywhere
- **Responsive Design**: Mobile-first approach with breakpoint utilities

## 📞 Interested in Working Together?

If this demo resonates with your project needs, let's discuss how I can help bring your vision to life.

**Contact Information:**

- **Portfolio**: https://www.jenjacobsen.com/
- **Email**: contact@jenjacobsen.com
- **LinkedIn**: https://www.linkedin.com/in/jen-jacobsen/

## 🤝 Contributing

This is a portfolio demonstration project. If you'd like to suggest improvements or have questions about the implementation:

1. Follow the existing code style and patterns
2. Use standalone components and modern Angular patterns
3. Add tests for new functionality
4. Update documentation for new features
5. Ensure accessibility compliance
6. Follow the established file structure

## 📄 License

This is a portfolio demonstration project. Please respect the code and use it as a reference for your own learning and development.

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [SCSS Documentation](https://sass-lang.com/documentation)

---

**Happy Coding! 🚀✨**
