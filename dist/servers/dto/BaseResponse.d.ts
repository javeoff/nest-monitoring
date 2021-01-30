export declare class BaseResponse<Data = {}> {
    code: number;
    response: Data;
    error?: string;
}
