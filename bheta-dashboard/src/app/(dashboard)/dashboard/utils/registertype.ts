export interface UserData {
    first_name:string;
    last_name:string;
    email:string;
    password:string;
}
export interface RegistrationErrorResponse {
    error: string;
    details?:{
        field?: string;
        message?: string;
    };
}
export interface RegistrationSuccessResponse {
    message: string;
    users: UserData[];
}