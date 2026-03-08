// src/app/core/models/user.ts

export type RoleType = 'ADMIN' | 'CORPORATE' | 'INDIVIDUAL';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role_type: RoleType; // [cite: 45]
  gender?: string; // [cite: 45]
}

export interface CustomerProfile {
  id: number;
  user_id: number;
  age?: number; // [cite: 46]
  city?: string; // [cite: 46]
  membership_type?: string; // [cite: 46]
}
