export interface BlockEmailRequest {
  email: string;
  reason: string;
}

export interface BlockedEmailParams extends Record<string, string> {
  email: string;
}
