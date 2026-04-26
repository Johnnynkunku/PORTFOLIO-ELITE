# Project Instructions

## Profile Picture
- The profile picture for Johnny Nkunku is stored as `profile.png`.
- This image should be placed in the `src/assets/` directory.
- This image should be imported in the code to ensure Vite handles the path correctly on all environments (Local and GitHub Pages).
- Always ensure the `src` attribute for the main profile image points to the imported image variable.

## Terminology
- Use "Promotion" instead of "Diplôme" for educational entries.
- In English, use "Class of".
- In Arabic, use "دفعة".

## PDF Generation
- Always use Hex colors in `index.css` and components to avoid `oklch`/`oklab` parsing errors in `html2pdf.js`.
- Avoid complex CSS blurs or filters on elements that need to be captured in the PDF.
