
// api web config 
// const webapi = 'https://vh3.digime.space/api/'
const host = window.location.hostname;
const port = 8000;
// const webapi = `https://${host}/api/`
const webapi = `https://vh3.wwit.info/api/`
const apilocal = `https://${host}:${port}/api/`


const fetchapi = (path, value) => {

    // console.log(`${webapi + path}`)
    // console.log(value)

    return new Promise((resolve, reject) => {
        fetch(`${webapi + path}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value })
        }).then(response => { return resolve(response) })
    })
}

const fetchapiGet = (path, value) => {

    // console.log(`${webapi + path}`)
    // console.log(value)

    return new Promise((resolve, reject) => {
        fetch(`${webapi + path}`, {
            method: 'get',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ value })
        }).then(response => { return resolve(response) })
    })
}

const fetchapiDelete = (path, value) => {

    // console.log(`${webapi + path}`)
    // console.log(value)

    return new Promise((resolve, reject) => {
        fetch(`${webapi + path}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value })
        }).then(response => { return resolve(response) })
    })
}
const fetchapiUpData = (path, value) => {

    // console.log(`${webapi + path}`)
    // console.log(value)

    return new Promise((resolve, reject) => {
        fetch(`${webapi + path}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value })
            // }).then(response => console.log(response) 
        }).then(response => { return resolve(response) })


    })
}

export { webapi, apilocal, fetchapi, fetchapiDelete, fetchapiUpData, fetchapiGet }