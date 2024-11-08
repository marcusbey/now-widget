import { Post, User } from '../types/types';

export class ApiService {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  public async getUserInfo(userId: string): Promise<User> {
    return this.request<User>(`/api/widget/user-info?userId=${userId}`);
  }

  public async getUserPosts(userId: string): Promise<Post[]> {
    return this.request<Post[]>(`/api/widget/user-posts?userId=${userId}`);
  }
}