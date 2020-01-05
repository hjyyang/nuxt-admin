<template>
	<main class="signin">
		<div class="signin_container">
			<div class="signin_head">
				<i class="iconfont icon-user1"></i>
			</div>
			<div class="signin_main">
				<el-form :model="loginForm" :rules="loginRules" ref="loginForm">
					<el-form-item prop="userName">
						<el-input v-model="loginForm.userName" placeholder="Name"></el-input>
					</el-form-item>
					<el-form-item prop="pass">
						<el-input
							type="password"
							v-model="loginForm.pass"
							show-password
							placeholder="Password"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="submitForm('loginForm')" type="primary">登入</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	layout: "signin",
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入密码"));
			} else {
				callback();
			}
		};
		var validateUserName = (rule, value, callback) => {
			if (value === "") {
				callback(new Error("请输入用户名"));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				userName: "",
				pass: ""
			},
			loginRules: {
				pass: [{ validator: validatePass, trigger: "blur" }],
				userName: [{ validator: validateUserName, trigger: "blur" }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.login();
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		login() {
			this.$axios({
				method: "post",
				url: "/api/login",
				data: {
					user_name: this.loginForm.userName,
					password: this.loginForm.pass
				}
			}).then(res => {
				console.log(res.data);
			});
		}
	}
};
</script>