# Project Instructions

## Profile Picture
- The profile picture for Johnny Nkunku is stored as `profile.png`.
- This image should be placed in the `public/` directory (so the path is `/public/profile.png`).
- This image should be used in the Hero/About section of `App.tsx` and in the header of `CV.tsx`.
- Always ensure the `src` attribute for the main profile image points to `profile.png`.

## Terminology
- Use "Promotion" instead of "Diplôme" for educational entries.
- In English, use "Class of".
- In Arabic, use "دفعة".

## PDF Generation
- Always use Hex colors in `index.css` and components to avoid `oklch`/`oklab` parsing errors in `html2pdf.js`.
- Avoid complex CSS blurs or filters on elements that need to be captured in the PDF.
