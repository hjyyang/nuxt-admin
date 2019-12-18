const multer = require("koa-multer");
const node_path = require("path");
const fs = require("fs");
const uploadPath = "../../static/upload";

class Files {
	constructor() {}
	getStat(path) {
		return new Promise((resolve, reject) => {
			fs.stat(path, (err, stats) => {
				if (err) {
					resolve(false);
				} else {
					resolve(stats);
				}
			});
		});
	}
	mkdir(dir) {
		return new Promise((resolve, reject) => {
			fs.mkdir(dir, err => {
				if (err) {
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}
	getAll() {
		let dirPath = node_path.resolve(__dirname, "../../static/upload"),
			fileList = [],
			deep = 1;
		return new Promise(function(resolve, reject) {
			!(function getFile(dirPath) {
				fs.readdir(dirPath, function(err, files) {
					if (files === undefined) {
						fs.mkdir(dirPath, err => {
							if (err) {
								resolve(false);
							} else {
								resolve([]);
							}
						});
					} else {
						files.forEach(item => {
							let fPath = node_path.join(dirPath, item);
							let stat = fs.statSync(fPath);
							if (stat.isDirectory() === true) {
								++deep;
								getFile(fPath);
							} else if (stat.isFile() === true) {
								let fileObj = {},
									fileName,
									fileUrl;
								if (fPath.indexOf("\\") == -1) {
									fileName = fPath.split("/")[
										fPath.split("/").length - 1
									];
								} else {
									fileName = fPath.split("\\")[
										fPath.split("\\").length - 1
									];
								}
								if (fileName.indexOf(".") != 0) {
									//排除.开头的文件
									fileObj["name"] = fileName;
									fileUrl = fPath.split("static")[
										fPath.split("static").length - 1
									];
									fileObj["url"] = fileUrl;

									fileList.push(fileObj);
								}
							}
						});
						--deep;
						if (deep === 0) {
							resolve(fileList);
						}
					}
				});
			})(dirPath);
		});
	}
	delete(path) {
		return new Promise(function(resolve, reject) {
			fs.unlink(
				node_path.resolve(__dirname, "../../static" + path),
				function(err) {
					if (err) {
						resolve("none file");
					}
					resolve("true");
				}
			);
		});
	}
	modify(dir) {
        
    }
}

var fileMethod = new Files();

module.exports = { fileMethod };
