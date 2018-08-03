/** 用于显示或是隐藏元素，
 * 1.传入元素，用jquery获取元素
 * 2.传入标签说明是显示或是隐藏
 */
function ShowCloseDom (domfeat, tag) {
  if (tag === 'show') {
    domfeat.css('display', 'block')
  } else if (tag === 'close') {
    domfeat.css('display', 'none')
  }
}

export default {
  ShowCloseDom
}
