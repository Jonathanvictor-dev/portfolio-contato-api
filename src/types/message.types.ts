export interface CreateMessageRequest {
  name: string;
  email: string;
  content: string;
}

export interface MessageParams extends Record<string, string> {
  id: string;
}
