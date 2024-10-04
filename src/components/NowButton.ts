// src/ts/components/NowButton.ts
interface ButtonOptions {
  color: string;
  size: number;
  backgroundColor: string;
}

type ClickHandler = () => void;

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
 * @param config - Configuration object containing button color and size.
 * @returns The NowWidget button HTMLElement.
 */
export const createNowButton = (
  onClick: () => void,
  config: {
    color?: string;
    size?: number;
    backgroundColor?: string;
  } = {}
): HTMLElement => {
  const { color = '#007bff', size = 60, backgroundColor = 'transparent' } = config;

  const button = document.createElement('button');
  button.id = 'now-widget-button';
  button.style.backgroundColor = options.backgroundColor;
  button.style.width = `${options.size}px`;
  button.style.height = `${options.size}px`;
  button.style.border = 'none';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = options.color;
  button.addEventListener('click', onClick);

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
  button.addEventListener('click', onClick);

  return button;
};