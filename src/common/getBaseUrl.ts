export default function getBaseUrl() { 
    return process.env.NODE_ENV === "production" ? "" : "http://localhost";
}