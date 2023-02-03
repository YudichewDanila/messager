export async function requestGET(src){
    const response = await fetch(`http://localhost:8082/${src}`,{
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
})
let result = await response.json();
return result;
}

export async function requestPOST(src, data){
 
    const response = await fetch(`http://localhost:8082/${src}`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    let result = await response.json();
    return result;
}

export async function requestPUT(src, data){
 
    const response = await fetch(`http://localhost:8082/${src}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    let result = await response.json();
    return result;
}


export async function authorizToken(src, token, data = {}){
    const response = await fetch(`http://localhost:8082/${src}`,{
        method:'POST',
        headers:{
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    const result = await response.json();
    return result;
}

export async function downloadAvatar(src, NewImage){
 
        let fd = new FormData();
        fd.append('file', NewImage);
        await fetch(`http://localhost:8082/${src}`,{
            method : 'POST',
            body: fd
        })         
    
}