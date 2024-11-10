interface NowButtonOptions {
  size?: number;
  maxSize?: number;
  minSize?: number;
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export class NowButton {
  private button: HTMLButtonElement;
  private buttonContent: HTMLDivElement;
  private textContainer: HTMLDivElement;
  private arrowIcon: HTMLDivElement;
  private isHovered: boolean = false;
  private animationDuration: number = 15;
  private maxSize: number = 150;
  private minSize: number = 80;
  private currentSize: number;
  private color: string;
  private text = "NOW . NOW . NOW . ";
  private resizeObserver!: ResizeObserver;

  constructor(container: HTMLElement, options: NowButtonOptions = {}) {
    if (options.size) {
      this.maxSize = options.size;
      this.minSize = options.size;
    } else {
      this.maxSize = options.maxSize ?? this.maxSize;
      this.minSize = options.minSize ?? this.minSize;
    }
    this.color = options.color ?? '#ffffff';
    this.currentSize = this.calculateSize();

    this.button = this.createButton(options);
    this.buttonContent = this.createButtonContent();
    this.textContainer = this.createTextContainer();
    this.arrowIcon = this.createArrowIcon();

    this.button.appendChild(this.buttonContent);
    this.buttonContent.appendChild(this.textContainer);
    this.buttonContent.appendChild(this.arrowIcon);
    container.appendChild(this.button);

    this.setupEventListeners(options.onClick);
    this.setupResizeObserver();
    this.setupVisibilityObserver();
  }

  private calculateSize(): number {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const screenSize = Math.min(vw, vh);
    const size = Math.min(Math.max(screenSize * 0.15, this.minSize), this.maxSize);
    return Math.round(size);
  }

  private createButton(options: NowButtonOptions): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = 'now-widget-button';
    this.updateButtonStyles(button, options.backgroundColor);
    return button;
  }

  private createButtonContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = 'button-content';
    content.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    `;
    return content;
  }

  private updateButtonStyles(button: HTMLButtonElement, backgroundColor?: string): void {
    button.style.cssText = `
      width: clamp(40px, 15vw, ${this.currentSize}px);
      height: clamp(40px, 15vw, ${this.currentSize}px);
      background-color: ${backgroundColor ?? 'rgba(255, 255, 255, 0.1)'};
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      cursor: pointer;
      position: fixed;
      bottom: clamp(10px, 3vh, 20px);
      left: clamp(10px, 3vw, 20px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 32px rgba(255, 255, 255, 0.1);
      transition: opacity 0.3s ease;
      overflow: hidden;
      opacity: 1;
      z-index: 1000;
    `;
  }

  private createTextContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'text-ring';
    container.style.cssText = `
      width: 100%;
      height: 100%;
      position: absolute;
      animation: spin ${this.animationDuration}s linear infinite;
      transition: animation-duration 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    this.updateTextElements(container);
    return container;
  }

  private updateTextElements(container: HTMLDivElement): void {
    container.innerHTML = '';
    const chars = this.text.split('');
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'now-text';
      span.textContent = char;
      span.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: clamp(5px, 1.5vw, ${this.currentSize / 8}px);
        font-weight: bold;
        color: ${this.color};
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transform: translate(-50%, -50%) rotate(${(360 / chars.length) * index}deg) translateY(-${this.currentSize / 2 - this.currentSize / 8}px);
        transform-origin: center;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 1;
      `;
      container.appendChild(span);
    });
  }

  private createArrowIcon(): HTMLDivElement {
    const arrow = document.createElement('div');
    arrow.innerHTML =
      '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    this.updateArrowStyles(arrow);
    return arrow;
  }

  private updateArrowStyles(arrow: HTMLDivElement): void {
    arrow.style.cssText = `
      width: clamp(12px, 4vw, ${this.currentSize * 0.3}px);
      height: clamp(12px, 4vw, ${this.currentSize * 0.3}px);
      color: ${this.color};
      z-index: 1;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;
  }

  private setupEventListeners(onClick?: () => void) {
    if (onClick) {
      this.button.addEventListener('click', () => {
        onClick();
      });
    }

    // Touch events for mobile
    this.button.addEventListener('touchstart', () => {
      this.isHovered = true;
      this.updateStyles(true);
    });

    this.button.addEventListener('touchend', () => {
      this.isHovered = false;
      this.updateStyles(false);
    });

    // Mouse events for desktop
    this.button.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.animationDuration = 30;
      this.updateStyles(true);
    });

    this.button.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.animationDuration = 15;
      this.updateStyles(false);
    });

    // Mouse proximity effect (desktop only)
    const isTouchDevice = 'ontouchstart' in window;
    if (!isTouchDevice) {
      document.addEventListener('mousemove', (e) => {
        const rect = this.button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
        );

        const proximityThreshold = this.currentSize * 2;

        if (distance < proximityThreshold && !this.isHovered) {
          const speedFactor = 1 - distance / proximityThreshold;
          const newDuration = 15 - 7.5 * speedFactor;
          if (Math.abs(this.animationDuration - newDuration) > 0.1) {
            this.animationDuration = newDuration;
            this.textContainer.style.animationDuration = `${this.animationDuration}s`;
          }
        } else if (!this.isHovered) {
          if (Math.abs(this.animationDuration - 15) > 0.1) {
            this.animationDuration = 15;
            this.textContainer.style.animationDuration = '15s';
          }
        }
      });
    }
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      const newSize = this.calculateSize();
      if (newSize !== this.currentSize) {
        this.currentSize = newSize;
        this.updateButtonStyles(this.button);
        this.updateTextElements(this.textContainer);
        this.updateArrowStyles(this.arrowIcon);
      }
    });

    this.resizeObserver.observe(document.body);
  }

  private setupVisibilityObserver(): void {
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '100vh';
    sentinel.style.width = '1px';
    sentinel.style.height = '1px';
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.button.style.opacity = '1';
          } else {
            this.button.style.opacity = '0';
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
  }

  private updateStyles(isHovered: boolean) {
    this.buttonContent.style.transform = isHovered ? 'scale(1.1)' : 'scale(1)';
    this.arrowIcon.style.opacity = isHovered ? '1' : '0.9';

    Array.from(this.textContainer.children).forEach((child) => {
      (child as HTMLElement).style.opacity = isHovered ? '0.8' : '1';
    });

    this.textContainer.style.animationDuration = `${this.animationDuration}s`;
  }
}

export const createNowButton = (
  onClick: () => void,
  options: NowButtonOptions = {}
): HTMLElement => {
  const container = document.createElement('div');
  new NowButton(container, { ...options, onClick });
  return container.querySelector('button')!;
};