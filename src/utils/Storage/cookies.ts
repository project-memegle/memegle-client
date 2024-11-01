// cookies.ts

// 쿠키 저장 함수
export const setCookie = (name: string, value: string, days?: number): void => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${
        value || ''
    }${expires}; path=/; secure; samesite=strict`;
};

// 쿠키 가져오기 함수
export const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
};

// 쿠키 삭제 함수
export const deleteCookie = (name: string): void => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};
