Spotify Web Player Clone 🎵
<br>
A responsive, functional music player web app built from scratch using vanilla HTML, CSS, and JavaScript.

This project focuses on replicating the core logic of a music streaming service—dynamic song loading, playback controls, and real-time seek bar updates—without relying on heavy frameworks.

Features
🎧 Dynamic Audio Engine
Auto-Play Next: Smart logic that automatically detects when a song ends and triggers the next track in the queue (or loops back to the start).

Folder-Based Parsing: JavaScript dynamically scans the project folders to populate the library, so adding a new song is as simple as dropping an .mp3 file into the folder. No manual HTML updates needed.

🎚️ Advanced Seekbar & Controls
Dynamic Gradient Fill: The seekbar fills with "Spotify Green" exactly up to the current timestamp using a calculated CSS linear-gradient that updates continuously.

🎨 UI/UX Details
Responsive Layout: Uses Flexbox for a layout that adapts from the library sidebar to the main player view.

🛠️ Tech Stack
HTML5: Semantic structure for the player and library.

CSS3: Custom properties, Flexbox, and CSS Transitions for hover effects and animations.

JavaScript (ES6+): Async/Await for fetching songs, Event Listeners for audio control, and DOM manipulation.

How It Works
Song Fetching: The getSongs() function fetches the directory listing, parses the HTML to find .mp3 files, and pushes them into a songs array.

The "Play" Logic:

Reconstructs valid file paths for the Audio() object.

Event Listeners:

timeupdate: Syncs the seekbar circle and the green gradient fill.

ended: specific listener to trigger the "Next Song" logic automatically.

🏃‍♂️ How to Run
git clone https://github.com/yourusername/spotify-clone.git
Open the folder in VS Code.
