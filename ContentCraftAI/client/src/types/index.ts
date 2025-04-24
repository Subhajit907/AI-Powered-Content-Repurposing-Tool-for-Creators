export interface VideoInfo {
  videoId: number;
  fileName: string;
  fileSize: number;
  duration?: number;
  wordCount?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
