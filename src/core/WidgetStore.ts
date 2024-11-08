import { Post, User } from '../types/types';

interface State {
  user: User | null;
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  isPanelOpen: boolean;
}

export class WidgetStore {
  private state: State;
  private listeners: ((state: State) => void)[];

  constructor() {
    this.state = {
      user: null,
      posts: [],
      isLoading: false,
      error: null,
      isPanelOpen: false
    };
    this.listeners = [];
  }

  public getState(): State {
    return { ...this.state };
  }

  public subscribe(listener: (state: State) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public dispatch(action: string, payload: any): void {
    switch (action) {
      case 'SET_USER':
        this.state.user = payload;
        break;
      case 'SET_POSTS':
        this.state.posts = payload;
        break;
      case 'SET_LOADING':
        this.state.isLoading = payload;
        break;
      case 'SET_ERROR':
        this.state.error = payload;
        break;
      case 'TOGGLE_PANEL':
        this.state.isPanelOpen = payload;
        break;
    }
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}