/**
 * Created by yangbingxun on 2017/9/9.
 */


const host = 'http://api.finepix.top';
export default {
    modelStyleTransfer: host + '/tasks/add/model',
    getTask: host + '/tasks/pop',
    customStyleTransfer: host + '/tasks/add/customized',
    protectColor: host + '/tasks/add/color',
    queryTask: host + '/tasks/',
    tasksFinished: host + '/tasks/finish',
    fileUpload: host + '/file/upload'
}