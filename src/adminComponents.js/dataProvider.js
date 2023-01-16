import { stringify } from 'query-string';
import axios from 'axios';
import fetch from 'cross-fetch';


const apiUrl = 'http://localhost:3000';


const dataProvider= {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        
        let len = 0;
        return axios.get(url)
            .then(response => {
                
                len =parseInt(response.headers.get('content-range').split('/').pop(), 10);

                return(
                        {
                            data: response.data,
                            total:len
                        }
                    ); 
            })
            .catch(error => console.log('\nError '+ error.message))
        
        },

        getOne: (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;
            return fetch(url)
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },)
                    .then(response => response.json())
                    .then(response=> {
                        
                        return({
                                data: response,
                        });                     
                        })
                       .catch(error => console.log('Couldn\'t fetch the data\nError '+ error.message));
        },
    
        getMany: (resource, params) => {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            
            return fetch(url)
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },)
                    .then(response => response.json())
                    .then(response=> {
                        return({
                                data: response,
                        });                     
                    })
                    .catch(error => console.log('Couldn\'t fetch the data\nError '+ error.message))
        },

        getManyReference: (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify({
                    ...params.filter,
                    [params.target]: params.id,
                }),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            let len = 0;
            return fetch(url)
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },)
                    .then(response => {
                        len =parseInt(response.headers.get('content-range').split('/').pop(), 10);
                       return response.json()
                    })
                    .then(response=> {
                        console.log(response.length);
                        return(
                            {
                                data: response,
                                total: len
                            }
                        );                     
                        })
                    .catch(error => console.log('Couldn\'t fetch the data\nError '+ error.message))

        },

        update: async (resource, params) => {

            const url = `${apiUrl}/${resource}/${params.id}`;
            const bearer = 'Bearer ' + localStorage.getItem('token');
                        
            if (resource === 'programs' || resource === 'carousels') {
                const formData = new FormData();
                if(params.data.pictures) {
                    formData.append("imageFile",params.data.pictures.rawFile);
                }
                let {pictures, ...datas} = params.data;
                formData.append("datas", JSON.stringify(datas));   
                const response = await axios.put(url, formData, 
                    { headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': bearer
                    }});
                
                return({
                    data: response.data                        
                    }
                );
            } else if(resource === 'classes'){
                fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin'
                }).then(response => response.json())
                .then(response => {
                    //change enroll status of students  and program end and start date                 
                    for(let student of response.students){
                        //change enroll status of previous students to false. 
                        // put the program start and end date to null
                        if(!params.data.students.includes(student)){
                            let url = `${apiUrl}/students/${student.student}`;
                    
                            fetch(url, {
                                method: 'PUT',
                                body: JSON.stringify({                
                                    enrolled: false, 
                                    programStartDate: '',
                                    programEndDate: '',
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': bearer
                                },
                                credentials: 'same-origin'
                            })
                            .catch(error => console.log('Error '+ error.message))  
                        } 
                    }
                })
                return fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    credentials: 'same-origin'
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => response.json())
                .then(response=> {
                    //change enroll status of new students to true.                    
                    for(let student of response.students){
                        let url = `${apiUrl}/students/${student.student}`;
                        
                        fetch(url, {
                            method: 'PUT',
                            body: JSON.stringify({                
                                enrolled: true, 
                                programStartDate: response.classStartDate,
                                programEndDate: response.classEndDate
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': bearer
                            },
                            credentials: 'same-origin'
                        })
                        .catch(error => console.log('Error '+ error.message))                        
                    }
                    return({
                        data: response
                    })})
                .catch(error => console.log('Error '+ error.message))
            
            } 
            else {                
                return fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': bearer
                        },
                        credentials: 'same-origin'
                    })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },)
                    .then(response => response.json())
                    .then(response=> ({
                        data: response
                        }))
                    .catch(error => console.log('Error '+ error.message))
                
            }
            
            },

        updateMany: (resource, params) => {
            const query = {
                filter: JSON.stringify({ id: params.ids}),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const bearer = 'Bearer ' + localStorage.getItem('token');

            return fetch(url, {
                method: 'PUT',
                body: JSON.stringify(params.data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                credentials: 'same-origin'
            })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },)
                    .then(response => response.json())
                    .then(response=> {
                        console.log(response.length);
                        return({
                                data: response,                        
                            }
                        );                     
                        })
                        .catch(error => console.log('Couldn\'t fetch the data\nError '+ error.message));
        },

        create: async (resource, params) =>{
            const url = `${apiUrl}/${resource}`;
            const bearer = 'Bearer ' + localStorage.getItem('token');

            if(resource === 'programs' || resource === 'carousels'){
                console.log("we are In")
                const formData = new FormData();
                if(params.data.pictures) {
                    formData.append("imageFile",params.data.pictures.rawFile);
                }
                let {pictures, ...datas} = params.data;
                console.log(datas); 
                
                formData.append("datas", JSON.stringify(datas));

                const response = await axios.post(url, formData, 
                    { headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': bearer
                    }});
                
                return({
                    data: { ...datas, id: response.data.id },                        
                    }
                );
            } else if(resource === 'classes'){
                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    credentials: 'same-origin'
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => response.json())
                .then(response=> {
                    //enroll students and program start date
                    for(let student of response.students){
                        let url = `${apiUrl}/students/${student.student}`;
                    
                        fetch(url, {
                            method: 'PUT',
                            body: JSON.stringify({
                                enrolled: true, 
                                programStartDate: response.classStartDate,
                                programEndDate: response.classEndDate
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': bearer
                            },
                            credentials: 'same-origin'
                        })
                        .catch(error => console.log('Error '+ error.message))
                        
                    }
                    return({
                        data: { ...params.data, id: response.id }                       
                        }
                    );  
                })
                .catch(error => console.log('Error '+ error.message))
            }
             else {
                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(params.data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    credentials: 'same-origin'
                    })
                    .then(response => {
                        if(response.ok) {
                            return response;
                        } else {
                            var error = new Error('Error ' + response.status + ': ' + response.statusText);
                            error.response = response;
                            throw error;
                        }
                    },)
                    .then(response => response.json())
                    .then(response=> {
                        
                        return({
                            data: { ...params.data, id: response.id }                       
                            }
                        );                     
                    })
                    .catch(error => console.log('Error '+ error.message));

            }
            
            },  
        
        delete: (resource, params) =>{
            const url = `${apiUrl}/${resource}/${params.id}`; 
            const bearer = 'Bearer ' + localStorage.getItem('token');

            if(resource === 'classes'){
                //unenroll if he class is deleted
                params.previousData.students.forEach(student => {

                    let url = `${apiUrl}/students/${student.student}`;
                          
                    fetch(url, {
                        method: 'PUT',
                        body: JSON.stringify({enrolled: false}),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': bearer
                        },
                        credentials: 'same-origin'
                    })
                    .catch(error => console.log('Error '+ error.message))
                });

            }
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                credentials: 'same-origin'
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => response.json())
                .then(response=> {
                    return({
                        data: response,                        
                        }
                    );                     
                    })
                .catch(error => console.log('Couldn\'t fetch the data\nError '+ error.message))
        }, 
        
        deleteMany: (resource, params) => {
            const query = {
                filter: JSON.stringify({ id: params.ids}),
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            const bearer = 'Bearer ' + localStorage.getItem('token');

            if(resource === 'classes'){
                //unenroll students 
                //fetch classes and unenroll students
                fetch(url,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    credentials: 'same-origin'
                }).then(response => response.json())
                .then(response => {
                    
                    response.forEach(theClass => {
                        
                        for(let student of theClass.students){
                            let url = `${apiUrl}/students/${student.student}`;
                        
                            fetch(url, {
                                method: 'PUT',
                                body: JSON.stringify({enrolled: false}),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': bearer
                                },
                                credentials: 'same-origin'
                            })
                            .catch(error => console.log('Error '+ error.message))
                            
                        }
                        
                    })
                })
                .catch(error => console.log('Error '+ error.message))
            }
           
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                credentials: 'same-origin'
                })
                .then(response => {
                    if(response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },)
                .then(response => response.json())
                .then(response=> {
                    return({
                        data: response,                        
                        }
                    );                     
                    })
                .catch(error => console.log('Couldn\'t fetch the data\nError '+ error.message))
            
        }
};


export default dataProvider;



