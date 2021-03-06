import { Photo } from './photo';

export interface User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    designate: string;
    phoneNumber: string;
    email: string;
    gender: string;
    dateOfBirth: Date;
    age: number;
    created: Date;
    lastActive: any;
    photoUrl: string;
    sitio?: string;
    barangay?: string;
    city?: string;
    country?: string;
    skills?: string;
    certificates?: string;
    population?: string;
    photos?: Photo[];
    roles?: string[];
}
