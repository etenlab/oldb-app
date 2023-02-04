
export const toCamelCase = (str: string) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m:string, chr: string) => chr.toUpperCase());
}

export function decodeToken(str: string) {
    str = str.split('.')[1];

    str = str.replace(/-/g, '+');
    str = str.replace(/_/g, '/');
    switch (str.length % 4) {
        case 0:
            break;
        case 2:
            str += '==';
            break;
        case 3:
            str += '=';
            break;
        default:
            throw Object.assign(
                new Error('Invalid token'),
                { code: 402 }
            );
    }

    str = decodeURIComponent(escape(atob(str)));
    str = JSON.parse(str);
    return str;
}

export function checkTokenValidity(_token: any){
    if(_token && Object.keys(_token).length > 0){
        var time = new Date().getTime()/ 1000;
        if(!_token.exp || _token.exp < time){
            return false;
        }
        else{
            return true;
        }
    }
}

export const isAutherized = (tokenObj:any) => {
    if (tokenObj && checkTokenValidity(tokenObj)) {
        // return roles.some((r: any) => {
        //     const realm = tokenObj.realm_access.roles.includes(r); // keycloak.hasRealmRole(r);
        //     const resource = tokenObj.resource_access.account.roles.includes(r);
        //     return realm || resource;
        // });
        return true;
    }
    return false;
   }