var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/**
 * svg icons for fullscreen gallery
 */
var prevIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
var nextIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/></svg>';
var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';
/**
 * function to create fullscreen gallery
 * @param selector query selector container
 */
var gallery = function (selector) {
    var container = document.querySelector(selector);
    var fullScreen = function (list, index) {
        console.log(_this);
        // overlay div
        var fullScreenContanier = document.createElement('div');
        fullScreenContanier.classList.add('full-screen-contanier');
        // prev Image button
        var prevButton = document.createElement('button');
        prevButton.innerHTML = prevIcon;
        prevButton.classList.add('full-screen-prevButton');
        // next Imgae button
        var nextButton = document.createElement('button');
        nextButton.innerHTML = nextIcon;
        nextButton.classList.add('full-screen-nextButton');
        // close fullScreen button
        var closeButton = document.createElement('button');
        closeButton.innerHTML = closeIcon;
        closeButton.classList.add('full-screen-closeButton');
        var _image = document.createElement('img');
        var _caption = document.createElement('figcaption');
        var fullScreenFigure = document.createElement('figure');
        fullScreenFigure.classList.add('full-screen-figure');
        fullScreenFigure.appendChild(_image);
        fullScreenFigure.appendChild(_caption);
        //show current image 
        var showImage = function () {
            var _container = fullScreenContanier.querySelector('.full-screen-figure');
            fade(_container.querySelector('figcaption')).then(function () {
                _container.querySelector('img').src = list[index].querySelector('img').src;
                _container.querySelector('figcaption').innerHTML = list[index].querySelector('figcaption').innerHTML;
                unfade(_container.querySelector('figcaption')).then(function () {
                });
            });
        };
        //go to prev image
        var fnPrev = function () {
            index = index > 0 ? index - 1 : list.length - 1;
            showImage();
        };
        //go to next image
        var fnNext = function () {
            index = index < list.length - 1 ? index + 1 : 0;
            showImage();
        };
        //close fullscreen
        var fnClose = function () {
            document.body.querySelector('.full-screen-contanier').remove();
        };
        prevButton.addEventListener('click', function () {
            fnPrev();
        });
        nextButton.addEventListener('click', function () {
            fnNext();
        });
        closeButton.addEventListener('click', function () {
            fnClose();
        });
        fullScreenContanier.appendChild(prevButton);
        fullScreenContanier.appendChild(nextButton);
        fullScreenContanier.appendChild(closeButton);
        fullScreenContanier.appendChild(fullScreenFigure);
        document.body.appendChild(fullScreenContanier);
        showImage();
    };
    var imageList = container.querySelectorAll('figure');
    imageList.forEach(function (_fig, index) {
        _fig.addEventListener('click', function (ev) {
            console.log(ev);
            fullScreen(imageList, index);
        });
    });
};
function fade(element) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var op = 1; // initial opacity
                    var interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            try {
                                element.style.opacity = op;
                                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                                op -= op * 0.1;
                                if (op <= 0.1) {
                                    element.style.display = 'none';
                                    clearInterval(interval);
                                    resolve();
                                }
                            }
                            catch (e) {
                                clearInterval(interval);
                                reject(e);
                            }
                            return [2 /*return*/];
                        });
                    }); }, 10);
                })];
        });
    });
}
function unfade(element) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var op = 0.1; // initial opacity
                    element.style.display = 'block';
                    var interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            try {
                                element.style.opacity = op;
                                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                                op += op * 0.1;
                                if (op >= 1) {
                                    clearInterval(interval);
                                    resolve();
                                }
                            }
                            catch (e) {
                                clearInterval(interval);
                                reject(e);
                            }
                            return [2 /*return*/];
                        });
                    }); }, 10);
                })];
        });
    });
}
