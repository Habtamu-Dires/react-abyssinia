import {baseUrl} from '../shared/baseUrl'
const authProvider = {
    //called when the user attempts to log in
    login: ({username:username, password: password}) => {
        const creds = {username:username, password:password}
        
        return fetch(baseUrl + 'users/login', {
                    method: 'POST',
                    headers: { 
                        'Content-Type':'application/json' 
                    },
                    body: JSON.stringify(creds)
                })
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        // If login was successful, set the token in local storage
                        localStorage.setItem('token', response.token);
                        //if you needs creds username, firstname, lastname 
                        console.log(response.creds)
                        //localStorage.setItem('creds', JSON.stringify(creds));
                        return Promise.resolve();
                    }
                    else {
                        return Promise.reject()
                    }
                })
            .catch(err => { return Promise.reject()})
        //localStorage.setItem('username', username);
        //accept all username/password combinations
        //return Promise.resolve();
    },
    //called when the user clickds on the logout button
    logout: () => {
        //localStorage.removeItem('username');
        localStorage.removeItem('token');
        //localStorage.removeItem('creds');
        return Promise.resolve();
    },
    //called when the API returns an error
    checkError: ({status}) =>{
        if(status === 401 || status === 403) {
            //localStorage.removeItem('username');
            localStorage.removeItem('token');
            //localStorage.removeItem('creds');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    //called when the user navigates to a new location, to check for authentication
    checkAuth:()=>{
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },
    //called when the user navigate to a new location, to check for permissions
    getPermissions:() => Promise.resolve()
};

export default authProvider;