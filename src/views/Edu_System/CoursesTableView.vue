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
                        <el-table :data="coursesTable" style="width: 100%" border>
                            <el-table-column prop="lesson" label="课程" width="120"></el-table-column>
                            <el-table-column label="周一">
                                <template slot-scope="scope">
                                    {{ scope.row.day[0] }}
                                </template>
                            </el-table-column>
                            <el-table-column label="周二">
                                <template slot-scope="scope">
                                    {{ scope.row.day[1] }}
                                </template>
                            </el-table-column>
                            <el-table-column label="周三">
                                <template slot-scope="scope">
                                    {{ scope.row.day[2] }}
                                </template>
                            </el-table-column>
                            <el-table-column label="周四">
                                <template slot-scope="scope">
                                    {{ scope.row.day[3] }}
                                </template>
                            </el-table-column>
                            <el-table-column label="周五">
                                <template slot-scope="scope">
                                    {{ scope.row.day[4] }}
                                </template>
                            </el-table-column>
                            <el-table-column label="周六">
                                <template slot-scope="scope">
                                    {{ scope.row.day[5] }}
                                </template>
                            </el-table-column>
                            <el-table-column label="周日">
                                <template slot-scope="scope">
                                    {{ scope.row.day[6] }}
                                </template>
                            </el-table-column>
                        </el-table>
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
            coursesSelected: [],
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
            coursesTable: []
        }
    },
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.$router.push('/UserLogin')
                console.log('用户点击了退出登录');
            }
        },
        makeTable(table) {
            this.coursesSelected.forEach(course => {
                course.ctime.forEach((item, index, array) => {
                    if ((index + 1) % 3 === 0) {
                        let start = Number(array[index - 1]) - 1;
                        let end = Number(array[index]) - 1;
                        let weekday = Number(array[index - 2]) - 1;
                        table[start].day[weekday] = course.cname;
                        table[end].day[weekday] = course.cname;
                        if (start < end - 1) {
                            for (let i = start + 1; i <= end; i++) {
                                table[i - 1].day[weekday] = course.cname;
                            }
                        }
                    }
                });
            })
        },
        refresh() { //刷新
            axios.get(`/CoursesSelect?uno=${this.userData.uno}`).then((result) => {
                this.coursesSelected = result.data.data;
                const tableData = [
                    { lesson: '第1节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第2节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第3节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第4节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第5节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第6节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第7节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第8节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第9节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第10节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第11节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                    { lesson: '第12节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                ];
                this.makeTable(tableData);
                this.coursesTable = tableData;
                this.$message.success('数据已更新');
            });
        },
    },
    computed: {
    },
    mounted() {
        this.userData = this.$route.meta.userData;
        axios.get(`/CoursesSelect?uno=${this.userData.uno}`).then((result) => { // "https://mock.apifox.com/m1/3839966-0-default/CoursesSelect"
            this.coursesSelected = result.data.data;
            const tableData = [
                { lesson: '第1节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第2节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第3节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第4节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第5节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第6节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第7节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第8节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第9节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第10节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第11节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
                { lesson: '第12节课', day: ["无", "无", "无", "无", "无", "无", "无"] },
            ];
            this.makeTable(tableData);
            this.coursesTable = tableData;
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