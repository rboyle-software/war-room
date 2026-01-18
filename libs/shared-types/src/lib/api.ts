import { Coordinates, EnrichedLocation } from './location';
import { Owner } from './owner';

// Search Request/Response
export interface LocationSearchRequest {
  query: string;
  location: Coordinates;
  radius: number; // meters, max 50000
  ownerFilter?: string;
  ownerIds?: string[];
  pageToken?: string;
}

export interface LocationSearchResponse {
  results: EnrichedLocation[];
  nextPageToken?: string;
  totalResults: number;
  cacheHit: boolean;
}

// Owner Search
export interface OwnerSearchParams {
  q: string;
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
}

// Auth
export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// API Error
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}
