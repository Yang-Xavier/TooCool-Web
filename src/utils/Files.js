/**
 * Created by yangbingxun on 2017/9/9.
 */


export const imgExtAllow = fileName => {
    const fileExt = ['.png', '.jpg', '.jpeg'];
    const index = fileExt.indexOf(fileName.toLowerCase().match(/\.\w*$/)[0]);
    if(index == -1) return false;
    else return true
};