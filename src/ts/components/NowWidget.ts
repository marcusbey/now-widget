"use client";

import { Post, User } from "@/ts/types/types";
import {
  animatePanel,
  cleanupWidget,
  initializeWidget,
} from "@utils/widgetUtils";

interface WidgetConfig {
  userId: string;
  token: string;
  theme?: "light" | "dark";
  position?: "left" | "right";
  buttonColor?: string;
  buttonSize?: number;
  pathname?: string; // Optional pathname prop for testing purposes
}

const NowWidget = (config: WidgetConfig): void => {
  const {
    userId,
    token,
    theme = "light",
    position = "left",
    buttonColor = "red",
    buttonSize = 150,
    pathname = window.location.pathname,
  } = config;

  let isOpen = false;
  let posts: Post[] = [];
  let user: User | null = null;
  let isLoading = false;
  let error: string | null = null;

  // Initialize Widget
  initializeWidget({
    setIsOpen: (open: boolean) => {
      isOpen = open;
      animatePanel(isOpen, position);
    },
    theme,
    position,
    buttonColor,
    buttonSize,
    posts,
    user,
    isLoading,
    error,
  });

  // Fetch Data
  const fetchData = async () => {
    isLoading = true;
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}/api/widget/user-data?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        posts = data.data.recentPosts;
        user = data.data.user;
      } else {
        throw new Error(data.error || "Failed to fetch data");
      }
    } catch (err) {
      error = err instanceof Error ? err.message : "An unexpected error occurred";
    } finally {
      isLoading = false;
    }
  };

  fetchData();

  // Cleanup on widget removal
  window.addEventListener("beforeunload", () => {
    cleanupWidget();
  });
};

export default NowWidget;