/**
 * Created by yangbingxun on 2017/9/9.
 */

require('es6-promise').polyfill();

const Token = 'Bearer 45a207ef-7e99-4166-acbf-e74b0b74f773';

const getXhr = () => {
    return new XMLHttpRequest();
};

export const ajax = (_option) => {
    let option = {
        method: 'get',
        data: null,
        url: '',
        token: Token,
        headers: {},
        async: true
    };

    _option.headers && Object.assign(_option.headers, option.headers);
    Object.assign(option, _option);

    const xhr = getXhr();

    xhr.open(option.method.toUpperCase(), option.url, option.async);

    for(let key in option.headers) {
        xhr.setRequestHeader(key, option.headers[key])
    }

    return new Promise( res => {
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    try{
                        res(JSON.parse(xhr.responseText))
                    } catch (e) {
                        res(xhr.responseText)
                    }

                } else {
                    res(null);
                }
            }
        }

        xhr.send(option.data);
    })

};
