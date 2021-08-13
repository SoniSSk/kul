function shouldRedirectOnLogout(path: string){
    switch (path){
        case "/checkout":
            return true;
        case "/payment-summary":
            return true;
        case "/profile":
            return true;
        case "/dashboard":
            return true;
    }

    return false;
}

export default shouldRedirectOnLogout;