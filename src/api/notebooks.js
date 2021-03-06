import request from '../helpers/request'
import { friendlyDate } from '../helpers/util'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id',
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET)
                .then(res => {
                    res.data = res.data.sort((a, b) => b.id - a.id)
                    res.data.forEach(notebook => {
                        notebook.createdDate = friendlyDate(notebook.createdAt)
                    })
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })

        })

    },
    updateNotebook(notebookId, {
        title = ''
    } = {
        title: ''
    }) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {
            title
        })
    },
    deleteNotebook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    },
    addNotebook({
        title = ''
    } = {
        title: ''
    }) {
        return request(URL.ADD, 'POST', {
            title
        })
    }
}