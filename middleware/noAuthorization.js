import { Message } from "element-ui";

export default function({ app, store, error, redirect, route }) {
	if (store.state.authUser) {
		Message.warning({
			showClose: true,
            message: "已成功登录!"
		});
		return redirect("/");
	}
}
