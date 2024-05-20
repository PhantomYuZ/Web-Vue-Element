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
                        active-text-color="#ffd04b" :unique-opened="false" :collapse=false :default-openeds="['2']">
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
                        <!-- 操作表单 -->
                        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                            <el-form-item label="学号">
                                <el-input v-model="searchForm.sno" placeholder="请输入学号"></el-input>
                            </el-form-item>
                            <el-form-item label="学生姓名">
                                <el-input v-model="searchForm.sname" placeholder="请输入学生姓名"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchStudentTable">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <br>
                        <!-- 表格 -->
                        <el-table :data="paginatedStudentsData" border ref="studentTable">
                            <el-table-column v-if="userData.role === 'manager'" align="center" type="selection" width="50">
                            </el-table-column>
                            <el-table-column align="center" prop="sno" label="学号" width="200">
                            </el-table-column>
                            <el-table-column align="center" prop="sname" label="姓名" width="225">
                            </el-table-column>
                            <el-table-column align="center" prop="gender" label="性别" width="75">
                                <template slot-scope="scope">
                                    {{ scope.row.gender == 1 ? "男" : "女" }}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="sgrade" label="年级" width="100"></el-table-column>
                            <el-table-column align="center" prop="sclass" label="班级"></el-table-column>
                            <el-table-column v-if="userData.role === 'manager' || userData.role === 'teacher'"
                                align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini"
                                        @click="getstudentTable(scope.row.sno)">学生详情</el-button>
                                    <el-button v-if="userData.role === 'manager'" type="primary" size="mini"
                                        @click="getstudentForm(scope.row)">修改</el-button>
                                    <el-button v-if="userData.role === 'manager'" type="primary" size="mini"
                                        @click="confirmDelete(scope.row.sno)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br>
                        <el-button v-if="userData.role === 'manager'" @click="batchDelete()">批量删除</el-button>
                        <el-button v-if="userData.role === 'manager'" @click="deselect()">取消选择</el-button>
                        <el-button v-if="userData.role === 'manager'" type="primary"
                            @click="showAddForm = true">添加学生</el-button>
                        <!-- 弹窗表格 -->
                        <el-dialog title="学生信息" :visible.sync="showTable">
                            <el-table :data="studentTable" border>
                                <el-table-column align="center" prop="sno" label="学号" width="200">
                                </el-table-column>
                                <el-table-column align="center" prop="sname" label="姓名" width="225">
                                </el-table-column>
                                <el-table-column align="center" prop="gender" label="性别" width="75">
                                    <template slot-scope="scope">
                                        {{ scope.row.gender == 1 ? "男" : "女" }}
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="sgrade" label="年级" width="103">
                                </el-table-column>
                                <el-table-column align="center" prop="sage" label="年龄" width="100">
                                </el-table-column>
                            </el-table>
                            <el-table :data="studentTable" border>
                                <el-table-column align="center" prop="sdept" label="院系" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="sclass" label="班级" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="sloc" label="宿舍" width="100">
                                </el-table-column>
                                <el-table-column align="center" prop="email" label="电子邮箱">
                                </el-table-column>
                            </el-table>
                        </el-dialog>
                        <!-- 添加学生 -->
                        <el-dialog title="添加学生" :visible.sync="showAddForm">
                            <el-form :model="form" :default-file-list="form" :rules="rules" ref="addForm">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="学号" label-width="75px" prop="sno">
                                            <el-input v-model="form.sno" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="姓名" label-width="75px" prop="sname">
                                            <el-input v-model="form.sname" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="性别" label-width="75px" prop="gender">
                                            <el-select v-model="form.gender">
                                                <el-option label="男" value=1></el-option>
                                                <el-option label="女" value=0></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="年级" label-width="75px" prop="sgrade">
                                            <el-input v-model="form.sgrade" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="年龄" label-width="75px" prop="sage">
                                            <el-input v-model="form.sage" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="专业" label-width="75px" prop="sdept">
                                            <el-input v-model="form.sdept" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="班级" label-width="75px" prop="sclass">
                                            <el-input v-model="form.sclass" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="宿舍" label-width="75px" prop="sloc">
                                            <el-input v-model="form.sloc" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-form-item label="邮箱" label-width="75px" prop="email">
                                        <el-input v-model="form.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-form-item type="flex" justify="center">
                                    <el-button @click="showAddForm = false">取 消</el-button>
                                    <el-button type="primary" @click="postStudent('addForm')">确 定</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                        <!-- 修改学生 -->
                        <el-dialog title="修改学生" :visible.sync="showForm" ref="putform">
                            <el-form :model="putForm" :default-file-list="putForm" :rules="rules" ref="putForm">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="学号" label-width="75px" prop="sno">
                                            <el-input v-model="putForm.sno" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="姓名" label-width="75px" prop="sname">
                                            <el-input v-model="putForm.sname" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="性别" label-width="75px" prop="gender">
                                            <el-select v-model="putForm.gender">
                                                <el-option label="男" value=1></el-option>
                                                <el-option label="女" value=0></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="年级" label-width="75px" prop="sgrade">
                                            <el-input v-model="putForm.sgrade" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="年龄" label-width="75px" prop="sage">
                                            <el-input v-model="putForm.sage" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="专业" label-width="75px" prop="sdept">
                                            <el-input v-model="putForm.sdept" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="班级" label-width="75px" prop="sclass">
                                            <el-input v-model="putForm.sclass" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="宿舍" label-width="75px" prop="sloc">
                                            <el-input v-model="putForm.sloc" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-form-item label="邮箱" label-width="75px" prop="email">
                                        <el-input v-model="putForm.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="showForm = false">取 消</el-button>
                                <el-button type="primary" @click="putStudent('putForm')">确 定</el-button>
                            </div>
                        </el-dialog>
                        <br><br>
                        <!-- 分页条 -->
                        <el-pagination background layout="sizes, prev, pager, next, jumper, total"
                            @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :total="totalRows" :page-size="pageSize" :page-sizes="[5, 10]">
                        </el-pagination> <!-- 以上分别为：多少条/页，上一页，页码操作，下一页，跳转至，共有多少页 -->
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
import axios from 'axios'

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
                sno: "",
                sname: "",
            },
            form: {
                "sno": "",
                "sname": "",
                "gender": '',
                "sgrade": "",
                "sage": '',
                "sdept": "",
                "sclass": "",
                "sloc": "",
                "email": ""
            },
            putForm: [
                {
                    "sno": "",
                    "sname": "",
                    "gender": '',
                    "sgrade": "",
                    "sage": '',
                    "sdept": "",
                    "sclass": "",
                    "sloc": "",
                    "email": ""
                }
            ],
            rules: {
                sno: [
                    { required: true, message: '请输入学生学号', trigger: 'blur' },
                    { min: 8, max: 8, message: '长度为8位数', trigger: 'blur' }
                ],

                sname: [
                    { required: true, message: '请输入学生姓名', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                sgrade: [
                    { required: true, message: '请输入学生年级', trigger: 'blur' }
                ],
                sage: [
                    { required: true, message: '请输入学生年龄', trigger: 'blur' },
                ],
                sdept: [
                    { required: true, message: '请输入学生学院', trigger: 'blur' }
                ],
                sclass: [
                    { required: true, message: '请输入学生班级', trigger: 'blur' }
                ],
                sloc: [
                    { required: true, message: '请输入学生住址', trigger: 'blur' }
                ],
                email: [
                    { required: false, trigger: 'blur' }
                ]
            },
            dialogTableVisible: false,
            showAddForm: false,
            showForm: false,
            showTable: false,
            allStudents: [],
            studentTable: [],
            /* 分页条 */
            currentPage: 1, // 当前页数
            pageSize: 5, // 每页显示的条数
            total: 100, // 总数据条数
        }
    },
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.$router.push('/UserLogin')
                console.log('用户点击了退出登录');
            }
        },
        async searchStudentTable() {
            if (this.searchForm.sno && this.searchForm.sname) {
                axios.get(`/Student?sno=${this.searchForm.sno}&sname=${this.searchForm.sname}`).then(result => {
                    this.studentTable = result.data.data;
                    this.$message.success('查询成功');
                    this.openDialogTable();
                });
            }
            else if (this.searchForm.sno && !this.searchForm.sname) {
                axios.get(`/Student?sno=${this.searchForm.sno}`).then(result => {
                    this.studentTable = result.data.data;
                    this.$message.success('查询成功');
                    this.openDialogTable();
                });
            }
            else if (!this.searchForm.sno && this.searchForm.sname) {
                axios.get(`/Student?sname=${this.searchForm.sname}`).then(result => {
                    this.studentTable = result.data.data;
                    this.$message.success('查询成功');
                    this.openDialogTable();
                });
            }
            else
                this.$message.error('输入不可皆为空');

        },
        async getstudentTable(sno) {
            if (sno) {
                axios.get(`/Student?sno=${sno}`).then(result => {
                    this.studentTable = result.data.data;
                    this.openDialogTable();
                });
            }
            else
                this.$message.error('输入不可为空');

        },
        getstudentForm(rowData) {
            this.putForm = rowData;
            this.openDialogForm();
        },
        async putStudent(putForm) {
            this.$refs[putForm].validate((valid) => {
                if (valid) {
                    try {
                        const formData = putForm;
                        axios.put(`/Student?sno=${formData.sno}`, formData);
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
        async postStudent(addForm) {
            this.$refs[addForm].validate((valid) => {
                if (valid) {
                    try {
                        const formData = addForm;
                        axios.post(`/Student?sno=${formData.sno}`, formData);
                        console.log('数据提交成功！');
                    } catch (error) {
                        console.error('数据提交失败：', error);
                    }
                    this.showAddForm = false;
                    this.refresh();
                }
                else {
                    this.$message.error('请完善表单内容');

                }
            });
        },
        async deleteStudent(sno) {
            axios.delete(`/Student?sno=${sno}`).then(result => {
                console.log(result.data.data);
            });
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
        refresh() { //刷新
            axios.get("/AllStudents").then((result) => {
                this.allStudents = result.data.data;
                this.$message.success('数据已更新');
            });
        },
        batchDelete() {
            const selectedStudents = this.$refs.studentTable.selection.map(student => student.sno);
            if (selectedStudents.length === 0) {
                this.$message.warning('请先选择要删除的学生');
                return;
            }
            axios.delete(`/Student?snos=${selectedStudents.join(',')}`)
                .then(result => {
                    console.log(result)
                    this.refresh()
                    this.$message.success('批量删除成功');
                })
        },
        deselect() {
            this.$refs.studentTable.clearSelection();
        },
        openDialogForm() {
            this.showForm = true;
        },
        openDialogTable() {
            this.showTable = true;
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
        paginatedStudentsData() {
            // 根据当前页数和每页显示的数量，计算截取的数据段
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.allStudents.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.userData = this.$route.meta.userData;
        axios.get("/AllStudents").then((result) => {
            this.allStudents = result.data.data
            this.$message.success('数据已更新');
        });
    },
}
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