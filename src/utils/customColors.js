import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

// Function to parse a CSS color string and extract RGB values
function parseCSSColor(color) {
  if (color.startsWith('#') && (color.length === 4 || color.length === 7)) {
    // Handle hexadecimal color format, e.g., #RGB or #RRGGBB
    const hex = color.slice(1); // Remove the '#' character
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  } else if (color.startsWith('rgb(')) {
    // Handle RGB color format, e.g., rgb(R, G, B)
    const values = color
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
      .map(value => parseInt(value.trim(), 10));
    if (values.length === 3) {
      const [r, g, b] = values;
      return { r, g, b };
    }
  }

  // Handle other color formats as needed
  // You may need to add support for additional color formats

  return null;
}

function createTransparentColor(primaryColor, alpha) {
  alpha = Math.min(1, Math.max(0, alpha));
  const color = new parseCSSColor(primaryColor);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

export async function customizeColors() {
  const settingsDocRef = doc(db, 'settings', 'wFMie36TczQSoDZoSxEv'); // Replace with the correct document ID
  const docSnapshot = await getDoc(settingsDocRef);

  if (docSnapshot.exists()) {

    const primaryColor = docSnapshot.data().primaryColor;

    // Update the CSS variable dynamically
    document.documentElement.style.setProperty('--primaryColor', primaryColor);

    const transparentPrimaryColor = createTransparentColor(primaryColor, 0.1)
    document.documentElement.style.setProperty('--primaryColorTransparent', transparentPrimaryColor)

  } else {
    // Handle the case when the document doesn't exist or if primaryColor is not available
    console.error('Document not found or primaryColor not available.');
  }
}

// Call the function to update the CSS variable when needed (e.g., in a useEffect)
// exportcustomizeColors();
