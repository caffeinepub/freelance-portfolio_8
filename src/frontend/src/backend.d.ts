import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    name: string;
    description: string;
}
export interface Service {
    title: string;
    description: string;
    iconName: string;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface PortfolioItem {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
}
export interface Testimonial {
    clientName: string;
    role: string;
    quote: string;
    company: string;
    rating: bigint;
}
export interface backendInterface {
    getCategories(): Promise<Array<Category>>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getPortfolio(): Promise<Array<PortfolioItem>>;
    getPortfolioByCategory(category: string): Promise<Array<PortfolioItem>>;
    getPortfolioTitles(): Promise<Array<string>>;
    getServiceByTitle(title: string): Promise<Service>;
    getServiceTitles(): Promise<Array<string>>;
    getServices(): Promise<Array<Service>>;
    getTestimonialCount(): Promise<bigint>;
    getTestimonials(): Promise<Array<Testimonial>>;
    submitContact(name: string, email: string, message: string): Promise<void>;
}
