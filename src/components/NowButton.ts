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
  button.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background-color: ${backgroundColor};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
    opacity: 0;
    visibility: hidden;
  `;

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

  // Show button only on homepage within first 100vh
  if (window.location.pathname === '/') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          button.style.opacity = '1';
          button.style.visibility = 'visible';
        } else {
          button.style.opacity = '0';
          button.style.visibility = 'hidden';
        }
      });
    }, { threshold: 0.5 });

    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '100vh';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    document.body.appendChild(sentinel);

    observer.observe(sentinel);
  }
  return button;
};