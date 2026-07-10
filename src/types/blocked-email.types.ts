export interface BlockEmailRequest {
  email: string;
}

export interface BlockedEmailParams extends Record<string, string> {
  id: string;
}
