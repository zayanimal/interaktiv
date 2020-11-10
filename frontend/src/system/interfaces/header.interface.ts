type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface IHeader {
    url: string;
    method: HttpMethod,
    body?: object
}
