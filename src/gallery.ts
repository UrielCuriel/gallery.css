/**
 * svg icons for fullscreen gallery
 */
const prevIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
const nextIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>';
const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';

/**
 * function to create fullscreen gallery
 * @param selector query selector container
 */
const gallery = (selector: string) => {
    const container: Element = document.querySelector(selector);
    const fullScreen = (list: NodeListOf<HTMLElement>, index: number) => {
        console.log(this);

        // overlay div
        const fullScreenContanier: Element = document.createElement('div');
        fullScreenContanier.classList.add('full-screen-contanier');
        // prev Image button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = prevIcon;
        prevButton.classList.add('full-screen-prevButton')
        // next Imgae button
        const nextButton = document.createElement('button');
        nextButton.innerHTML = nextIcon;
        nextButton.classList.add('full-screen-nextButton')
        // close fullScreen button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = closeIcon;
        closeButton.classList.add('full-screen-closeButton')
        const _image = document.createElement('img');
        const _caption = document.createElement('figcaption');
        const fullScreenFigure = document.createElement('figure');
        fullScreenFigure.classList.add('full-screen-figure');
        fullScreenFigure.appendChild(_image);
        fullScreenFigure.appendChild(_caption);
        //show current image 
        const showImage = () => {
            const _container = fullScreenContanier.querySelector('.full-screen-figure');
            fade(_container.querySelector('figcaption')).then(() => {
                _container.querySelector('img').src = list[index].querySelector('img').src;
                _container.querySelector('figcaption').innerHTML = list[index].querySelector('figcaption').innerHTML;
                unfade(_container.querySelector('figcaption')).then(() => {

                })
            })


        }
        //go to prev image
        const fnPrev = () => {
            index = index > 0 ? index - 1 : list.length - 1;
            showImage();
        }
        //go to next image
        const fnNext = () => {
            index = index < list.length - 1 ? index + 1 : 0;
            showImage();
        }
        //close fullscreen
        const fnClose = () => {
            document.body.querySelector('.full-screen-contanier').remove();
        }

        prevButton.addEventListener('click', () => {
            fnPrev();
        });
        nextButton.addEventListener('click', () => {
            fnNext();
        });
        closeButton.addEventListener('click', () => {
            fnClose();
        });
        fullScreenContanier.appendChild(prevButton);
        fullScreenContanier.appendChild(nextButton);
        fullScreenContanier.appendChild(closeButton);
        fullScreenContanier.appendChild(fullScreenFigure);
        document.body.appendChild(fullScreenContanier);
        showImage();
    }
    const imageList = container.querySelectorAll('figure');
    imageList.forEach((_fig, index) => {
        _fig.addEventListener('click', (ev) => {
            console.log(ev);

            fullScreen(imageList, index);
        })
    });
}

async function fade(element) {

    return new Promise((resolve, reject) => {
        let op = 1;  // initial opacity
        const interval = setInterval(async () => {
            try {
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
                if (op <= 0.1) {
                    element.style.display = 'none';
                    clearInterval(interval);
                    resolve();
                }
            } catch (e) {
                clearInterval(interval);
                reject(e);
            }
        }, 10);

    });
}
async function unfade(element) {
    return new Promise((resolve, reject) => {
        let op = 0.1;  // initial opacity
        element.style.display = 'block';
        const interval = setInterval(async () => {
            try {
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.1;
                if (op >= 1) {
                    clearInterval(interval);
                    resolve();
                }
            } catch (e) {
                clearInterval(interval);
                reject(e);
            }
        }, 10);

    });
}