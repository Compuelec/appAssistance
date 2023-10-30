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

export interface StudentOnLineInterface {
    _id:       string;
    createdAt: Date;
    student:   Student;
    class:     Class;
}

export interface Class {
    _id:     string;
    course:  string;
    room:    string;
    teacher: Student;
}

export interface Student {
    _id:       string;
    name:      string;
    lastNameM: string;
    lastNameF: string;
}