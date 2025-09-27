export interface ApiServerResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export interface Review {
  id: number;
  imageUrl: string;
  name: string;
  city: string;
  text: string;
}
