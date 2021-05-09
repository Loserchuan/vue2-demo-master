let i = 0;

/**
 * 获取唯一ID
 * @param prefix 前缀
 * @returns {string}
 */
export function getUniqueString(prefix) {
  const randomKey = Math.random().toString(36).substr(2);
  return `${prefix ? prefix + '-' : ''}${randomKey}-${Date.now()}-${i++}`;
}

/**
 * 获取连接上的参数
 * @param str
 * @returns {{}}
 */
export function getQueryString(str = location.search) {
  if (!str) {
    return {};
  }
  if (str.includes('?')) {
    const arr = str.split('?');
    str = arr[arr.length - 1];
  }
  if (str.startsWith('?')) {
    str = str.substr(1);
  }
  const qsArr = str.split('&');
  return qsArr.reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    if (typeof value !== 'undefined') {
      pre[key] = value;
    }
    return pre;
  }, {});
}

/**
 * 将16进制颜色转换成RGB格式
 * @param hex 16进制颜色
 * @returns {{r: number, b: number, g: number}|null}
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

/**
 * 生成从minNum到maxNum的随机数
 * @param minNum 最小值
 * @param maxNum 最大值
 * @returns {number}
 */
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

/**
 * 获取名称 name 的 keyframes样式
 * @param name keyframes名称
 * @returns {{}}
 */
export function getKeyframes(name) {
  const animation = {};
  // 获取所有的style
  const ss = document.styleSheets;
  for (let i = 0; i < ss.length; ++i) {
    const cssRules = ss[i].cssRules;
    for (let m = 0; m < cssRules.length; ++m) {
      const item = cssRules[m];
      if (item.name && item.name === name) {
        animation.cssRule = item;
        animation.styleSheet = ss[i];
        animation.index = m;
      }
    }
  }
  return animation;
}

/**
 * 获取两点之间的直线距离长度
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
export function getTwoPointsDistance(x1, y1, x2, y2) {
  if (!x1 || !y1 || !x2 || !y2) return 0;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * 根据起点和终点获取二次贝塞尔曲线控制点
 * @param x1 起点x
 * @param y1 起点y
 * @param x2 终点x
 * @param y2 终点y
 * @param angle 夹角
 */
export function getControlPoint(x1, y1, x2, y2, angle) {
  const distance = getTwoPointsDistance(x1, y1, x2, y2) / 2;
  const h = Math.tan(angle * Math.PI / 180) * distance;
  const px = (x1 + x2) / 2 + h / (Math.sqrt(Math.pow(((x2 - x1) / (y2 - y1)), 2) + 1));
  const py = (y1 + y2) / 2 - h / (Math.sqrt(Math.pow(((y2 - y1) / (x2 - x1)), 2) + 1));
  return { px: parseInt(px), py: parseInt(py) };
}

/**
 * 根据起点、终点、控制点、和t[0~1],求对应二次贝塞尔曲线上的任意一点
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param px
 * @param py
 * @param t
 * @returns {{x: number, y: number}}
 */
export function getAnyPointOfQuadratic(x1, y1, x2, y2, px, py, t) {
  const x = Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * px + Math.pow(t, 2) * x2;
  const y = Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * py + Math.pow(t, 2) * y2;
  return { x: parseInt(x), y: parseInt(y) };
}

/**
 * 生产开始颜色startColor->结束颜色endColor 的渐变颜色列表
 * @param startColor 开始颜色
 * @param endColor 结束颜色
 * @param step 渐变颜色列表步长 默认 10
 * @returns {[]}
 */
export function gradientColor(startColor, endColor, step = 10) {
  const startRGB = colorRgb(startColor);// 转换为rgb数组模式
  const startR = startRGB[0];
  const startG = startRGB[1];
  const startB = startRGB[2];

  const endRGB = colorRgb(endColor);
  const endR = endRGB[0];
  const endG = endRGB[1];
  const endB = endRGB[2];

  const sR = (endR - startR) / step;// 总差值
  const sG = (endG - startG) / step;
  const sB = (endB - startB) / step;

  const colorArr = [];
  for (let i = 0; i < step; i++) {
    // 计算每一步的hex值
    const hex = colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function colorRgb(sColor) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return sColor;
  }
}

// 将rgb表示方式转换为hex表示方式
function colorHex(rgb) {
  const _this = rgb;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    const aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
    let strHex = '#';
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    const aNum = _this.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      let numHex = '#';
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  } else {
    return _this;
  }
}
