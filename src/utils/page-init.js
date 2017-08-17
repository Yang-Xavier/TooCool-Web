/**
 * Created by yangbingxun on 2017/8/8.
 */

const page_init_setting = () => {

    const preventDefault = ev => {
        ev.preventDefault()
    };
    const isScroller = el => {
        // 判断元素是否为 scroller
        return el.classList.contains('scroller');
    };


    document.body.style.height = screen.height + 'px';
    document.addEventListener('touchmove', preventDefault, false);
    document.body.addEventListener('touchmove', function (ev) {
        const target = ev.target;
        // 在 scroller 上滑动，阻止事件冒泡，启用浏览器默认行为。
        if (isScroller(target)) {
            ev.stopPropagation()
        }

    }, false)
};

export default page_init_setting;