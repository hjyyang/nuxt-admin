
import { Loading } from 'element-ui'

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}

export default function (app) {
    app.$axios.onRequest(config => {
        // console.log('Making request to ' + config.url)
        if (process.browser) {    //判断是否为客户端（必须）
            startLoading();
        }
    })

    app.$axios.onResponse(response => {
        if (process.browser) {    //判断是否为客户端（必须）
            endLoading();
        }
    })

    app.$axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
}