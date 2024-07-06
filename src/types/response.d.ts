
interface SuccessResponseData<T> {
  data: T | null;
  message: string | null;
}

interface ErrorResponseData {
  error: string | null;
}

