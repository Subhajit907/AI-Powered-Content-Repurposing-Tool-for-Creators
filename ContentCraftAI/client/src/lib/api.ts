import { apiRequest } from './queryClient';
import { RepurposeContentRequest, RepurposeContentResponse } from '@shared/schema';

// Repurpose content
export async function repurposeContent(data: RepurposeContentRequest): Promise<RepurposeContentResponse> {
  const response = await apiRequest('POST', '/api/content/repurpose', data);
  return response.json();
}

// Get video info
export async function getVideoInfo(videoId: number) {
  const response = await fetch(`/api/videos/${videoId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch video info');
  }
  return response.json();
}
