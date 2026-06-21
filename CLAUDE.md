# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite musician profile/portfolio website featuring an interactive music player. The site showcases artist information, discography, and playback controls.

**Key Tech Stack:**
- React 19 with Vite 8 (HMR enabled)
- Context API for state management
- CSS Modules for styling
- GitHub Pages deployment (served at `/my-profile-site/`)

## Commands

### Development
```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Deployment
- Pushes to `main` branch trigger GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Automatically builds and deploys to GitHub Pages (`https://jw059.github.io/my-profile-site/`)

## Architecture

### State Management: PlayerContext
- **Location**: `src/context/PlayerContext.jsx`
- **Manages**: Audio playback state (queue, current track, play/pause, seeking, volume)
- **Methods**: `playTrack()`, `togglePlay()`, `next()`, `prev()`, `seek()`, `setVolumeLevel()`
- **Hook**: `usePlayer()` - use this in any component that needs player state

**Example usage in components:**
```jsx
const { currentTrack, isPlaying, togglePlay } = usePlayer();
```

### Component Structure
```
src/components/
├── Nav.jsx              # Navigation header
├── Hero.jsx             # Artist bio section
├── Discography.jsx      # Albums grid
├── AlbumCard.jsx        # Individual album card (clickable to play)
├── Player.jsx           # Playback controls and progress bar
├── Contact.jsx          # Contact/social links section
└── Footer.jsx           # Footer
```

Each component has a corresponding CSS Module (`src/styles/ComponentName.module.css`).

### Data Structure
- **Location**: `src/data.js`
- **Contains**: Artist info, albums array, contact details
- **Track objects**: Include `id`, `title`, `duration`, `audioSrc` (empty strings currently)
- To enable playback: Add audio file URLs to `audioSrc` fields in track objects

## GitHub Pages Configuration

**Important**: `vite.config.js` includes `base: '/my-profile-site/'` to account for the project repository deployment path. This is required for correct asset loading on GitHub Pages.

**If deploying to a user/org site** (e.g., `username.github.io`), change `base` to `'/'`.

## Common Workflows

### Updating Artist/Album Data
1. Edit `src/data.js` with new artist name, bio, albums, tracks
2. Add audio file URLs to track `audioSrc` fields
3. Push to `main` → automatic deployment

### Styling Changes
- Modify the corresponding CSS Module in `src/styles/`
- Component imports use: `import styles from './ComponentName.module.css'`
- Class usage: `<div className={styles.className}>`

### Adding New Features
1. Create component in `src/components/`
2. Create CSS Module in `src/styles/` if needed
3. Wrap `App.jsx` in `<PlayerProvider>` (already done) to access `usePlayer()` hook
4. Import and use in `App.jsx` or other components
