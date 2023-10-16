export interface UserInterface {
    _id:        string;
    rut:        string;
    username:   string;
    name:       string;
    lastNameM:  string;
    lastNameF:  string;
    email:      string;
    role:       string;
    isVerified: boolean;
    avatar:     string;
}

export interface AddUserInterface {
    rut:        string;
    username:   string;
    name:       string;
    lastNameM:  string;
    lastNameF:  string;
    email:      string;
    password:   string;
    role:       string;
}