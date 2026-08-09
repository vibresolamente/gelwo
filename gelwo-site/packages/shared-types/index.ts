export interface UserDTO {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  roles: string[];
}

export interface AuthResponseDTO {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserDTO;
  };
  error?: string;
}

export interface LoginRequestDTO {
  email: string;
  password?: string; // Optional if using OAuth in future
}

export interface RegisterRequestDTO {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}
