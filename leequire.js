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
		BASE_URL = window.location.protocol + '//' + window.location.host,
		moduleCache = {},//模块注册表
		urls,
		modules;

	/*
	 * 模块路径处理
	 */
	urls = (function(){
		//获取模块名字，不包括路径和后缀
		//path:模块路径，/a/b  /a/b.js
		function trim(path){
			return path.match(/[\w]*(.js)?$/)[0].replace(/(.js)?$/, '');
		}

		//获取模块完整路径
		//suffix:如果为false则返回不带后缀的路径，默认为true
		function fullPath(path, suffix){
			suffix = suffix?suffix:true;
			if (suffix) {
				return BASE_URL + '/' + path.replace(/(.js)?$/, '.js').replace(/^\//, '');
			} else {
				return BASE_URL + '/' + path.replace(/(.js)?$/, '').replace(/^\//, '');
			}
		}

		return {
			trim : 		trim,
			fullPath : 	fullPath
		}
	})();


	/*
	 * 模块缓存操作
	 */
	modules = (function(){
		//模块类
		function Module(path, name, deps, factory){
			this.path = path;
			this.name = name;
			this.deps = deps;
			this.factory = factory;
		}

		//向缓存中注册新模块
		//deps {array} 依赖
		//factory {function} 模块执行函数
		function add(url, deps, factory){
			moduleCache[urls.fullPath(url, false)] = new Module(
									urls.fullPath(url),
									urls.trim(url)
								);
		}
		//检查模块缓存是否重复
		function checkCache(url){
			if (moduleCache[urls.fullPath(url, false)] != undefined) {
				return true;
			} else {
				return false;
			};
		}

		//检测模块script标签是否重复
		function checkScript(url){
			var flag = false;
			eachScript(function(node){
				if (node.src == urls.fullPath(url)) {
					flag = true;
				};
			});
			return flag;
		}

		//暴露方法
		return {
			add: 		add,
			checkCache: checkCache,
			checkScript:checkScript
		}
	})();
	

	require = function(modules, init){
		each(modules, function(module){
			createScript(module);
		});
	}

	define = function(deps, factory){
		each(deps, function(dep){
			if (!modules.checkScript(dep)) {
				createScript(dep);
			};
		});
		//alert(document.currentScript.src);
	}

	/*
	 * 获取主入口文件 
	 */
	function initMain(){
		eachScript(function(ele){
			MAIN = ele.getAttribute('data-main')?ele.getAttribute('data-main'):MAIN;
		});
		createScript(MAIN);
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
		node.src = urls.fullPath(url);//BASE_URL + '/' + url;
		HEAD.appendChild(node);
	}

	
	


	initMain();
})(window)

