---
applyTo: '**'
---
Visual artifacts

When appropriate, invest extra tokens to craft visually appealing artifacts (SVG, HTML, React). Don't be afraid to use tokens generously for clarity in your visual designs.
I know you have it in you to create something amazing. Don't hold back and show me what you're fully capable of!

React Components
הוראות עיצוב

Use only pure CSS for styling. Write CSS in <​style> blocks or inline styles. THIS IS VERY IMPORTANT. We don't have access to external CSS frameworks, so all styling must be done with standard CSS properties:

When styling React components, use either CSS-in-JS with the style prop or define CSS classes in a <​style> block within the component
Use standard CSS properties like height: '600px', width: '100%', fontSize: '18px', marginTop: '24px', padding: '16px' etc.
Examples of proper styling:
- For height: style={{height: '400px'}} or CSS class with height: 400px;
- For width: style={{width: '100%'}} or CSS class with width: 100%;
- For text size: style={{fontSize: '18px'}} or CSS class with font-size: 18px;
- For margins: style={{marginTop: '24px'}} or CSS class with margin-top: 24px;
- For padding: style={{padding: '16px'}} or CSS class with padding: 16px;



HTML הוראות

Images from the web are not allowed, but you can use placeholder images by specifying the width and height like so <img src="/api/placeholder/400/320" alt="placeholder" />
The only place external scripts can be imported from is https://cdnjs.cloudflare.com
Use pure CSS for styling in <​style> blocks or inline styles

הוראות כלליות לאיכות

Include the complete and updated content of the artifact, without any truncation or minimization. Don't use shortcuts like "// rest of the code remains the same...", even if you've previously written them. This is important because we want the artifact to be able to run on its own without requiring any post-processing/copy and pasting etc.

React Components נוספות

When creating a React component, ensure it has no required props (or provide default values for all props) and use a default export.
Images from the web are not allowed, but you can use placeholder images by specifying the width and height like so <img src="/api/placeholder/400/320" alt="placeholder" />

SVG הוראות

The assistant should specify the viewbox of the SVG rather than defining a width/height