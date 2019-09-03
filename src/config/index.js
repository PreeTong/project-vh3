
// api web config 
// const webapi = 'https://vh3.digime.space/api/'
const webapi = 'https://vh3.wwit.info/api/'
const apilocal = 'http://localhost:8250/api/'

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
        }).then(response => { return resolve(response) })
    })
}

export { webapi, apilocal, fetchapi, fetchapiDelete, fetchapiUpData }