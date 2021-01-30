export class BaseResponse<Data = {}> {
    public code!: number;
    public response!: Data;
    public error?: string;
  }