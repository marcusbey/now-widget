// src/components/NowButton.ts

/**
 * Interface for button options
 */
interface ButtonOptions {
  color?: string;
  size?: number;
  backgroundColor?: string;
}

/**
 * Adjusts the spin speed of the text ring based on proximity and hover state.
 * @param isNear - Indicates if the cursor is near the button.
 * @param isHovered - Indicates if the button is currently hovered.
 * @param textRing - The HTMLElement representing the text ring.
 */
export const adjustSpinSpeed = (
  isNear: boolean,
  isHovered: boolean,
  textRing: HTMLElement
): void => {
  if (isHovered) {
    textRing.classList.add('fast-spin');
    textRing.classList.remove('slow-spin');
  } else if (isNear) {
    textRing.classList.add('slow-spin');
    textRing.classList.remove('fast-spin');
  } else {
    textRing.classList.remove('slow-spin', 'fast-spin');
  }
};

/**
 * Creates the NowWidget button element.
 * @param onClick - Callback function to execute on button click.
 * @param options - Configuration object containing button color, size, and background color.
 * @returns The NowWidget button HTMLElement.
 */
export const createNowButton = (
  onClick: () => void,
  options: ButtonOptions = {}
): HTMLElement => {
  const { color = '#007bff', size = 50, backgroundColor = 'transparent' } = options;

  const button = document.createElement('button');
  button.id = 'now-widget-button';
  button.type = 'button';

  // Apply styles
  button.style.backgroundColor = backgroundColor;
  button.style.border = 'none';
  button.style.cursor = 'pointer';

  // Set button size
  button.style.width = `${size}px`;
  button.style.height = `${size}px`;
  button.style.borderRadius = '50%';

  const content = document.createElement('div');
  content.classList.add('now-widget-button-content');

  const textRing = document.createElement('div');
  textRing.classList.add('text-ring');

  const nowText = "NOW.NOW.NOW.NOW.NOW.NOW.";
  nowText.split("").forEach((char, index) => {
    const charSpan = document.createElement('span');
    charSpan.classList.add('now-text');
    charSpan.textContent = char;
    charSpan.style.position = 'absolute';
    charSpan.style.top = '50%';
    charSpan.style.left = '50%';
    charSpan.style.transform = `
            translate(-50%, -50%)
            rotate(${(360 / nowText.length) * index}deg)
            translateY(-4ch)
        `;
    charSpan.style.fontSize = '1.1rem';
    charSpan.style.fontWeight = 'bold';
    charSpan.style.background = `linear-gradient(45deg, ${color}, #FF4500)`;
    charSpan.style.webkitBackgroundClip = 'text';
    charSpan.style.webkitTextFillColor = 'transparent';
    charSpan.style.backgroundClip = 'text';
    charSpan.style.color = 'transparent';

    textRing.appendChild(charSpan);
  });

  content.appendChild(textRing);
  button.appendChild(content);

  // Event listeners for hover to adjust animation speed
  button.addEventListener('mouseenter', () => {
    textRing.classList.add('fast-spin');
    textRing.classList.remove('slow-spin');
  });

  button.addEventListener('mouseleave', () => {
    textRing.classList.remove('fast-spin');
  });

  // Click event
  button.addEventListener('click', () => {
    console.log('NowButton clicked');
    onClick();
  });

  return button;
};