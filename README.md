# NowWidget-vanilla-ts

## Overview

NowWidget-vanilla-ts is a lightweight, versatile widget designed to seamlessly display user posts on any website. Built using Vanilla JavaScript and TypeScript, it offers a customizable and interactive experience with minimal setup. The widget features an animated button that, when clicked, reveals a sleek side panel showcasing user information and their latest posts.

## Architecture & Technology Stack

### Language & Frameworks:

- TypeScript: Ensures type safety and enhanced developer experience.
- Vanilla JavaScript: Lightweight and dependency-free for optimal performance.
- Vite: Fast build tool facilitating development and production builds.
- CSS: Styled using standard CSS with a modular approach for maintainability.

### Bundling & Build Tools:

- Vite: Handles module bundling, development server, and build optimizations.
- Terser: Minifies JavaScript for production-ready builds.
- vite-plugin-css-injected-by-js: Injects CSS directly into the DOM via JavaScript for encapsulated styling.

### Testing & Linting:

- Jest: Comprehensive testing framework for unit tests.
- ESLint & Prettier: Enforce code quality and consistent styling across the codebase.

### State Management:

- Custom WidgetStore: Manages the widget's state, including loading status, user data, posts, and panel visibility.
- EventEmitter: Facilitates event-driven interactions within the widget components.

### API Integration:

- Fetch API: Retrieves user information and posts from the backend services securely using JWT tokens.

## Features

### 1. Animated Now Button

#### Design:

- Circular Shape: A responsive, circular button that adapts to various screen sizes.
- Text Ring Animation: Displays the text "NOW." repeatedly around the button's circumference, creating an engaging spinning effect.
- Color Customization: Easily adjustable button and text colors via data attributes.

#### Interactivity:

- Hover Effects: Speeds up the text ring animation when hovered, providing visual feedback.
- Visibility Control: The button appears only on the homepage within the first viewport height (100vh) and hides upon scrolling past a certain threshold (300px).

### 2. Side Panel

#### Design:

- Responsive Layout: A side panel that slides in smoothly from the left, adjusting its width based on screen size for optimal viewing on both desktop and mobile devices.
- Theme Support: Supports light and dark themes, easily switchable via configuration.
- Overlay Effect: A semi-transparent overlay appears behind the panel to focus user attention and prevent interaction with the underlying content.

#### Content:

- User Information: Displays the user's avatar, display name, bio, and follower count in a clean, organized header section.
- Posts Display: Showcases user posts with timestamps, content, and engagement metrics like comments and bookmarks.

#### Interactivity:

- Toggle Mechanism: Opens and closes the panel with smooth animations. The panel can also be closed by clicking outside of it or pressing the ESC key.
- Auto-Close on Scroll: The panel automatically closes when the user scrolls, ensuring a non-intrusive experience.

### 3. State Management

- WidgetStore: Maintains the widget's state, including loading indicators, error messages, user data, posts, and panel visibility.
- Event-Driven Updates: Utilizes an event emitter to manage and propagate state changes efficiently across components.

### 4. Customization & Configuration

- Data Attributes: Configure the widget directly via HTML script tag attributes:
  - data-user-id: Unique identifier for the user.
  - data-token: JWT token for secure API authentication.
  - data-theme: Choose between 'light' or 'dark' themes.
  - data-position: Set the position of the widget button (e.g., 'left' or 'right').
  - data-button-color: Define the button's color using HEX codes.
- Responsive Design: Ensures the widget looks and functions beautifully across various devices and screen sizes.

## Installation & Setup

### Clone the Repository:

### Installation & Setup

#### Clone the Repository

```bash
git clone <repository-url>
cd now-widget-ts
```

#### Install Dependencies

```bash
npm install
```

#### Run Development Server

```bash
npm start
```

Navigate to [http://localhost:8080](http://localhost:8080) to view the widget in action.

#### Build for Production

```bash
npm run build
```

### Usage

Embed the widget into your website by adding the following script tag to your HTML, customizing the data attributes as needed:

```html
<script
  defer
  src="http://localhost:5173/dist/now-widget.js"
  data-user-id="ErOeaXjKcLJ"
  data-token="your-jwt-token"
  data-theme="dark"
  data-position="left"
  data-button-color="white"
></script>
```

### Development

- **Linting:** Ensure code quality with ESLint.

  ```bash
  npm run lint
  ```

- **Testing:** Run unit tests using Jest.

  ```bash
  npm run test
  ```

- **Automatic Builds:** Use the watch script to automatically rebuild on code changes.

  ```bash
  npm run watch
  ```

### Contribution

Contributions are welcome! Feel free to open issues or submit pull requests for enhancements and bug fixes.

### License

MIT

### Contact

For any inquiries or support, please contact Romain BOBOE.

---

NowWidget-vanilla-ts combines simplicity with powerful features, making it an ideal choice for developers seeking to enhance their websites with dynamic user content effortlessly.
