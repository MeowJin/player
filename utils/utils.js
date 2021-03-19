/** 
 * 为数字加上单位：万或亿 
 * 
 * 例如： 
 * 1000.01 => 1000.01 
 * 10000 => 1万 
 * 99000 => 9.9万 
 * 566000 => 56.6万 
 * 5660000 => 566万 
 * 44440000 => 4444万 
 * 11111000 => 1111.1万 
 * 444400000 => 4.44亿 
 * 40000000,00000000,00000000 => 4000万亿亿 
 * 4,00000000,00000000,00000000 => 4亿亿亿 
 * 
 * @param {number} number 输入数字. 
 * @param {number} decimalDigit 小数点后最多位数，默认为2 
 * @return {string} 加上单位后的数字 
 */

function addWan(integer, number, mutiple, decimalDigit) {
	var me = this;
	var digit = getDigit(integer);
	if (digit > 3) {
		var remainder = digit % 8;
		if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’ 
			remainder = 4;
		}
		return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
	} else {
		return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
	}
}

function getDigit(integer) {
	var digit = -1;
	while (integer >= 1) {
		digit++;
		integer = integer / 10;
	}
	return digit;
}

function addChineseUnit(number, decimalDigit) {
	var me = this;
	decimalDigit = decimalDigit == null ? 2 : decimalDigit;
	var integer = Math.floor(number);
	var digit = getDigit(integer);
	// ['个', '十', '百', '千', '万', '十万', '百万', '千万']; 
	var unit = [];
	if (digit > 3) {
		var multiple = Math.floor(digit / 8);
		if (multiple >= 1) {
			var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
			unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
			for (var i = 0; i < multiple; i++) {
				unit.push('亿');
			}
			return unit.join('');
		} else {
			return addWan(integer, number, 0, decimalDigit);
		}
	} else {
		return number;
	}
}


/**
 * 时间转为秒
 * @param time 时间(00:00)
 * @returns {string} 时间戳（单位：秒）
 */
const time_to_sec = function(time) {
	var s = '';
	const timeArr = time.split(':');
	const min = timeArr[0];
	const sec = timeArr[1]

	s = Number(min * 60) + Number(sec);

	return s;
};

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的分秒
 */
const sec_to_time = function(s) {
	var t;
	if (s > -1) {
		var hour = Math.floor(s / 3600);
		var min = Math.floor(s / 60) % 60;
		var sec = s % 60;

		if (min < 10) {
			t = "0" + min + ':';
		} else {
			t = min + ':'
		}
		if (sec < 10) {
			t += "0";
		}
		t += sec.toFixed(0);
	}
	return t;
}

export {
	addChineseUnit, //为数字加上单位
	time_to_sec, //时间转为秒
	sec_to_time, //时间秒数格式化
}
