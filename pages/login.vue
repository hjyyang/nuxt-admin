<template>
	<main class="signin">
		<div class="signin_container">
			<div class="signin_head">
				<h2>登录</h2>
			</div>
			<div class="signin_main">
				<el-form :model="loginForm" :rules="loginRules" ref="loginForm">
					<el-form-item prop="userName">
						<el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item prop="pass">
						<el-input type="password" v-model="loginForm.pass" placeholder="请输入密码" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="submitForm('loginForm')" type="primary">登录</el-button>
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
					alert("submit!");
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.signin {
	display: flex;
	align-items: center;
	height: 100%;
	.signin_container {
		max-width: 360px;
		width: 100%;
		margin: 0 auto;
		padding-bottom: 8px;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	.signin_head {
		padding: 30px 24px 30px;
		box-sizing: border-box;
	}
	.signin_main {
		padding: 0px 24px;
		box-sizing: border-box;
	}
	button {
		width: 100%;
	}
}
</style>