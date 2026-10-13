# 🔐 The Escape Room
A multi-page browser puzzle game built with pure HTML, CSS and JavaScript.
Solve the puzzle in each room to escape. No frameworks, no backend, no build tools.
## Features

- 3 pages: The Library, The Laboratory, and the Escape screen
- Your name is saved with `localStorage` and used to greet you in each room
- Hidden-word puzzle (select the text with your mouse, or tap "Reveal clue" on touch devices)
- Color-sequence puzzle with progress indicators
- Attempt counter that carries across rooms
- Page guards that stop you skipping rooms by typing in the URL
- Responsive layout, keyboard accessible, and respects `prefers-reduced-motion`

## Tech stack

- HTML5 (semantic tags)
- CSS3 (Flexbox/Grid, CSS variables, per-page themes)
- Vanilla JavaScript (ES6+)
- `localStorage` for all persistence

## Run it locally

No installation needed.

1. Click the green **Code** button → **Download ZIP**, then extract it.
2. Open `index.html` in your browser.



## Project structure

```<img width="1042" height="777" alt="Screenshot 2026-10-12 215212" src="https://github.com/user-attachments/assets/fb15495d-5c71-4dce-a76a-d2d414f830bb" />
<img width="1042" height="777" alt="Screenshot 2026-10-12 215212" src="https://github.com/user-attachments/assets/be251f0f-d8e8-4b02-a6b8-409bf5fbc19c" />

escape-room/
├── index.html        # Room 1: The Library
├── room2.html        # Room 2: The Laboratory
├── success.html      # The Escape
├── css/
│   └── style.css     # Shared styles and themes
└── js/
    ├── storage.js    # localStorage helpers
    ├── room1.js      # Room 1 logic
    ├── room2.js      # Room 2 logic
    └── success.js    # Success page logic
```

## How it works

Game progress is stored as one JSON object under the key `escapeRoom.state`
(player name, room completion flags, and attempts). Each page checks that state
on load and redirects you back if you haven't earned access.

> **Note:** these guards run in the browser and can be bypassed with DevTools.
> They control game flow only and are not a security feature.

<details>
<summary>⚠️ Spoilers: solutions</summary>

- Room 1: the hidden word is **LANTERN**
- Room 2: click **Blue → Red → Green**

</details>

## What I practiced

DOM manipulation, event handling, `localStorage`, page-to-page navigation,
CSS animations, and basic accessibility.

## Built with

Generated with Google Antigravity from a custom prompt, then reviewed and tested by me.

## License

Released under the [MIT License](LICENSE).

## Author

Made by [Kapis varia](https://github.com/kapisvariapersonal-hue)
