function Menu(param) {


	this.createMenu = function() {
		$('#menu').html(render(param));
		focus();
	};


	// Грязь
	function render(obj) {
		var d = $('<div></div>');
		if (obj.folders && obj.folders.length) {
			$.each(obj.folders, function(i, val) {
				d.append(menu__li(val));
			});
		}
		if (obj.files && obj.files.length) {
			$.each(obj.files, function(i, val) {
				d.append(menu__li(val));
			});
		}
		return d.html();
	}
	// Ужос
	function menu__li(obj) {
		var focus_class = ($('#menu .menu__link.menu__focused').data('id') === obj.id) ? ' menu__focused' : '';
		var li = $('<li class="menu__ menu__' + obj.type + '"></li>');
		var link = $('<a class="menu__link menu__link_' + obj.type + focus_class + '" data-id=' + obj.id + ' href="#">' + obj.name + '</a>');
		link.prepend(svg_icon(obj.type));
		li.append(link);
		var ul = $('<ul class="menu_sub"></ul>');
		// svg_icon(type)
		if (obj.folders && obj.folders.length) {
			$.each(obj.folders, function(i, val) {
				ul.append(menu__li(val));
			});
		}
		if (obj.files && obj.files.length) {
			$.each(obj.files, function(i, val) {
				ul.append(menu__li(val));
			});
		}
		if (!ul.html()) {
			ul = '';
		}
		li.append(ul);
		return li;
	}
	function svg_icon(type) {
		if (type === 'folder') {
			return $('<svg class="menu__icon menu__icon_folder" xmlns="http://www.w3.org/2000/svg" viewbox="153 399.8 51 43.2"><path d="M201.6,409.9c-1.3-1.3-2.9-2-4.7-2h-20.2v-1c0-1.8-0.7-3.4-2-4.7c-1.3-1.3-2.9-2-4.7-2h-9.6c-1.8,0-3.4,0.7-4.7,2c-1.3,1.3-2,2.9-2,4.7v28.8c0,1.8,0.7,3.4,2,4.7c1.3,1.3,2.9,2,4.7,2h36.5c1.8,0,3.4-0.7,4.7-2c1.3-1.3,2-2.9,2-4.7v-21.2C203.5,412.8,202.9,411.2,201.6,409.9z M199.7,435.8c0,0.8-0.3,1.5-0.8,2c-0.6,0.6-1.2,0.8-2,0.8h-36.5c-0.8,0-1.5-0.3-2-0.8c-0.6-0.6-0.8-1.2-0.8-2v-28.8c0-0.8,0.3-1.5,0.8-2c0.6-0.6,1.2-0.8,2-0.8h9.6c0.8,0,1.5,0.3,2,0.8c0.6,0.6,0.8,1.2,0.8,2v1.9c0,0.8,0.3,1.5,0.8,2c0.6,0.6,1.2,0.8,2,0.8h21.2c0.8,0,1.5,0.3,2,0.8c0.6,0.6,0.8,1.2,0.8,2L199.7,435.8L199.7,435.8z"></path></svg>');
		}
		if (type === 'file') {
			return $('<svg class="menu__icon menu__icon_file" xmlns="http://www.w3.org/2000/svg" viewbox="120 395.1 42.5 51"><path d="M161.4,410.5c-0.4-1-1-1.9-1.6-2.5l-10.2-10.2c-0.6-0.6-1.4-1.1-2.5-1.6c-1-0.4-2-0.7-2.9-0.7h-20.8c-0.9,0-1.6,0.3-2.2,0.9c-0.6,0.6-0.9,1.3-0.9,2.2v43.8c0,0.9,0.3,1.6,0.9,2.2c0.6,0.6,1.3,0.9,2.2,0.9H159c0.9,0,1.6-0.3,2.2-0.9c0.6-0.6,0.9-1.3,0.9-2.2v-29.2C162.1,412.5,161.9,411.5,161.4,410.5z M145.4,400.1c0.6,0.2,1.1,0.5,1.3,0.7L157,411c0.3,0.3,0.5,0.7,0.7,1.3h-12.2V400.1z M157.9,441.5h-33.3v-41.7h16.7v13.5c0,0.9,0.3,1.6,0.9,2.2c0.6,0.6,1.3,0.9,2.2,0.9h13.5V441.5z"></path></svg>');
		}
	}

	function focus() {
		$('.menu__link').on('click', function(e) {
			$('#menu .menu__focused').removeClass('menu__focused');
			$(e.target).addClass('menu__focused');
		})
	}





}

$('.drawer__toggle_left').on('click',function() {
	$('.drawers').toggleClass('drawer__opened_left');
})
$('.drawer__toggle_right').on('click',function() {
	$('.drawers').toggleClass('drawer__opened_right');
})


// Конструктор директорий
function folder(obj) {
	this.id = obj.id;
	this.type = 'folder';
	this.name = obj.name || "Folder name";
	this.desc = obj.desc || "Folder desc";
	this.image = obj.image || "Folder image";
	this.folders = obj.folders || [];
	this.files = obj.files || [];
	this.parent_id = obj.parent_id;
}
// Конструктор файлов
function file(obj) {
	this.id = obj.id;
	this.type = 'file';
	this.name = obj.name || "File name";
	this.desc = obj.desc || "File desc";
	this.image = obj.image || "File image";
	this.content = obj.content || "File content";
	this.parent_id = obj.parent_id;
}

var arch = {};
var localStorage_object_name = 'arch';



$(document).ready(function() {
	get_local();
	create_menu();
	focus_event();
});


