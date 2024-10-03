// src/ts/components/NowButton.ts

export const createNowButton = (
  onClick: () => void,
  config: {
    size?: number;
    color?: string;
    backgroundColor?: string;
  } = {}
): HTMLElement => {
  const { size = 100, color = 'red', backgroundColor = 'transparent' } = config;

  const button = document.createElement('button');
  button.id = 'now-widget-button';
  button.style.width = `${size}px`;
  button.style.height = `${size}px`;
  button.style.background = backgroundColor;
  button.style.border = 'none';
  button.style.padding = '0';
  button.style.outline = 'none';
  button.style.boxShadow = 'none';
  button.style.position = 'relative';
  button.style.cursor = 'pointer';
  button.classList.add('now-widget-relative', 'now-widget-cursor-pointer', 'now-widget-overflow-hidden');

  // Create content container
  const content = document.createElement('div');
  content.style.position = 'relative';
  content.style.width = '100%';
  content.style.height = '100%';
  content.style.display = 'flex';
  content.style.justifyContent = 'center';
  content.style.alignItems = 'center';

  // Create rotating text
  const textRing = document.createElement('span');
  textRing.classList.add('animate-shimmer', 'text-ring');
  textRing.style.position = 'absolute';
  textRing.style.top = '0';
  textRing.style.left = '0';
  textRing.style.width = '100%';
  textRing.style.height = '100%';
  textRing.style.animation = `spin ${60}s linear infinite`;

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

  // Create arrow icon
  const arrowIcon = document.createElement('span');
  arrowIcon.classList.add('hi-arrow-right');
  arrowIcon.style.position = 'absolute';
  arrowIcon.style.width = `${size * 0.3}px`;
  arrowIcon.style.height = `${size * 0.3}px`;
  arrowIcon.style.fill = color;
  // Note: Replace with actual SVG or icon implementation

  content.appendChild(textRing);
  content.appendChild(arrowIcon);
  button.appendChild(content);

  // Event listeners for hover to adjust animation speed
  button.addEventListener('mouseenter', () => {
    textRing.style.animationDuration = '5s';
  });
  button.addEventListener('mouseleave', () => {
    textRing.style.animationDuration = '60s';
  });

  button.addEventListener('click', () => {
    onClick();
    togglePanel(true); // Open the panel when the button is clicked
  });

  let animationFrameId: number;

  const animate = () => {
    // Perform animation-related updates
    animationFrameId = requestAnimationFrame(animate);
  };

  // Start animation loop
  animate();

  // Cleanup on widget removal
  const removeAnimations = () => {
    cancelAnimationFrame(animationFrameId);
  };

  // Adjust spin speed based on proximity or hover
  const adjustSpinSpeed = (isNear: boolean, isHovered: boolean, textRing: HTMLElement) => {
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

  // Toggle panel with smooth transitions
  const togglePanel = (isOpen: boolean): void => {
    const panel = document.getElementById('now-widget-panel');
    if (panel) {
      if (isOpen) {
        panel.classList.add('open');
      } else {
        panel.classList.remove('open');
      }
    }
  };

  // Mouse Movement Event to Adjust Animation
  document.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
      Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
    );
    const isNear = distance < 200; // Proximity Threshold
    const isHovered = button.matches(':hover');
    adjustSpinSpeed(isNear, isHovered, textRing);
  });

  return button;
};