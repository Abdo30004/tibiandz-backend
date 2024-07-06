export class SuccessResponse<T> {
  public data: T | null = null;
  public message: string | null = null;
  public success: boolean = true;

  constructor(responseData?: SuccessResponseData<T>) {
    if (!responseData) return;
    this.data = responseData.data;
    this.message = responseData.message;
  }

  public setData(data: T): SuccessResponse<T> {
    this.data = data;
    return this;
  }

  public setMessage(message: string): SuccessResponse<T> {
    this.message = message;
    return this;
  }
}

export class ErrorResponse {
  public error: string | null = null;
  public success: boolean = false;

  constructor(responseData?: ErrorResponseData) {
    if (!responseData) return;
    this.error = responseData.error;
  }

  public setError(error: string): ErrorResponse {
    this.error = error;
    return this;
  }
}
