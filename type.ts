// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace NodeJS {
    export interface ProcessEnv {
        EMAILJS_PUBLIC_KEY: string,
        EMAILJS_PRIVATE_KEY: string,
        SERVICE_ID: string,
        TEMPLATE_ID: string,
    }
}