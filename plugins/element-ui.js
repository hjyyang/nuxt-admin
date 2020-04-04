import Vue from "vue";
import {
    Autocomplete,
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
    Upload,
    Drawer,
    Tabs,
    TabPane,
    DatePicker,
    Table,
    TableColumn,
    Switch,
    Popover,
    Select,
    Option,
    Radio,
    RadioGroup,
    RadioButton,
    Collapse,
    CollapseItem,
} from "element-ui";
import lang from "element-ui/lib/locale/lang/zh-CN";
import locale from 'element-ui/lib/locale';

locale.use(lang)

Vue.use(Autocomplete);
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
Vue.component(Drawer.name, Drawer);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Switch.name, Switch);
Vue.component(Popover.name, Popover);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(RadioButton.name, RadioButton);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
