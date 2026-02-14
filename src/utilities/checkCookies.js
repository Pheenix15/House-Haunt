export const checkCookiesEnabled = () => {
    try {
        // Attempt to set a test cookie
        document.cookie = "hh_cookie_test=1; SameSite=Lax";

        // Immediately try to read it
        const cookiesEnabled = document.cookie.includes("hh_cookie_test=");

        // Cleanup
        document.cookie =
            "hh_cookie_test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        return cookiesEnabled;
    } catch {
        // If any error occurs, assume cookies are disabled
        return false;
    }
};
