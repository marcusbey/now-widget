export class EventEmitter {
  private events: Map<string, Function[]>;

  constructor() {
    this.events = new Map();
  }

  public on(event: string, callback: Function): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(callback);
  }

  public off(event: string, callback: Function): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      this.events.set(event, callbacks.filter(cb => cb !== callback));
    }
  }

  public emit(event: string, data?: any): void {
    this.events.get(event)?.forEach(callback => callback(data));
  }
}