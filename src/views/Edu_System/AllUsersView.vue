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
                        active-text-color="#ffd04b" :unique-opened="false" :collapse=false :default-openeds="['5']">
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
                            <el-form-item label="用户ID">
                                <el-input v-model="searchForm.tno" length="4" show-word-limit
                                    placeholder="按用户ID查询"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchCourseBycno">查询</el-button>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="searchForm.tname" length="4" show-word-limit
                                    placeholder="按用户姓名查询"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchCourseBycname">查询</el-button>
                            </el-form-item>
                        </el-form>

                        <!-- 弹窗表格 -->
                        <el-dialog title="教师查询结果" :visible.sync="showForm">
                            <el-table :data="filteredTeachers" border>
                                <el-table-column class="TableColumn" align="center" prop="tno" label="教师编号" width="120">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="tname" label="姓名" width="125">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="gender" label="性别" width="100">
                                    <template slot-scope="scope">
                                        {{ scope.row.gender == 1 ? "男" : "女" }}
                                    </template>
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="title" label="职称" width="125">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="tage" label="年龄" width="80">
                                </el-table-column>
                            </el-table>
                            <el-table :data="filteredTeachers" border width="75%">
                                <el-table-column class="TableColumn" align="center" prop="tdept" label="所属院系" width="125">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="tclass" label="管理班级（班主任）"
                                    width="125">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="email" label="电子邮箱" width="250">
                                </el-table-column>
                            </el-table>
                        </el-dialog>

                        <!-- 表格 -->
                        <el-table :data="paginatedUsersData" border>
                            <el-table-column class="TableColumn" align="center" type="selection" width="50">
                            </el-table-column>
                            <el-table-column class="TableColumn" align="center" prop="uno" label="用户ID" width="120">
                            </el-table-column>
                            <el-table-column class="TableColumn" align="center" prop="role" label="用户类型" width="125">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.role === 'student'">学生</span>
                                    <span v-else-if="scope.row.role === 'teacher'">教师</span>
                                    <span v-else-if="scope.row.role === 'manager'">管理员</span>
                                </template>
                            </el-table-column>
                            <el-table-column class="TableColumn" align="center" prop="name" label="姓名" width="125">
                            </el-table-column>
                            <el-table-column class="TableColumn" align="center" prop="gender" label="性别" width="50">
                                <template slot-scope="scope">
                                    {{ scope.row.gender == 1 ? "男" : "女" }}
                                </template>
                            </el-table-column>
                            <el-table-column class="TableColumn" align="center" prop="age" label="年龄" width="50">
                            </el-table-column>
                            <el-table-column class="TableColumn" align="center" prop="email" label="电子邮箱" width="250">
                            </el-table-column>

                            <el-table-column class="TableColumn" align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="showTeacherDetails(scope.row.tno)">详情信息</el-button>
                                    <el-button type="primary" @click="showTeacherDetails(scope.row.tno)">修改</el-button>
                                    <el-button type="primary" @click="showTeacherDetails(scope.row.tno)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 添加用户表单 -->
                        <el-dialog title="添加用户" :visible.sync="showForm">
                            <el-form ref="form">
                                <el-form-item label="用户ID" prop="uno">
                                    <el-input v-model="user.uno"></el-input>
                                </el-form-item>
                                <el-form-item label="用户类型" prop="role">
                                    <el-select v-model="user.role" placeholder="请选择用户类型">
                                        <el-option label="学生" value="student"></el-option>
                                        <el-option label="教师" value="teacher"></el-option>
                                        <el-option label="管理员" value="manager"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 根据用户类型动态添加其他表单项 -->
                                <el-form-item v-if="user.role === 'student'">
                                    <h4>学生信息录入</h4>
                                    <el-form-item label="学号" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sno" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="姓名" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.gender" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="年级" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sgrade" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="年龄" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sage" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="专业" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sdept" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="班级" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sclass" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="地址（宿舍）" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.sloc" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                                        <el-input v-model="user.student.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form-item>

                                <el-form-item v-if="user.role === 'teacher'">
                                    <h4>教师信息录入</h4>
                                    <el-form-item label="教师编号" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.tno" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="姓名" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.tname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="性别" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.gender" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属院系" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.tdept" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否为班主任" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.tclass" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="职称" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.title" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="年龄" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.tage" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                                        <el-input v-model="user.teacher.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form-item>

                                <el-form-item v-if="user.role === 'manager'">
                                    <h4>管理员信息录入</h4>
                                    <el-form-item label="管理员编号" :label-width="formLabelWidth">
                                        <el-input v-model="user.manager.mno" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="管理员姓名" :label-width="formLabelWidth">
                                        <el-input v-model="user.manager.mname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="管理员身份" :label-width="formLabelWidth">
                                        <el-input v-model="user.manager.identity" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                                        <el-input v-model="user.manager.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="showForm = false">取 消</el-button>
                                <el-button type="primary" @click="submitForm">确 定</el-button>
                            </div>
                        </el-dialog>

                        <el-dialog title="教师详情" :visible.sync="teacherDetailVisible">
                            <el-table :data="teacherDetailNow" border>
                                <el-table-column class="TableColumn" align="center" prop="tno" label="教师编号" width="120">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="tname" label="姓名" width="250">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="gender" label="性别" width="100">
                                    <template slot-scope="scope">
                                        {{ scope.row.gender == 1 ? "男" : "女" }}
                                    </template>
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="tdept" label="所属院系" width="125">
                                </el-table-column>
                            </el-table>
                            <el-table :data="teacherDetailNow" border width="75%">
                                <el-table-column class="TableColumn" align="center" prop="tclass" label="管理班级（班主任）"
                                    width="125">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="title" label="职称" width="250">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="tage" label="年龄" width="250">
                                </el-table-column>
                                <el-table-column class="TableColumn" align="center" prop="email" label="电子邮箱" width="250">
                                </el-table-column>
                            </el-table>
                        </el-dialog>

                        <br>
                        <el-button @click="BatchDelete()">批量删除</el-button>
                        <el-button @click="Deselect()">取消选择</el-button>
                        <el-button type="primary" @click="addUsers()">添加用户</el-button>
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
                                <el-table-column prop="name" label="姓名" width="150"></el-table-column>
                                <el-table-column prop="text" label="负责任务" width="200"></el-table-column>
                                <el-table-column prop="aaa" label="组长/组员" width="200"></el-table-column>
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
            user: {
                uno: '',
                role: '',
                student: {
                    "sno": "",
                    "sname": "",
                    "gender": '',
                    "sgrade": "",
                    "sage": '',
                    "sdept": "",
                    "sclass": "",
                    "sloc": "",
                    "email": ""
                }, // 学生需要填写的字段  
                teacher: {
                    "tno": "",
                    "tname": "",
                    "gender": '',
                    "tdept": "",
                    "tclass": "",
                    "title": "",
                    "tage": '',
                    "email": ""
                }, // 教师需要填写的字段  
                manager: {
                    "mno": "",
                    "mname": "",
                    "identity": "",
                    "email": "",
                }, // 管理员需要填写的字段  
            },
            allUsersData:
                [
                    {
                        "id": 1,
                        "uno": "020001",
                        "username": "21020001",
                        "role": "manager",
                        "name": "张三",
                        "gender": 1,
                        "age": 20,
                        "email": "987654321@163.com"
                    },
                    {
                        "id": 2,
                        "uno": "020002",
                        "username": "21020002",
                        "role": "teacher",
                        "name": "教师A",
                        "gender": 0,
                        "age": 50,
                        "email": "187654321@163.com"
                    },
                    {
                        "id": 3,
                        "uno": "020003",
                        "username": "21020003",
                        "role": "student",
                        "name": "学生A",
                        "gender": 1,
                        "age": 20,
                        "email": "387654321@qq.com"
                    },
                    {
                        "id": 4,
                        "uno": "020004",
                        "username": "21020004",
                        "role": "teacher",
                        "name": "教师B",
                        "gender": 0,
                        "age": 21,
                        "email": "123456789@qq.com"
                    },
                    {
                        "id": 5,
                        "uno": "020004",
                        "username": "21020005",
                        "role": "student",
                        "name": "学生B",
                        "gender": 1,
                        "age": 21,
                        "email": "666666666@qq.com"
                    },
                    {
                        "id": 1,
                        "uno": "020001",
                        "username": "21020001",
                        "role": "manager",
                        "name": "张三",
                        "gender": 1,
                        "age": 20,
                        "email": "987654321@163.com"
                    },
                    {
                        "id": 2,
                        "uno": "020002",
                        "username": "21020002",
                        "role": "teacher",
                        "name": "教师A",
                        "gender": 0,
                        "age": 50,
                        "email": "187654321@163.com"
                    },
                    {
                        "id": 3,
                        "uno": "020003",
                        "username": "21020003",
                        "role": "student",
                        "name": "学生A",
                        "gender": 1,
                        "age": 20,
                        "email": "387654321@qq.com"
                    },
                    {
                        "id": 4,
                        "uno": "020004",
                        "username": "21020004",
                        "role": "teacher",
                        "name": "教师B",
                        "gender": 0,
                        "age": 21,
                        "email": "123456789@qq.com"
                    },
                    {
                        "id": 5,
                        "uno": "020004",
                        "username": "21020005",
                        "role": "student",
                        "name": "学生B",
                        "gender": 1,
                        "age": 21,
                        "email": "666666666@qq.com"
                    },
                    {
                        "id": 1,
                        "uno": "020001",
                        "username": "21020001",
                        "role": "manager",
                        "name": "张三",
                        "gender": 1,
                        "age": 20,
                        "email": "987654321@163.com"
                    },
                    {
                        "id": 2,
                        "uno": "020002",
                        "username": "21020002",
                        "role": "teacher",
                        "name": "教师A",
                        "gender": 0,
                        "age": 50,
                        "email": "187654321@163.com"
                    },
                    {
                        "id": 3,
                        "uno": "020003",
                        "username": "21020003",
                        "role": "student",
                        "name": "学生A",
                        "gender": 1,
                        "age": 20,
                        "email": "387654321@qq.com"
                    },
                    {
                        "id": 4,
                        "uno": "020004",
                        "username": "21020004",
                        "role": "teacher",
                        "name": "教师B",
                        "gender": 0,
                        "age": 21,
                        "email": "123456789@qq.com"
                    },
                    {
                        "id": 5,
                        "uno": "020004",
                        "username": "21020005",
                        "role": "student",
                        "name": "学生B",
                        "gender": 1,
                        "age": 21,
                        "email": "666666666@qq.com"
                    },
                    {
                        "id": 5,
                        "uno": "020004",
                        "username": "21020005",
                        "role": "student",
                        "name": "学生B",
                        "gender": 1,
                        "age": 21,
                        "email": "666666666@qq.com"
                    },
                ],

            searchForm: {
                tno: "",
                tname: "",
            },
            visible: false,
            showTable: false,
            showForm: false,
            filteredTeachers: [],
            currentPage: 1, // 当前页数
            pageSize: 5, // 每页显示的条数
            total: 100, // 总数据条数
            teacherDetailVisible: false,
            teacherDetailNow: {},
        };
    },

    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.$router.push('/UserLogin')
                console.log('用户点击了退出登录');
            }
        },
        addUsers: function () {
            this.showForm = true;
        },
        onSubmit: function () {
            alert("查询");
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
        searchCourseBycno() { // 根据课程号筛选课程数据 
            this.filteredTeachers = this.allUsersData.filter(teacher => teacher.tno === this.searchForm.tno)
            this.showForm = true // 显示弹窗表格 
        },
        searchCourseBycname() { // 根据课程号筛选课程数据 
            this.filteredTeachers = this.allUsersData.filter(teacher => teacher.tname === this.searchForm.tname)
            this.showForm = true // 显示弹窗表格 
        },

        showTeacherDetails(tno) {
            // 根据教师编号获取教师的详细信息，这里您可以根据实际情况调用API或者从其他地方获取数据  
            // 假设有一个获取教师详细信息的API，可以这样调用：  
            // axios.get(`/api/teachers/${tno}`).then(response => {  
            //   this.teacherDetails = response.data;  
            //   this.teacherDetailVisible = true;  
            // });
            const selectedTeacher = this.paginatedUsersData.find(teacher => teacher.tno === tno);
            this.teacherDetailNow = selectedTeacher;
            this.teacherDetailVisible = true;
        },
    },
    computed: {
        totalRows() {
            return this.allUsersData.length; // 总数据条数
        },
        paginatedUsersData() {
            // 根据当前页数和每页显示的数量，计算截取的数据段
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.allUsersData.slice(startIndex, endIndex);
        },

    },
    mounted() {
        this.userData = this.$route.meta.userData;
        axios.get("").then((result) => {
            //../Data/api/all-courses.json
            this.courseData = result.data.data;
            /* result.data.data; */
        }); //发送异步请求
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