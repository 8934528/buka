export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface UpdateProfileRequest {
    name: string;
    email: string;
}
  
  export interface ZodiacResult {
    sign: string;
    strengths: string;
    weaknesses: string;
    colors: string;
  }
  
  export interface HistoryItem {
    sign: string;
    strengths: string;
    weaknesses: string;
    colors: string;
    createdAt: string;
  }
  
  export interface LoginRequest {
    email: string;
    passwordHash: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    passwordHash: string;
  }
  
  export interface AuthResponse {
    token: string;
  }
  