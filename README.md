# Office Clue Game

An interactive office background game built with Next.js, React, Framer Motion, and lucide-react. Click on hotspots to explore and collect clues, then solve the password puzzle!

## Features

- ✅ Responsive background image with %-based clickable hotspots
- ✅ Modal panels with animated pop-in using Framer Motion
- ✅ Three interactive panels: Calendar, Photo Frame (carousel), and Sticky Note
- ✅ Clue collection system with duplicate prevention
- ✅ Password derivation and verification system
- ✅ Keyboard navigation (Esc to close modals)
- ✅ Fully responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## How It Works

### Collecting Clues

1. Click on the green pulsing hotspots on the office background
2. Inspect each interactive panel and click the "Inspect Closely" button
3. Each panel will give you a unique clue (a single letter)
4. Clues appear in the sidebar tray
5. You can remove clues by clicking the X button

### Solving the Password

The password is derived from the collected clues using the `derivePassword` function:

- Clues are sorted alphabetically by ID
- The first letter of each clue's text is taken
- These letters are concatenated to form the password

**Example**: If you collect clues with text "T", "R", "O", the password will be "TRO".

### Testing the Password

Enter the derived password in the password input field and click "Check". You'll receive immediate feedback.

## Customization

### Adding New Hotspots

To add a new hotspot, edit `src/app/page.tsx`:

1. Add a new entry to the `hotspots` array:
   ```typescript
   const hotspots: Hotspot[] = [
     { id: 'calendar', name: 'Calendar', x: 25, y: 30 },
     { id: 'photo', name: 'Photo Frame', x: 70, y: 40 },
     { id: 'note', name: 'Sticky Note', x: 50, y: 70 },
     { id: 'new_hotspot', name: 'New Hotspot', x: 80, y: 60 }, // Add this
   ];
   ```

2. Create a new panel component in `src/components/` (e.g., `NewHotspotPanel.tsx`)

3. Add a case in the `getActiveHotspotContent` function in `src/app/page.tsx`:
   ```typescript
   case 'new_hotspot':
     return (
       <NewHotspotPanel onFound={handleClueFound} found={found} />
     );
   ```

### Changing the Password Logic

Edit the `derivePassword` function in `src/lib/clueUtils.ts`:

```typescript
export function derivePassword(clues: Clue[]): string {
  if (clues.length === 0) return '';
  
  // Customize this logic
  const password = clues
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(clue => clue.text.charAt(0).toUpperCase())
    .join('');
  
  return password;
}
```

Some ideas for custom password logic:
- Last letter of each clue
- Reverse the order
- Use a hash of the clue IDs
- Mathematical operations on clue values

### Changing the Background Image

Edit `src/app/page.tsx` and change the `officeImageUrl`:

```typescript
const officeImageUrl = 'YOUR_IMAGE_URL_HERE';
```

Or use a local image:
1. Place your image in the `public/` folder
2. Use `/your-image.jpg` as the URL

Note: If using remote images, the app uses `unoptimized` for external URLs, or you can configure `next.config.js` with `remotePatterns` for Next.js Image Optimization.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main game page
│   └── globals.css          # Global styles
├── components/
│   ├── CalendarPanel.tsx    # Calendar panel component
│   ├── ClueTray.tsx         # Clue collection tray
│   ├── Modal.tsx            # Modal wrapper with animations
│   ├── PasswordInput.tsx    # Password input with validation
│   ├── PhotoFramePanel.tsx  # Photo frame with carousel
│   └── StickyNotePanel.tsx  # Sticky note panel
└── lib/
    └── clueUtils.ts         # Password derivation logic
```

## Testing

Dev-time console.assert tests are included in `src/lib/clueUtils.ts`. These will run during server-side rendering and display in the console.

Run the tests:
```bash
npm run dev
```

Check the terminal for console.assert results.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **lucide-react** - Icons
- **CSS** - Custom styling with responsive design

## Acceptance Criteria Checklist

✅ Page renders with a background "office" image and at least 3 hotspots  
✅ Clicking a hotspot opens a modal with animated pop-in; overlay click or Esc closes it  
✅ Clues appear in a tray; duplicates aren't added  
✅ Password input checks via derivePassword; shows success/failure message  
✅ No runtime error when no hotspot is active  
✅ Uses "use client" and compiles in a clean Next.js App Router project  
✅ README included  

## License

ISC

