<template>
  <div class="log-container">
    <el-form ref="logForm" :model="form" :rules="rules" class="log-form">
      <div class="header">海纳百川，取则行远</div>
      <el-form-item prop="uno" label="用户名">
        <el-input v-model="form.uno" @keydown.enter="userlog"></el-input>
      </el-form-item>
      <el-form-item prop="pass" label="密码">
        <el-input type="password" v-model="form.pass" @keydown.enter="userlog"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userlog" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>  
  
<script>

/* import axios from "axios"; */

export default {
  data() {
    return {
      form: {
        uno: "",
        pass: "",
      },
      rules: {
        uno: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },

      studentuno: "1",
      studentpass: "1",
      teacheruno: "2",
      teacherpass: "2",
      manageruno: "3",
      managerpass: "3",
    };
  },

  methods: {
    /* async userlog() {
      try {
        const response = await axios.post("/Login", {
          uno: this.form.uno,
          pass: this.form.pass
        });
        if (response.data.code === 1) {
          const userData = response.data.data;
          localStorage.setItem('userData', JSON.stringify(userData));
          if (userData)
            console.log("userData已获取")
          this.$message.info("请求跳转中");
          this.$router.push('/home')
        }
        else {
          this.$message.error("用户名或密码错误");
          this.$router.push('/UserLogin')
        }
      } catch (error) {
        // 处理请求错误...  
      }
    }, */
    
    userlog() {
      this.$refs.logForm.validate(valid => {
        if (valid) {
          if (this.form.uno === this.studentuno && this.form.pass === this.studentpass) {
            const userData = {
              "role": "student",
              "uno": "21020001",
              "name": "詹培凯"
            }
            localStorage.setItem('userData', JSON.stringify(userData));
            this.$router.push('/home')
          }

          if (this.form.uno === this.teacheruno && this.form.pass === this.teacherpass) {
            const userData = {
              "role": "teacher",
              "uno": "110201",
              "name": "张树刚"
            }
            localStorage.setItem('userData', JSON.stringify(userData));
            this.$router.push('/home')
          }

          if (this.form.uno === this.manageruno && this.form.pass === this.managerpass) {
            const userData = {
              "role": "manager",
              "uno": "0102",
              "name": "喻卓"
            }
            localStorage.setItem('userData', JSON.stringify(userData));
            this.$router.push('/home')
          }
        } else {
          this.$message.error("用户名或密码错误"); // 显示错误消息，你可以根据需要自定义这个错误消息。
          return false;
        }
      });
    },


  },
};
</script>
  
<style scoped>
.log-container {
  background-image: url('~@/assets/Log1.jpg');
  background-size: 100% 100%;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  background-color: #217cc7;
  /* 设置头栏背景颜色 */
  background-size: cover;
  color: white;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.log-form {
  width: 300px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  /* 设置表单背景颜色和透明度 */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

.login-btn {
  width: 100%;
}

.captcha-image {
  height: 40px;
  margin-left: 10px;
  /* 可根据实际情况调整样式 */
}

.captcha img {
  cursor: pointer;

}
</style>