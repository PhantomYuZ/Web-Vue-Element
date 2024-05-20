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
            active-text-color="#ffd04b" :unique-opened="false" :collapse=false :default-openeds="['3']">
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
            <!-- 查询表单 -->
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
              <el-form-item label="教师编号">
                <el-input v-model="searchForm.tno" length="4" show-word-limit placeholder="请输入教师编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchTeacherBytno">查询</el-button>
              </el-form-item>
              <el-form-item label="教师姓名">
                <el-input v-model="searchForm.tname" length="4" show-word-limit placeholder="请输入教师姓名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchTeacherBytname">查询</el-button>
              </el-form-item>
              <el-form-item label="学院名称">
                <el-input v-model="searchForm.tdept" length="4" show-word-limit placeholder="按院系查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchTeacherBytdept">查询</el-button>
              </el-form-item>
            </el-form>
            <!-- 弹窗表格 -->
            <el-dialog title="教师查询结果" :visible.sync="showTable">
              <el-table :data="teacherTable" border>
                <el-table-column align="center" prop="tno" label="教师编号" width="120">
                </el-table-column>
                <el-table-column align="center" prop="tname" label="姓名" width="125">
                </el-table-column>
                <el-table-column align="center" prop="gender" label="性别" width="100">
                  <template slot-scope="scope">
                    {{ scope.row.gender == 1 ? "男" : "女" }}
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="title" label="职称" width="125">
                </el-table-column>
                <el-table-column align="center" prop="tage" label="年龄" width="80">
                </el-table-column>
              </el-table>
              <el-table :data="teacherTable" border width="75%">
                <el-table-column align="center" prop="tdept" label="所属院系" width="125">
                </el-table-column>
                <el-table-column align="center" prop="tclass" label="管理班级（班主任）" width="125">
                </el-table-column>
                <el-table-column align="center" prop="email" label="电子邮箱" width="250">
                </el-table-column>
              </el-table>
            </el-dialog>
            <!-- 添加教师 -->
            <el-dialog title="添加教师" :visible.sync="showAddForm">
              <el-form :model="form" :rules="rules" ref="addForm">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="教师编号" label-width="80px" prop="tno">
                      <el-input v-model="form.tno" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="姓名" label-width="90px" prop="tname">
                      <el-input v-model="form.tname" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="性别" label-width="80px" prop="gender">
                      <el-select v-model="form.gender">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=0></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="所属院系" label-width="90px" prop="tdept">
                      <el-input v-model="form.tdept" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="班主任" label-width="80px" prop="tcif">
                      <el-select v-model="form.tcif">
                        <el-option label="是" value=1></el-option>
                        <el-option label="否" value=0 @click="handleTclass"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="form.tcif === '1'">
                    <el-form-item label="班级名称" label-width="90px" prop="tclass">
                      <el-input v-model="form.tclass" autocomplete="off" placeholder="请输入班级名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="职称" label-width="80px" prop="title">
                      <el-input v-model="form.title" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="年龄" label-width="90px" prop="tage">
                      <el-input v-model="form.tage" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="电子邮件" label-width="75px" prop="email">
                  <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="showAddForm = false">取 消</el-button>
                <el-button type="primary" @click="postTeacher('addForm')">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 修改教师 -->
            <el-dialog title="添加教师" :visible.sync="showForm">
              <el-form :model="putForm" :rules="rules" ref="chaForm">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="教师编号" label-width="80px" prop="tno">
                      <el-input v-model="putForm.tno" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="姓名" label-width="90px" prop="tname">
                      <el-input v-model="putForm.tname" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="性别" label-width="80px" prop="gender">
                      <el-select v-model="putForm.gender">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=0></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="所属院系" label-width="90px" prop="tdept">
                      <el-input v-model="putForm.tdept" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="班主任" label-width="80px" prop="tcif">
                      <el-select v-model="putForm.tcif">
                        <el-option label="是" value=1></el-option>
                        <el-option label="否" value=0 @click="handleTclass"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" v-if="putForm.tcif === '1'">
                    <el-form-item label="班级名称" label-width="90px" prop="tclass">
                      <el-input v-model="putForm.tclass" autocomplete="off" placeholder="请输入班级名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="11">
                    <el-form-item label="职称" label-width="80px" prop="title">
                      <el-input v-model="putForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item label="年龄" label-width="90px" prop="tage">
                      <el-input v-model="putForm.tage" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="电子邮件" label-width="75px" prop="email">
                  <el-input v-model="putForm.email" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">取 消</el-button>
                <el-button type="primary" @click="putTeacher('chaForm')">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table :data="paginatedTeachersData" border ref="teacherTable">
              <el-table-column align="center" v-if="userData.role === 'manager'" type="selection" width="50">
              </el-table-column>
              <el-table-column align="center" prop="tno" label="教师编号" width="120">
              </el-table-column>
              <el-table-column align="center" prop="tname" label="姓名" width="125">
              </el-table-column>
              <el-table-column align="center" prop="gender" label="性别" width="100">
                <template slot-scope="scope">
                  {{ scope.row.gender == 1 ? "男" : "女" }}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="tdept" label="所属院系" width="225">
              </el-table-column>
              <el-table-column align="center" prop="title" label="职称" width="250">
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="getTeacherTable(scope.row.tno)" size="mini">查看详情</el-button>
                  <el-button v-if="userData.role === 'manager'" type="primary" @click="getTeacherForm(scope.row)"
                    size="mini">修改</el-button>
                  <el-button v-if="userData.role === 'manager'" type="primary" @click="confirmDelete(scope.row.tno)"
                    size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <el-button v-if="userData.role === 'manager'" @click="batchDelete()">批量删除</el-button>
            <el-button v-if="userData.role === 'manager'" @click="deselect()">取消选择</el-button>
            <el-button v-if="userData.role === 'manager'" type="primary" @click="showAddForm = true">添加教师</el-button>
            <br><br>
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
      searchForm: {
        tno: "",
        tname: "",
        tdept: ""
      },
      form: {
        "tno": "",
        "tname": "",
        "gender": '',
        "tdept": "",
        "tcif": "",
        "tclass": "",
        "title": "",
        "tage": '',
        "email": ""
      },
      putForm: [
        {
          "tno": "",
          "tname": "",
          "gender": '',
          "tdept": "",
          "tcif": "",
          "tclass": "",
          "title": "",
          "tage": '',
          "email": ""
        }
      ],
      rules: {
        tno: [
          { required: true, message: '请输入教师编号', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6位数', trigger: 'blur' }
        ],
        tname: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        tdept: [
          { required: true, message: '请输入教师所属学院', trigger: 'blur' }
        ],
        tcif: [
          { required: true, message: '请选择是否为班主任', trigger: 'change' }
        ],
        tage: [
          { required: true, message: '请输入教师年龄', trigger: 'blur' },
        ],
        tclass: [
          { required: true, message: '请输入教师管理的班级', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入教师职位', trigger: 'blur' }
        ],
        email: [
          { required: false, trigger: 'blur' }
        ]
      },
      allTeachers: [],
      teacherTable: [],

      dialogTableVisible: false,
      showAddForm: false,
      showTable: false,
      showForm: false,

      currentPage: 1, // 当前页数
      pageSize: 5, // 每页显示的条数
      total: 100, // 总数据条数
    };
  },

  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$router.push('/UserLogin')
        console.log('用户点击了退出登录');
      }
    },
    async searchTeacherBytno() {
      if (this.searchForm.tno) {
        axios.get(`/Teachers?tno=${this.searchForm.tno}`).then(result => {
          this.teacherTable = result.data.data;
          this.openDialogTable();
        });
      }
      else
        this.$message.error('输入不可为空');

    },
    async searchTeacherBytname() {
      if (this.searchForm.tname) {
        axios.get(`/Teachers?tname=${this.searchForm.tname}`).then(result => {
          this.teacherTable = result.data.data;
          this.openDialogTable();
        });
      }
      else
        this.$message.error('输入不可为空');
    },
    async searchTeacherBytdept() {
      if (this.searchForm.tdept) {
        axios.get(`/Teachers?tdept=${this.searchForm.tdept}`).then(result => {
          this.teacherTable = result.data.data;
          this.openDialogTable();
        });
      }
      else
        this.$message.error('输入不可为空');
    },
    async getTeacherTable(tno) {
      axios.get(`/Teacher?tno=${tno}`).then(result => {
        this.teacherTable = result.data.data;
        this.openDialogTable();
      });
    },
    async getTeacherForm(rowData) {
      this.putForm = rowData;
      this.openDialogForm();
    },
    async putTeacher(chaForm) {
      
      this.$refs[chaForm].validate((valid) => {
        if (valid) {
          try {
            const formData = chaForm;
            axios.put(`/Teacher?tno=${formData.tno}`, formData);
            console.log('数据提交成功！');
          } catch (error) {
            console.error('数据提交失败：', error);
          }
          this.showForm = false;
          this.refresh()
        }
        else {
          this.$message.error('请完善表单内容');

        }
      });
    },
    async postTeacher(addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          try {
            const formData = addForm;
            axios.post(`/Teacher?tno=${formData.tno}`, formData);
            console.log('数据提交成功！');
          } catch (error) {
            console.error('数据提交失败：', error);
          }
          this.showAddForm = false;
          this.refresh()
        }
        else {
          this.$message.error('请完善表单内容');

        }
      });
    },
    async deleteTeacher(tno) {
      axios.delete(`Teachers?${tno}`).then(result => {
        console.log(result.data.data);
      });
      this.refresh()
    },

    confirmDelete(tno) {
      this.$confirm('确认删除？')
        .then(() => {
          this.deleteTeacher(tno); // 执行删除操作
        })
        .catch(() => {
          // 用户取消删除，什么也不做
        });
    },
    refresh() { //刷新
      axios.get("/Allteachers").then((result) => {
        this.allTeachers = result.data.data;
        this.$message.success('数据已更新');
      });
    },

    batchDelete() {
      const selectedTeachers = this.$refs.teacherTable.selection.map(teacher => teacher.tno);
      if (selectedTeachers.length === 0) {
        this.$message.warning('请先选择要删除的学生');
        return;
      }
      axios.delete(`/Teacher?tnos=${selectedTeachers.join(',')}`)
        .then(result => {
          console.log(result)
          this.refresh()
          this.$message.success('批量删除成功');
        })
    },
    deselect() {
      this.$refs.teacherTable.clearSelection();
    },
    openDialogForm() {
      this.showForm = true;
    },
    openDialogTable() {
      this.showTable = true;
    },


    handleTclass() {
      this.form.tclass = '无';
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = Math.ceil(
        (this.currentPage * this.pageSize) / newSize
      );
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },


  },
  computed: {
    totalRows() {
      return this.allTeachers.length;
    },
    paginatedTeachersData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.allTeachers.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.userData = this.$route.meta.userData;
    axios.get("/AllTeachers").then((result) => {
      this.allTeachers = result.data.data;
      this.$message.success('数据已更新');
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