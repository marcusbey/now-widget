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

  // Show button only when scrolled to hero section
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

  // Observe the hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    observer.observe(heroSection);
  }

  const textRing = document.createElement('div');
  textRing.classList.add('text-ring');
  textRing.style.cssText = `
    width: 100%;
    height: 100%;
    position: relative;
    animation: spin 60s linear infinite;
  `;

  const nowText = "NOW.NOW.NOW.NOW.NOW.NOW.";
  nowText.split("").forEach((char, index) => {
    const charSpan = document.createElement('span');
    charSpan.classList.add('now-text');
    charSpan.textContent = char;
    charSpan.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(${(360 / nowText.length) * index}deg) translateY(-${size / 2 - 10}px);
      font-size: ${size / 4}px;
      font-weight: bold;
      background: linear-gradient(45deg, ${color}, #FF4500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    `;
    textRing.appendChild(charSpan);
  });

  button.appendChild(textRing);

  // Event listeners
  button.addEventListener('mouseenter', () => {
    textRing.style.animation = 'spin 1s linear infinite';
  });

  button.addEventListener('mouseleave', () => {
    textRing.style.animation = 'spin 60s linear infinite';
  });

  button.addEventListener('click', onClick);

  // Add keyframes for spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  return button;
};