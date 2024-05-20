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
                        <el-button type="primary" icon="el-icon-back" @click="goBack_CoursesByManager">返回</el-button>
                        <h3>{{ TOcname }} {{    }} 当前班级人数：{{ total }}</h3>
                        <!-- 表单 -->
                        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                            <el-form-item label="学号">
                                <el-input v-model="searchForm2.sno" length="4" show-word-limit
                                    placeholder="按学号添加学生加入课程"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addStudent()">添加学生</el-button>
                            </el-form-item>
                            <el-form-item label="学号">
                                <el-input v-model="searchForm.sno" length="4" show-word-limit
                                    placeholder="按学号查询学生"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchStudentBysno()">查询</el-button>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="searchForm.sname" length="4" show-word-limit
                                    placeholder="按姓名查询学生"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchStudentBysname()">查询</el-button>
                            </el-form-item>
                        </el-form>

                        <!-- 弹窗表单 -->
                        <el-dialog title="修改学生成绩" :visible.sync="showForm" :rules="rules">
                            <el-form :model="putForm" :default-file-list="putForm">
                                <el-form-item label="学号" label-width="75px">
                                    <el-input v-model="putForm.sno" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="成绩" label-width="75px">
                                    <el-input v-model="putForm.grade" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="showForm = false">取 消</el-button>
                                <el-button type="primary" @click="putGrade(putForm.sno)">确 定</el-button>
                            </div>
                        </el-dialog>
                        <!-- 弹窗表格2 -->
                        <el-dialog title="学生查询结果" :visible.sync="showTable2">
                            <el-table :data="searchTable2" border>
                                <el-table-column align="center" prop="sno" label="学号" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="sname" label="姓名" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="gender" label="性别" width="80">
                                    <template slot-scope="scope">
                                        {{ scope.row.gender == 1 ? "男" : "女" }}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <br>
                            <el-table-item>
                                <el-button type="primary" @click="postCourse(searchTable2.sno)">添加学生加入课程</el-button>
                            </el-table-item>
                        </el-dialog>

                        <!-- 弹窗表格 -->
                        <el-dialog title="学生查询结果" :visible.sync="showTable">
                            <el-table :data="searchTable" border>
                                <el-table-column align="center" prop="sno" label="学号" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="sname" label="姓名" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="gender" label="性别" width="80">
                                    <template slot-scope="scope">
                                        {{ scope.row.gender == 1 ? "男" : "女" }}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="cno" label="课程号" width="120">
                                </el-table-column>
                                <el-table-column align="center" prop="cname" label="课程名" width="200">
                                </el-table-column>
                                <el-table-column align="center" prop="credit" label="学分" width="80">
                                </el-table-column>
                            </el-table>
                            <el-table :data="searchTable" border width="75%">
                                <el-table-column align="center" prop="tname" label="授课教师" width="125">
                                </el-table-column>
                                <el-table-column align="center" prop="assMethod" label="考核方式" width="125">
                                </el-table-column>
                                <el-table-column align="center" prop="grade" label="成绩" width="80">
                                </el-table-column>
                                <el-table-column align="center" prop="result" label="结果" width="80">
                                </el-table-column>
                            </el-table>
                            <br>
                            <el-table-item>
                                <el-button type="primary" size="mini" @click="getstudentForm(searchTable)">修改成绩</el-button>
                                <el-button type="primary" @click="confirmDelete(searchTable.sno)">删除</el-button>
                            </el-table-item>
                        </el-dialog>

                        <!-- 表格 -->
                        <el-table :data="paginatedCoursesData" border ref="studentTable">
                            <el-table-column align="center" type="selection" width="50">
                            </el-table-column>
                            <el-table-column align="center" prop="sno" label="学号" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="sname" label="姓名" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="gender" label="性别" width="80">
                                <template slot-scope="scope">
                                    {{ scope.row.gender == 1 ? "男" : "女" }}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="cno" label="课程号" width="120">
                            </el-table-column>
                            <el-table-column align="center" prop="cname" label="课程名" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="credit" label="学分" width="80">
                            </el-table-column>
                            <el-table-column align="center" prop="tname" label="授课教师" width="80">
                            </el-table-column>
                            <el-table-column align="center" prop="assMethod" label="考核方式" width="125">
                            </el-table-column>
                            <el-table-column align="center" prop="grade" label="成绩" width="80">
                            </el-table-column>
                            <el-table-column align="center" prop="result" label="结果" width="80">
                            </el-table-column>
                            <el-table-column align="center" prop="status" label="操作" width="200">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="getstudentForm(scope.row)">修改成绩</el-button>
                                    <el-button type="primary" @click="confirmDelete(scope.row.sno)">删除</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                        <br />


                        <el-button @click="batchDelete()">批量删除</el-button>
                        <el-button @click="deselect()">取消选择</el-button>
                        <br><br>
                        <!-- 分页条 -->
                        <el-pagination background layout="sizes, prev, pager, next, jumper, total"
                            :current-page="currentPage" :page-size="pageSize" :total="totalRows" :page-sizes="[5, 10]"
                            @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
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
            searchForm: {
                sno: "",
                sname: "",
            },
            searchForm2: {
                sno: "",
            },
            TOcno: '',
            TOcname: '课程名称',
            searchTable: [],
            searchTable2: [],
            allStudents: [],
            putForm: {
                sno: '',
                grade: '',
            },
            showTable2: false,
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
        async addStudent() {
            if (this.searchForm2.sno) {
                axios.get(`/ClassManage?sno=${this.searchForm2.sno}`).then(result => {
                    this.searchTable2 = result.data.data;
                    this.$message.success('查询成功');
                    this.showTable2 = true;
                });
            }
            else
                this.$message.error('请输入学号');
        },
        async searchStudentBysno() {
            if (this.searchForm.sno) {
                axios.get(`/ClassManage?sno=${this.searchForm.sno}&cno=${this.TOcno}`).then(result => {
                    this.searchTable = result.data.data;
                    this.$message.success('查询成功');
                    this.openDialogTable();
                });
            }
            else
                this.$message.error('请输入学号');
        },
        async searchStudentBysname() {
            if (this.searchForm.sname) {
                axios.get(`/ClassManage?sname=${this.searchForm.sname}&cname=${this.TOcname}`).then(result => {
                    this.searchTable = result.data.data;
                    this.$message.success('查询成功');
                    this.openDialogTable();
                });
            }
            else
                this.$message.error('请输入学生姓名');
        },
        async deleteStudent(sno) {
            axios.delete(`/ClassManage?sno=${sno}&cno=${this.TOcno}`).then(result => {
                console.log(result.data.data);
            });
            this.refresh()
        },
        async postCourse(sno) {
            axios.post(`/ClassManage?sno=${sno}&cno=${this.TOcno}`);
            this.showTable2 = false;
        },
        getstudentForm(rowData) {
            this.putForm = rowData;
            this.openDialogForm();
        },
        async putGrade(sno) {
            try {
                const formData = this.putForm;
                await axios.put(`/CoursesClass?sno=${sno}&cno=${this.TOcno}`, formData);
                console.log('数据提交成功！');
            } catch (error) {
                console.error('数据提交失败：', error);
            }
            this.showForm = false;
            this.refresh()
        },
        confirmDelete(sno) {
            this.$confirm('确认删除？')
                .then(() => {
                    this.deleteStudent(sno); // 执行删除操作
                })
                .catch(() => {
                    // 用户取消删除，什么也不做
                });
        },
        batchDelete() {
            const selectedStudents = this.$refs.studentTable.selection.map(student => student.sno);
            if (selectedStudents.length === 0) {
                this.$message.warning('请先选择要删除的学生');
                return;
            }
            axios.delete(`/ClassManage?snos=${selectedStudents.join(',')}&cno=${this.TOcno}`)
                .then(result => {
                    console.log(result)
                    this.refresh()
                    this.$message.success('批量删除成功');
                })
        },
        deselect() {
            this.$refs.studentTable.clearSelection();
        },
        openDialogTable() {
            this.showTable = true
        },
        openDialogForm() {
            this.showForm = true
        },
        goBack_CoursesByManager() {
            this.$router.push('/CoursesByManager');
        },
        refresh() { //刷新
            axios.get(`/ClassManage?cno=${this.TOcno}`).then((result) => {
                this.allStudents = result.data.data;
                this.$message.success('数据已更新');
            });
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
    },
    computed: {
        totalRows() {
            return this.allStudents.length; // 总数据条数
        },
        paginatedCoursesData() {
            // 根据当前页数和每页显示的数量，计算截取的数据段
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.allStudents.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.TOcno = this.$route.query.TOcno;
        this.TOcname = this.$route.query.TOcname;
        this.userData = this.$route.meta.userData;
        axios.get(`/ClassManage?cno=${this.TOcno}`).then((result) => { // "https://mock.apifox.com/m1/3839966-0-default/ClassManage"
            this.allStudents = result.data.data;
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