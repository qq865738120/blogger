module.exports = {

  /*
  数据库查询方法封装
  */
  dbQuery(pool, sql) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, (err, results, fields) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
            connection.release();
          })
        }
      })
    })
  },

  /*
  生成uuid
  参数：length Number 长度
       radixs Number 进制
  */
  uuid(length, radixs) {
    let len = length ? length : 30;
    let radix = radixs ? radixs : 16;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },

  /*
  计数排序
  参数： array Array 要排序的数组
         keyName String 排序字段，根据该字段排序
  */
  countSort(array, keyName) {
    var length = array.length,
        output = new Array(length),
        max,
        min,
        simpleArray = keyName ? array.map(function(v){
          return v[keyName];
        }) : array; // 如果keyName是存在的，那么就创建一个只有keyValue的简单数组

    // 获取最大最小值
    max = min = simpleArray[0];
    simpleArray.forEach(function(v){
      v > max && (max = v);
      v < min && (min = v);
    });
    // 获取计数数组的长度
    var k = max - min + 1;
    // 新建并初始化计数数组
    var countArray = new Array(k);
    simpleArray.forEach(function(v){
      countArray[v - min]= (countArray[v - min] || 0) + 1;
    });
    // 累加计数，存储不同值的初始下标
    countArray.reduce(function(prev, current, i, arr){
      arr[i] = prev;
      return prev + current;
    }, 0);
    // 从原数组挨个取值(因取的是原数组的相应值，只能通过遍历原数组来实现)
    simpleArray.forEach(function(v, i){
      var j = countArray[v - min]++;
      output[j] = array[i];
    });
    return output;
  }

}
