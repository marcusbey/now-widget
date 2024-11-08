import { EventEmitter } from './EventEmitter';
import { WidgetStore } from './WidgetStore';

export class WidgetCore {
  private store: WidgetStore;
  private events: EventEmitter;

  constructor() {
    this.store = new WidgetStore();
    this.events = new EventEmitter();
  }

  public dispatch(action: string, payload: any): void {
    this.store.dispatch(action, payload);
  }

  public subscribe(event: string, callback: Function): void {
    this.events.on(event, callback);
  }

  public unsubscribe(event: string, callback: Function): void {
    this.events.off(event, callback);
  }
}