# Product Gallery

A modern, responsive Vue.js application for browsing and managing a product catalog with advanced filtering, sorting, and view options.

## Screenshots

### Grid View
![Product Gallery - Grid View](src/assets/screenshot/Screenshot%202025-09-13%20173103.png)

### Table View
![Product Gallery - Table View](src/assets/screenshot/Screenshot%202025-09-13%20173131.png)

## Features

### 🛍️ Product Management
- **Product Display**: View products in both grid and table layouts
- **Product Information**: Each product shows name, category, price, and stock status
- **Stock Status**: Visual indicators for in-stock and out-of-stock items

### 🔍 Advanced Filtering & Search
- **Text Search**: Real-time search by product name
- **Category Filtering**: Filter products by Books, Games, Electronics, or view all
- **Price Sorting**: Sort products by price (Low to High or High to Low)

### 💖 Favorites System
- **Add/Remove Favorites**: Toggle favorite status for any product
- **Persistent Storage**: Favorites are saved in browser localStorage
- **Toast Notifications**: User feedback when adding/removing favorites
- **Visual Indicators**: Heart icons show favorite status

### 📱 Responsive Design
- **Grid View**: Card-based layout optimized for visual browsing
- **Table View**: Detailed tabular view with all product information
- **Mobile Friendly**: Responsive design that works on all screen sizes

### 📄 Pagination
- **Configurable Items per Page**: Choose from 4, 8, 12, or 20 items per page
- **Navigation Controls**: Previous/Next buttons with page information
- **Smart Pagination**: Automatically resets to page 1 when filters change

### ⚡ Performance & UX
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error handling with retry functionality
- **Empty States**: User-friendly messages when no results are found
- **Accessibility**: ARIA labels and semantic HTML for screen readers

## Technologies Used

### Frontend Framework
- **Vue 3**: Modern reactive framework with Composition API
- **TypeScript**: Type-safe development with full type checking

### Build Tools
- **Vite**: Fast build tool and development server
- **Vue TSC**: TypeScript compiler for Vue components

### Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS processing with autoprefixer

### Testing
- **Vitest**: Fast unit testing framework
- **Vue Test Utils**: Official testing utilities for Vue components
- **JSDOM**: DOM environment for testing

### UI/UX
- **Vue3 Toastify**: Toast notification system
- **Custom SVG Icons**: Scalable vector graphics for UI elements

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Hot Module Replacement**: Instant development feedback

## How to Setup

### Prerequisites
- **Node.js**: Version 16 or higher
- **npm**: Package manager (comes with Node.js)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run typecheck
   ```

## How to Run

### Development Mode
Start the development server with hot reload:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
Create an optimized production build:
```bash
npm run build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## How to Test

### Run All Tests
Execute the complete test suite:
```bash
npm test
```

### Run Tests with UI
Open the Vitest UI for interactive testing:
```bash
npm run test:ui
```

### Generate Coverage Report
Run tests with coverage analysis:
```bash
npm run coverage
```

### Type Checking
Verify TypeScript types without running tests:
```bash
npm run typecheck
```

## Test Coverage

The application includes comprehensive tests covering:

- **Component Rendering**: Verifies all components render correctly
- **User Interactions**: Tests filtering, sorting, and favorite toggling
- **State Management**: Validates reactive state updates
- **Error Handling**: Tests error states and retry functionality
- **Loading States**: Verifies loading indicators work properly
- **Empty States**: Tests no-results scenarios

## Project Structure

```
src/
├── components/           # Vue components
│   ├── __tests__/       # Component tests
│   ├── Category.vue     # Category filter component
│   ├── ProductGallery.vue # Main gallery component
│   ├── ProductGrid.vue  # Grid view component
│   ├── ProductTable.vue # Table view component
│   └── RenderTab.vue    # View toggle component
├── composables/         # Vue composables
│   ├── useFavorite.ts   # Favorites management
│   └── useProduct.ts    # Product data management
├── assets/             # Static assets
├── fakeApi.ts          # Mock API data
├── App.vue             # Root component
├── main.ts             # Application entry point
└── style.css           # Global styles
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.