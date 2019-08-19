import Vue from "vue";
import {
	Pagination,
	Tag,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Message,
	MessageBox,
	Dialog,
	Form,
	FormItem,
	Input,
	Button,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Upload
} from "element-ui";
import locale from "element-ui/lib/locale/lang/zh-CN";

Vue.component(Pagination.name, Pagination);
Vue.component(Tag.name, Tag);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Message.name, Message);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Upload.name, Upload);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
