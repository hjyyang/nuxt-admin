let tokenOp = {
	secret: "this is my secret", //路由鉴权密钥
	validTime: 60000 * 60 * 2, //cookie与令牌有效时间(毫秒)
	refreshTime: 60 * 60 * 1 //刷新令牌时间（秒）
};
//设置令牌过期时间2小时，刷新时间是1小时，在临过期前一小时有操作则更新令牌

let refreshFc = decoded => {
	let refreshTokenTime = tokenOp.refreshTime + decoded.iat,
		currentTime = Date.parse(new Date()) / 1000;
	if (currentTime > refreshTokenTime) {
		return true;
	} else {
		return false;
	}
};

tokenOp.refreshFc = refreshFc;

module.exports = tokenOp;
