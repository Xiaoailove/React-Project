import ajax from './ajax';
export function reqLogin(username,password){
    const BASE=''
   return ajax(
        {
            method: 'post',
            url: BASE+'/login',
            data: {
                username,
                password
            }
        }
    )
}

