import { ApiResponse, ApiError } from '@/types';

// Configuration
const API_CONFIG = {
  baseDelay: 100, // Base delay in ms
  maxDelay: 400, // Maximum delay in ms
  errorRate: 0.05, // 5% chance of random error (for testing)
};

// Simulate network delay
export function simulateNetworkDelay(minDelay: number = API_CONFIG.baseDelay, maxDelay: number = API_CONFIG.maxDelay): Promise<void> {
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  return new Promise(resolve => setTimeout(resolve, delay));
}

// Simulate API success/failure
export function simulateAPIResponse<T>(
  data: T,
  success: boolean = true,
  message?: string
): Promise<ApiResponse<T>> {
  return new Promise(async (resolve, reject) => {
    await simulateNetworkDelay();
    
    // Simulate random errors (for testing error handling)
    if (Math.random() < API_CONFIG.errorRate && success) {
      const error: ApiError = {
        code: 'RANDOM_ERROR',
        message: 'A random error occurred. Please try again.',
      };
      reject(error);
      return;
    }
    
    const response: ApiResponse<T> = {
      data,
      success,
      message,
      timestamp: new Date().toISOString(),
    };
    
    resolve(response);
  });
}

// Create API error
export function createApiError(code: string, message: string, details?: Record<string, string>): ApiError {
  return {
    code,
    message,
    details,
  };
}

// Handle API errors
export function handleApiError(error: unknown): ApiError {
  if (error && typeof error === 'object' && 'code' in error) {
    return error as ApiError;
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  };
}

// Base API class for all services
export abstract class BaseApiService {
  protected async request<T>(
    operation: () => Promise<T>,
    errorMessage?: string
  ): Promise<ApiResponse<T>> {
    try {
      const data = await operation();
      return simulateAPIResponse(data, true);
    } catch (error) {
      const apiError = handleApiError(error);
      throw {
        code: apiError.code,
        message: errorMessage || apiError.message,
      };
    }
  }
}

// Request interceptor (for logging, auth tokens, etc.)
export function requestInterceptor(config: {
  endpoint: string;
  method: string;
  data?: unknown;
}): void {
  console.log(`[API Request] ${config.method.toUpperCase()} ${config.endpoint}`, config.data || '');
}

// Response interceptor (for logging, error handling, etc.)
export function responseInterceptor<T>(response: ApiResponse<T>): void {
  console.log(`[API Response] Success: ${response.success}`, response.message || '');
}

// Error interceptor
export function errorInterceptor(error: ApiError): void {
  console.error(`[API Error] ${error.code}: ${error.message}`, error.details || '');
}
