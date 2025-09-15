interface anonymousObject {
  [Key: string | number]: string | number;
}
export interface SuccessDetailResponse {
  message:    string;
  data: anonymousObject;
  request_id: string;
}