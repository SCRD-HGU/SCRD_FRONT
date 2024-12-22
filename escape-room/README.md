# Loading.js and MyPage.js Components

## Overview
This project contains two main components:
1. **Loading.js** - Implements an animated loading screen.
2. **MyPage.js** - Displays an interactive user interface for navigation and content exploration.

Below is a detailed explanation of each component, their functionalities, and the styling approach used.

---

## Loading.js

### Description
The `Loading.js` file creates a visually appealing loading screen with animations and transitions. The loading screen displays three rotating and translating texts, along with matching text positioned dynamically. The screen redirects to the main page (`/main`) after a brief delay.

### Features
- **Global Style**: Resets default styles using `createGlobalStyle` from styled-components.
- **Dynamic Scaling**: Maintains consistent UI scaling across different viewport sizes.
- **Text Animation**: Animates text elements to rotate and translate, creating a dynamic appearance.
- **Fade-out Effect**: Adds a smooth fade-out transition before navigating to the next page.
- **Dynamic Positioning**: Positions text and elements dynamically based on animations.

### Key Components
- **ScaledContainer**: Ensures the container scales uniformly across devices.
- **SemiContainer**: Center-aligns child elements and ensures overflow is hidden.
- **Text Animations**: Uses keyframes for text rotation and translation effects (`moveLeft`, `moveRight`, etc.).
- **Matching Texts**: Adds thematic texts for additional visual elements.

### Navigation
Automatically navigates to `/main` after a 2-second delay, with a fade-out transition.

---

## MyPage.js

### Description
The `MyPage.js` component serves as a user interface, featuring a logo, interactive buttons, circular menus, and hover effects. It includes embedded videos and links for enhanced interactivity.

### Features
- **Global Style**: Ensures uniform styling across the page.
- **Header Section**: Displays a thematic header text with the company logo.
- **Toggle Button**: A horizontally split toggle button with hover animations.
- **Circular Menus**: Interactive circular menus containing subtexts with hover effects.
- **Moving Areas**: Hoverable video containers that scale on hover, providing links for navigation.

### Key Components
- **HeaderLogoWrapper**: Combines the header text and logo.
- **ToggleButtonWrapper**: A toggle button with a dynamically expanding background on hover.
- **CircleMenu**: Contains circular buttons with associated subtexts.
- **MovingArea**: Displays linked videos with a hover-based scaling effect.
- **StyledVideo**: Applies grayscale styling to videos for a distinct visual theme.

### Navigation
Integrates links within `LinkText` for navigation to other pages or sections.

---

## Styling Approach
Both components use **styled-components** for CSS-in-JS styling, offering modular and scoped styles. Key animations and transitions include:
- **Keyframes**: For animations like scaling, rotation, and translation.
- **Hover Effects**: For interactive elements like buttons and videos.
- **Dynamic Properties**: Uses props for conditional styling (e.g., hover states).

### Colors and Fonts
- Primary Color: `#D90206` (Loading.js background)
- Secondary Color: `#FFF` (MyPage.js elements)
- Font Family: `Neue Haas Grotesk Display Pro`, `Pretendard`
- Typography: Emphasizes uppercase text with bold styles for a modern appearance.

---

## How to Use
1. **Setup**: Ensure all assets (e.g., `Logo.svg`, `FirstVideo.mp4`) are available in the specified paths.
2. **Navigation**: Configure your `React Router` routes to include `/main` and other navigable pages.
3. **Styling Adjustments**: Customize colors, fonts, and animations in the styled-components as needed.