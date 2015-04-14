/**
 * leequire.js
 * AMD加载器
 * @authors leedow (644743991@qq.com)
 * @website http://www.leedow.com
 * @date    2015-04-14 20:40:39
 * @version 1.0
 */
var require,define;
(function(global){
	
	var HEAD = document.head || document.getElementsByTagName('head')[0],
		MAIN = 'main.js',
		BASE_URL = window.location.protocol + '//' + window.location.host;
	

	initMain();

	require = function(modules, init){
		each(modules, function(module){
			createScript(module);
		});
	}

	define = function(deps, factory){
		//factory();
	}

	/*
	 * 获取主入口文件
	 */
	function initMain(){
		eachScript(function(ele){
			MAIN = ele.getAttribute('data-main')?ele.getAttribute('data-main'):MAIN;
		});
		createScript(BASE_URL + '/' +　MAIN);
	}

	/*
	 * 遍历script标签
	 * @param {function} callback 回调函数
	 */
	function eachScript(callback){
		each(document.getElementsByTagName('script'), function(ele){
			callback(ele);
		});
	}

	/*
	 * 遍历数组
	 * @param {array} aim 目标数组
	 * @param {function} callback 回调函数
	 */
	function each(aim, callback){
		for (var i = 0; i < aim.length; i++){
			callback(aim[i]);
		}
	}	

	/*
	 * 创建新的script标签
	 * @param {string} url 标签路径
	 */
	function createScript(url){
		var node = document.createElement('script');
		node.src = url;
		HEAD.appendChild(node);
	}


	function Module(path, deps, factory){
		this.path = path;
		this.deps = deps;
		this.factory = factory;
	}

})(window)


