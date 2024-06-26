export interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    access_token: string;
    refresh_token: string;
    expiry: number;
}