
export interface Worker {
    id: number;
    rut: string;
    email: string;
    name: string;
    password: string;
    last_name: string;
    user_type: string;
    user_enabled: boolean;
    phone: string;
    address: string;
}

export interface Administrator {
    id: number;
    rut: string;
    email: string;
    name: string;
    last_name: string;
    user_type: string;
    user_enabled: boolean;
    phone: string;
    address: string;
}