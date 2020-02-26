export function _setStorage(key, data) {
  // uni.setStorageSync({
  //   key: key,
  //   data: data,
  //   success() {
  //     console.log('成功了')
  //   },
  //   fail() {
  //     console.log('缓存失败了')
  //   }
  // })
  try {
    uni.setStorageSync(key, data);
  } catch (e) {
    console.log(e, '<-e->');
  };
}

export function _getStorage(key) {
  console.log(key, '<-key->');
  console.log(typeof key, '<-typeof key->');
  uni.getStorageSync(key);
}