/*
Глубокий поиск
Ищет объект со свойством "id" и значением id (первый параметр)
Возвращает объект
*/
function finder(id) {
	var res;

	req(arch);

	function req(param) {
		if (is_Object(param)) {
			if (param.hasOwnProperty('id') && param.id === id) {
				res = param;
			}
			for (var prop in param) {
				if (param.hasOwnProperty(prop) && is_Array(param[prop]) && param[prop].length) {
					req(param[prop]);
				}
			}
		}
		if (is_Array(param)) {
			for (var prop = 0; prop < param.length; prop++) {
				req(param[prop]);
			}
		}
	}
	return res;
}
function finderId(obj) {
	var res = [];

	req(obj);

	function req(param) {
		if (is_Object(param)) {
			if (param.hasOwnProperty('id')) {
				res.push(param.id)
			}
			for (var prop in param) {
				if (param.hasOwnProperty(prop) && is_Array(param[prop]) && param[prop].length) {
					req(param[prop]);
				}
			}
		}
		if (is_Array(param)) {
			for (var prop = 0; prop < param.length; prop++) {
				req(param[prop]);
			}
		}
	}
	// console.log(res);
	return res;
}



// Отвечает за кад проверки объекта
function is_Object(x) {
	return $.isPlainObject(x);
}
// Отвечает за кад проверки массива
function is_Array(x) {
	return $.isArray(x);
}
// Отвечает за кад проверки на число
function is_Numeric(x) {
	return $.isNumeric(x);
}

function get_local() {
	var string_local = localStorage.getItem(localStorage_object_name);
	if (string_local) {
		arch = JSON.parse(string_local);
	} else {
		arch.folders = [];
		arch.files = [];
		arch.id_list = [];
	}
}
function set_local() {
	localStorage.setItem(localStorage_object_name, JSON.stringify(arch));
}


function create_menu() {
	new Menu(arch).createMenu();
}






// DM
function focus_event() {
	$('.dm__add_folder').on('click', function(e) {
		if ($('#menu .menu__link_folder').hasClass('menu__focused')) {
			createFolder($('#menu .menu__link_folder.menu__focused').data('id'));
		} else {
			createFolder();
		}
	});
	$('.dm__remove_folder').on('click', function(e) {
		if ($('#menu .menu__link_folder').hasClass('menu__focused')) {
			delFolder($('#menu .menu__link_folder.menu__focused').data('id'));
		}
	});
	$('.dm__add_file').on('click', function(e) {
		if ($('#menu .menu__link_folder').hasClass('menu__focused')) {
			createFile($('#menu .menu__link_folder.menu__focused').data('id'));
		} else {
			createFile();
		}
	});
	$('.dm__remove_file').on('click', function(e) {
		if ($('#menu .menu__link_file').hasClass('menu__focused')) {
			delFile($('#menu .menu__link_file.menu__focused').data('id'));
		}
	});
}

//Создает файл
function createFile(parent_id) {
	var x = (parent_id>=0) ? finder(parent_id) : arch;
	if (x) {
		var obj = {
			id: createId(),
			parent_id: ((parent_id>=0) ? parent_id : localStorage_object_name),
			content: cryptoIn()
		};
		x.files.push(new file(obj));
		arch = JSON.parse(JSON.stringify(arch));
		set_local();
		create_menu();
	}
}
//Создает директорию
function createFolder(parent_id) {
	var x = (parent_id>=0) ? finder(parent_id) : arch;
	if (x) {
		var obj = {
			id: createId(),
			parent_id: ((parent_id>=0) ? parent_id : localStorage_object_name)
		};
		x.folders.push(new folder(obj));
		arch = JSON.parse(JSON.stringify(arch));//что это?почему!?нет ссылки на конструктор
		set_local();
		create_menu();
	}
}


function delFolder(focus_id) {
	if (focus_id >= 0) {
		var focused = finder(focus_id);
		var focus_parent = (is_Numeric(focused.parent_id)) ? finder(focused.parent_id) : arch;
		var eq;
		for (var i = 0; i < focus_parent.folders.length; i++) {
			if (focus_parent.folders[i].id === focused.id) {
				eq = i;
				break;
			}
		}
		focus_parent.folders.splice(eq,1);
		removeId(focused);
		set_local();
		create_menu();
	}
}
function delFile(focus_id) {
	if (focus_id >= 0) {
		var focused = finder(focus_id);
		var focus_parent = (is_Numeric(focused.parent_id)) ? finder(focused.parent_id) : arch;
		var eq;
		for (var i = 0; i < focus_parent.files.length; i++) {
			if (focus_parent.files[i].id === focused.id) {
				eq = i;
				break;
			}
		}
		focus_parent.files.splice(eq,1);
		removeId(focused);
		set_local();
		create_menu();
	}
}



function createId() {
	var arch_l = arch.id_list.length;
	for (var i = 0; i <= arch_l; i++) {
		if (arch.id_list.indexOf(i) === -1) {
			arch.id_list.push(i);
			return i;
		}
	}
}
function removeId(id) {
	var arch_l = arch.id_list;
	var removed_list = finderId(id);
	for (var i = 0; i < removed_list.length; i++) {
		arch_l.splice(arch_l.indexOf(removed_list[i]),1);
	}
}





// FILE EDIT
function cryptoIn() {
	return utf8_to_b64($('#menu').html());
}
function cryptoOut(x) {
	return b64_to_utf8(x);
}
function utf8_to_b64(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}
//декодирование строки из base-64 в Unicode
function b64_to_utf8(str) {
	return decodeURIComponent(escape(window.atob(str)));
}
