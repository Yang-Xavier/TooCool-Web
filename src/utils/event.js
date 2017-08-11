/**
 * Created by yangbingxun on 2017/8/10.
 */

//封装touchevent事件
// EventTarget.prototype.addTouchEventListener = (name, fn) => {
//     const _fn = e => {
//         const top = e.target.offsetTop;
//         const left = e.target.offsetLeft;
//         for(let i = 0; i < e.touches.length; i++) {
//             e.touches[i].offsetX = e.touches[i].clientX - left;
//             e.touches[i].offsetY = e.touches[i].clientY - top;
//         }
//         for(let i = 0; i < e.targetTouches.length; i++) {
//             e.targetTouches[i].offsetX = e.targetTouches[i].clientX - left;
//             e.targetTouches[i].offsetY = e.targetTouches[i].clientY - top;
//         }
//         for(let i = 0; i < e.changedTouches.length; i++) {
//             e.changedTouches[i].offsetX = e.changedTouches[i].clientX - left;
//             e.changedTouches[i].offsetY = e.changedTouches[i].clientY - top;
//         }
//         console.dir(e)
//         fn(e);
//     };
//
//     EventTarget.prototype.addEventListener.call(this, name, _fn.bind(this));
// };
// const _dispatch = EventTarget.prototype.dispatchEvent;
// EventTarget.prototype.dispatchEvent = () => {
//     // console.log(123)
//     // _dispatch()
// }
// Touch.prototype.offsetY = () => {
//     console.dir();
//     // const top = this.target.offsetTop;
//     // const left = this.target.offsetLeft;
//     // return this.clientY - top;
// }
// Touch.prototype.offsetX = () => {
//     // const left = this.target.offsetLeft;
//     // return this.clientX - top
// }