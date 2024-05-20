<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-header
        style="display: flex; justify-content: space-between; align-items: center;  font-size: 24px; background-color: rgb(84, 92, 100)">
        教务管理系统
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting"></i>
          </span>
          <el-dropdown-menu class="dropdown-menu">
            <el-dropdown-item divided>用户姓名：{{ userData.name }}</el-dropdown-item>
            <el-dropdown-item divided>用户工号：{{ userData.uno }}</el-dropdown-item>
            <el-dropdown-item divided style="font-weight: bold;">
              <span v-if="userData.role === 'student'">用户类型：学生</span>
              <span v-else-if="userData.role === 'teacher'">用户类型：教师</span>
              <span v-else-if="userData.role === 'manager'">用户类型：管理员</span>
            </el-dropdown-item>
            <el-dropdown-item divided icon="el-icon-switch-button" command="logout"
              style="color: red;">退出登录</el-dropdown-item>
          </el-dropdown-menu>
          {{ userData.name }}
        </el-dropdown>
      </el-header>
      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="210px" style="border: 1px solid #eee; background-color: rgb(246, 243, 243); ">
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b" :unique-opened="false" :collapse=false :default-openeds="['4']">
            <el-menu-item index="1">
              <template slot="title"><i class="el-icon-menu"></i>
                <router-link to="/home" id="sideForm">首页</router-link>
              </template>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>学生信息管理</template>
              <el-menu-item index="1-1">
                <router-link to="/StudentsInfo" id="sideForm">
                  学生信息列表
                </router-link>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>教师信息管理</template>
              <el-menu-item index="2-1">
                <router-link to="/TeachersInfo" id="sideForm">教师信息管理</router-link>
              </el-menu-item>
            </el-submenu>
            <!-- 学生 -->
            <el-submenu v-if="userData.role === 'student'" index="4">
              <template slot="title"><i class="el-icon-setting"></i>课程管理</template>
              <el-menu-item index="3-1">
                <router-link to="/AllCourses" id="sideForm">全部课程查询</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/CoursesSelect" id="sideForm">学生选课</router-link>
              </el-menu-item>
              <el-menu-item index="3-3">
                <router-link to="/GradesInfo" id="sideForm">成绩查询</router-link>
              </el-menu-item>
              <el-menu-item index="3-4">
                <router-link to="/CoursesTable" id="sideForm">课程表系统</router-link>
              </el-menu-item>
            </el-submenu>
            <!-- 教师 -->
            <el-submenu v-if="userData.role === 'teacher'" index="4">
              <template slot="title"><i class="el-icon-setting"></i>课程管理</template>
              <el-menu-item index="3-1">
                <router-link to="/AllCourses" id="sideForm">全部课程查询</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/CoursesByTeacher" id="sideForm">教师课程系统</router-link>
              </el-menu-item>
            </el-submenu>
            <!-- 管理员 -->
            <el-submenu v-if="userData.role === 'manager'" index="4">
              <template slot="title"><i class="el-icon-setting"></i>课程管理</template>
              <el-menu-item index="3-1">
                <router-link to="/AllCourses" id="sideForm">全部课程查询</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/CoursesByManager" id="sideForm">管理员课程系统</router-link>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i>用户信息</template>
              <el-menu-item index="3-1">
                <router-link to="/UserInfo" id="sideForm">用户个人信息</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>

          <el-main>
            <!-- 表单 -->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="课程号">
                <el-input v-model="searchForm.cno" length="4" show-word-limit placeholder="请输入课程号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchCourseBycno">查询</el-button>
              </el-form-item>
              <el-form-item label="课程名称">
                <el-input v-model="searchForm.cname" length="4" show-word-limit placeholder="请输入课程名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchCourseBycname">查询</el-button>
              </el-form-item>
            </el-form>

            <!-- 弹窗表格 -->
            <el-dialog title="课程查询结果" :visible.sync="showTable">
              <el-table :data="courseTable" border>
                <el-table-column align="center" prop="cno" label="课程号" width="200">
                </el-table-column>
                <el-table-column align="center" prop="cname" label="课程名" width="225">
                </el-table-column>
                <el-table-column align="center" prop="credit" label="学分" width="75">
                </el-table-column>
                <el-table-column align="center" prop="tname" label="授课教师" width="103">
                </el-table-column>
                <el-table-column align="center" prop="assMethod" label="考核方式" width="100">
                </el-table-column>
              </el-table>
              <el-table :data="courseTable" border width="75%">
                <el-table-column align="center" prop="ctime" label="上课时间" width="253">
                  <template slot-scope="scope">
                    <span>{{ formatClassTime(scope.row.ctime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="cloc" label="上课地点" width="250">
                </el-table-column>
                <el-table-column align="center" prop="selected" label="已选人数" width="100">
                </el-table-column>
                <el-table-column align="center" prop="capacity" label="限选人数" width="100">
                </el-table-column>
              </el-table>
            </el-dialog>

            <!-- 表格 -->
            <el-table :data="paginatedAllcourses" border>
              <el-table-column align="center" prop="cno" label="课程号" width="120">
              </el-table-column>
              <el-table-column align="center" prop="cname" label="课程名" width="150">
              </el-table-column>
              <el-table-column align="center" prop="credit" label="学分" width="75">
              </el-table-column>
              <el-table-column align="center" prop="tname" label="授课教师" width="125">
              </el-table-column>
              <el-table-column align="center" prop="assMethod" label="考核方式" width="100">
              </el-table-column>
              <el-table-column align="center" prop="ctime" label="上课时间" width="250">
                <template slot-scope="scope">
                  <span>{{ formatClassTime(scope.row.ctime) }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="cloc" label="上课地点" width="240">
              </el-table-column>
              <el-table-column align="center" prop="selected" label="已选人数" width="80">
                </el-table-column>
                <el-table-column align="center" prop="capacity" label="限选人数" width="80">
                </el-table-column>
            </el-table>
            <br>
            <!-- 分页条 -->
            <el-pagination background layout="sizes, prev, pager, next, jumper, total" :current-page="currentPage"
              :page-size="pageSize" :total="totalRows" :page-sizes="[5, 10]" @size-change="handleSizeChange"
              @current-change="handleCurrentChange"></el-pagination>
            <!-- 以上分别为：多少条/页，上一页，页码操作，下一页，跳转至，共有多少页 -->
          </el-main>

          <el-footer
            style="display: flex; justify-content: right; align-items: center;  font-size: 12px; background-color: rgb(84, 92, 100); height: 25px;">
            <el-button type="text" @click="dialogTableVisible = true">关于我们</el-button>
            <el-dialog title="开发人员信息" :visible.sync="dialogTableVisible">
              <el-table :data="gridData">
                <el-table-column align="center" prop="name" label="姓名" width="150"></el-table-column>
                <el-table-column align="center" prop="text" label="负责任务" width="200"></el-table-column>
                <el-table-column align="center" prop="aaa" label="组长/组员" width="200"></el-table-column>
              </el-table>
            </el-dialog>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogTableVisible: false,
      gridData: [
        {
          "name": "喻卓",
          "text": "前端开发",
          "aaa": "组长"
        },
        {
          "name": "汪涛",
          "text": "后端开发",
          "aaa": "组员"
        },
        {
          "name": "詹培凯",
          "text": "前端开发",
          "aaa": "组员"
        },
        {
          "name": "杨勃坤",
          "text": "后端开发",
          "aaa": "组员"
        }
      ],
      userData: {
        "role": "",
        "uno": "",
        "name": ""
      },
      Allcourses: [],
      searchForm: {
        cno: "",
        cname: "",
      },
      showTable: false,
      courseTable: [],
      currentPage: 1, // 当前页数
      pageSize: 5, // 每页显示的条数
      total: 100, // 总数据条数
    };
  },

  methods: {
    async searchCourseBycno() {
      if (this.searchForm.cno) {
        axios.get(`/SearchCourses?cno=${this.searchForm.cno}`).then(result => {
          this.courseTable = result.data.data;
          this.$message.success('查询成功');
          this.openDialogTable();
        });
      }
      else
        this.$message.error('请输入课程号');
    },
    async searchCourseBycname() {
      if (this.searchForm.cname) {
        axios.get(`/SearchCourses?cname=${this.searchForm.cname}`).then(result => {
          this.courseTable = result.data.data;
          this.$message.success('查询成功');
          this.openDialogTable();
        });
      }
      else
        this.$message.error('请输入课程名称');
    },
    openDialogTable() {
      this.showTable = true;
    },
    formatClassTime(ctimeArray) {
      if (!Array.isArray(ctimeArray) || ctimeArray.length === 0) {
        return '无上课时间信息';
      }
      let classTimeInfo = '';
      for (let i = 0; i < ctimeArray.length; i += 3) {
        if (i != 0)
          classTimeInfo += ` ;  `
        const dayOfWeek = Number(ctimeArray[i]);
        const startClass = ctimeArray[i + 1];
        const endClass = ctimeArray[i + 2];
        classTimeInfo += `周${this.getChineseDayOfWeek(dayOfWeek)}${startClass}-${endClass}节`;
      }
      return classTimeInfo;
    },
    getChineseDayOfWeek(day) {
      const chineseDays = ["一", "二", "三", "四", "五", "六", "日"];
      return chineseDays[day - 1];
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      // 根据新的每页显示数量，重新计算当前页数
      this.currentPage = Math.ceil(
        (this.currentPage * this.pageSize) / newSize
      );
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$router.push('/UserLogin')
        console.log('用户点击了退出登录');
      }
    }
  },
  computed: {
    totalRows() {
      return this.Allcourses.length; // 总数据条数
    },
    paginatedAllcourses() {
      // 根据当前页数和每页显示的数量，计算截取的数据段
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.Allcourses.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.userData = this.$route.meta.userData;
    axios.get("/AllCourses")
      .then(response => {
        this.Allcourses = response.data.data;
        this.$message.success('数据已更新');
      })
      .catch(error => {
        console.error(error);
      });
  },
};
</script>

<style>
#sideForm {
  text-decoration: none !important;
  /* 去掉下划线 */
  color: black !important;
  /* 修改颜色为黑色 */
}

.el-dropdown {
  float: right;
  font-size: 18px;
  color: white;
}
</style>