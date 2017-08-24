/**
 * Created by yangbingxun on 2017/8/9.
 */

//传入的img必须是onload的
//硬性调整
export const readUrlToImg = url => {
    const img = document.createElement("img");
    img.src = url;
    return new Promise( res => {
        img.onload = e => {
            const cvs = document.createElement('canvas');
            const ctx = cvs.getContext('2d');
            cvs.width = img.width;
            cvs.height = img.height;
            ctx.drawImage(img,0,0);
            const img2 = document.createElement('img');
            img.src = cvs.toDataURL();
            img.onload = e => {
                res(img);
            }
        }
    })
};

export const readFileAsImg = file => {
    if(!file) {
        throw '请选择文件'
    }
    const fr = new FileReader();
    fr.readAsDataURL(file);

    return new Promise( res => {
        fr.onload = e => {
                res(fr.result);
        }
    })

};

export const resize = (img, max_width = screen.width, max_height = screen.height, onlyWH = false) => {
    if(!img.complete) {
        throw '图片加载完成才能处理'
    }
    if(img.width == max_width && img.height == max_height) {
        return new Promise(res => {
            res(img);
        });
    }
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    let newWidth = 0;
    let newHeight = 0;
    let scale = imgWidth/max_width;
    if(imgHeight / scale > max_height) {
        scale = imgHeight / max_height;
        newWidth = (imgWidth/scale).toFixed(0);
        newHeight = max_height;
    } else {
        newWidth = max_width;
        newHeight = (imgHeight/scale).toFixed(0);
    }
    if(onlyWH) {
        return {width: newWidth, height: newHeight};
    }
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = newWidth;
    cvs.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth , newHeight);
    img.src = cvs.toDataURL();

    return new Promise(res => {
        if(img.complete) {
            res(img);
        } else {
            img.onload = e => {
                res(img);
            }
        }
    });


};

export const crop = (img, x, y, width, height) => {
    if(!img.complete) {
        throw '图片加载完成才能处理'
    }
    const cvs = document.createElement('canvas');
    const newImg = document.createElement('img');
    const ctx = cvs.getContext('2d');
    cvs.width = width;
    cvs.height = height;
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
    newImg.src = cvs.toDataURL();
    return new Promise(res => {
        if(newImg.complete) {
            res(newImg)
        } else {
            newImg.onload = e => {
                res(newImg);
            }
        }
    });
};

export const rotate = (img, forward, deg = 90) => {
    if(!img.complete) {
        throw '图片加载完成才能处理'
    }
    const angle = (forward? 1 : -1) * deg * Math.PI / 180;
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    const width = img.width;
    const height = img.height;
    const edge = Math.max(height,width);
    const rotateStatus = (deg / 90) % 4;
    cvs.width =  edge ;
    cvs.height =  edge ;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    ctx.translate(-width / 2, -height / 2);
    switch (rotateStatus) {
        case 1:
            ctx.drawImage(img, (height - width) /2, (height - width) /2);
            img.src = cvs.toDataURL();
            return new Promise(res => {
                img.onload = e => {
                    const result1 = crop(img, 0, 0, height, width);
                    result1.then(
                        img2 => {
                            res(img2)
                        }
                    )

                }
            });
            break;
        case 2:
            ctx.drawImage(img, 0, 0);
            img.src = cvs.toDataURL();

            return new Promise(res => {
                img.onload = e => {
                    const result2 = crop(img, 0, 0, width, height);
                    result2.then(
                        img2 => {
                            res(img2)
                        }
                    )

                }
            });
            break;
        case 3:
            ctx.drawImage(img, (height - width) /2, (height - width) /2);
            img.src = cvs.toDataURL();
            return new Promise(res => {
                img.onload = e => {
                    const result3 = crop(img, 0, 0, height, width);
                    result3.then(
                        img2 => {
                            res(img2);
                        }
                    )

                }
            });
            break;
        default:
        case 0:
            return new Promise(res => {
                res(img)
            });
            break;
    }
};

const readAsDataUrl = file => {
    const fread =new  FileReader();
    fread.readAsDataURL(file);
    return new Promise( res => {
        fread.onload = e => {
            const img = document.createElement('img');
            img.src = fread.result;
            img.onload = e => {
                res(img);
            }

        }
    })

};

export const compressImg = (imgFile,size) => {
    return new Promise ( res => {
        readAsDataUrl(imgFile).then(img => {
            resize(img).then( newImg => {
                const data = newImg.src;
                let arr = data.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                res(new Blob([u8arr], {type:mime}))
            })
        })
    })

};
