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
                        <h4>全部课程列表</h4>
                        <!-- 操作表单 -->
                        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                            <el-form-item label="课程号">
                                <el-input v-model="searchForm.cno" length="4" show-word-limit
                                    placeholder="按选课号查询"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchCourseBycno">查询</el-button>
                            </el-form-item>
                            <el-form-item label="课程名">
                                <el-input v-model="searchForm.cname" length="4" show-word-limit
                                    placeholder="按选课名称查询"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="searchCourseBycname">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 表格 -->
                        <el-table :data="paginatedCoursesData" border ref="courseTable">
                            <el-table-column align="center" type="selection" width="50">
                            </el-table-column>
                            <el-table-column align="center" prop="cno" label="课程号" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="cname" label="课程名" width="120">
                            </el-table-column>
                            <el-table-column align="center" prop="credit" label="学分" width="75">
                            </el-table-column>
                            <el-table-column align="center" prop="tname" label="授课教师" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="assMethod" label="考核方式" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="ctime" label="上课时间" width="100">
                                <template slot-scope="scope">
                                    <span>{{ formatClassTime(scope.row.ctime) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="cloc" label="上课地点" width="100">
                            </el-table-column>
                            <el-table-column align="center" prop="selected" label="已选人数" width="80">
                            </el-table-column>
                            <el-table-column align="center" prop="capacity" label="限选人数" width="80">
                            </el-table-column>
                            <el-table-column align="center" label="班级详情" width="150">
                                <el-button type="primary" @click="goToClassByNanager" size="mini">点击进入班级详情</el-button>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="getCourseForm(scope.row)" size="mini">修改</el-button>
                                    <el-button slot="reference" @click="confirmDelete(scope.row.cno)"
                                        size="mini">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <br>
                        <el-button @click="batchDelete()">批量删除</el-button>
                        <el-button @click="deselect()">取消选择</el-button>
                        <el-button type="primary" @click="this.openForm = true">添加课程</el-button>
                        <!-- 弹窗表格 -->
                        <el-dialog title="已开课程查询结果" :visible.sync="showTable">
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
                        <!-- 添加课程 -->
                        <el-dialog title="添加课程" :visible.sync="openForm">
                            <el-form :model="form" :default-file-list="form" :rules="rules" ref="addForm">
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="课程号" label-width="80px" prop="cno">
                                            <el-input v-model="form.cno" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="课程名称" label-width="90px" prop="cname">
                                            <el-input v-model="form.cname" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="学分" label-width="80px" prop="credit">
                                            <el-input v-model="form.credit" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="教师姓名" label-width="90px" prop="tname">
                                            <el-input v-model="form.tname" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="考核方式" label-width="80px" prop="assMethod">
                                            <el-select v-model="form.assMethod">
                                                <el-option label="闭卷" value="闭卷"></el-option>
                                                <el-option label="开卷" value="开卷"></el-option>
                                                <el-option label="考查" value="考查"></el-option>
                                                <el-option label="其他" value="其他"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="上课地点" label-width="90px" prop="cloc">
                                            <el-input v-model="form.cloc" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="限选人数" label-width="80px" prop="capacity">
                                            <el-input v-model="form.capacity" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-form-item label="上课时间" label-width="80px" prop="ctime">
                                        <el-row>
                                            <el-select v-model="form.ctime[0]" placeholder="请选择上课时间日">
                                                <el-option label="周一" value="1"></el-option>
                                                <el-option label="周二" value="2"></el-option>
                                                <el-option label="周三" value="3"></el-option>
                                                <el-option label="周四" value="4"></el-option>
                                                <el-option label="周五" value="5"></el-option>
                                                <el-option label="周六" value="6"></el-option>
                                                <el-option label="周日" value="7"></el-option>
                                            </el-select>
                                        </el-row>
                                        <el-row>
                                            <el-select v-model="form.ctime[1]" placeholder="上课时间">
                                                <el-option label="第一节" value="1"></el-option>
                                                <el-option label="第二节" value="2"></el-option>
                                                <el-option label="第三节" value="3"></el-option>
                                                <el-option label="第四节" value="4"></el-option>
                                                <el-option label="第五节" value="5"></el-option>
                                                <el-option label="第六节" value="6"></el-option>
                                                <el-option label="第七节" value="7"></el-option>
                                                <el-option label="第八节" value="8"></el-option>
                                                <el-option label="第九节" value="9"></el-option>
                                                <el-option label="第十节" value="10"></el-option>
                                                <el-option label="第十一节" value="11"></el-option>
                                                <el-option label="第十二节" value="12"></el-option>
                                            </el-select>
                                            至
                                            <el-select v-model="form.ctime[2]" placeholder="下课时间">
                                                <el-option label="第一节" value="1"></el-option>
                                                <el-option label="第二节" value="2"></el-option>
                                                <el-option label="第三节" value="3"></el-option>
                                                <el-option label="第四节" value="4"></el-option>
                                                <el-option label="第五节" value="5"></el-option>
                                                <el-option label="第六节" value="6"></el-option>
                                                <el-option label="第七节" value="7"></el-option>
                                                <el-option label="第八节" value="8"></el-option>
                                                <el-option label="第九节" value="9"></el-option>
                                                <el-option label="第十节" value="10"></el-option>
                                                <el-option label="第十一节" value="11"></el-option>
                                                <el-option label="第十二节" value="12"></el-option>
                                            </el-select>
                                        </el-row>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="openForm = false">取 消</el-button>
                                <el-button type="primary" @click="postCourse('addForm')">确 定</el-button>
                            </div>
                        </el-dialog>
                        <!-- 修改课程 -->
                        <el-dialog title="修改学生" :visible.sync="showForm">
                            <el-form :model="putForm" :default-file-list="form" :rules="rules" ref="chaForm">
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="课程号" label-width="80px" prop="cno">
                                            <el-input v-model="putForm.cno" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="课程名称" label-width="90px" prop="cname">
                                            <el-input v-model="putForm.cname" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="学分" label-width="80px" prop="credit">
                                            <el-input v-model="putForm.credit" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="教师姓名" label-width="90px" prop="tname">
                                            <el-input v-model="putForm.tname" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="考核方式" label-width="80px" prop="assMethod">
                                            <el-select v-model="putForm.assMethod">
                                                <el-option label="闭卷" value="闭卷"></el-option>
                                                <el-option label="开卷" value="开卷"></el-option>
                                                <el-option label="考查" value="考查"></el-option>
                                                <el-option label="其他" value="其他"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="上课地点" label-width="90px" prop="cloc">
                                            <el-input v-model="putForm.cloc" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="11">
                                        <el-form-item label="限选人数" label-width="80px" prop="capacity">
                                            <el-input v-model="putForm.capacity" autocomplete="off"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-form-item label="上课时间" label-width="80px" prop="ctime">
                                        <el-row>
                                            <el-select v-model="putForm.ctime[0]" placeholder="请选择上课时间日">
                                                <el-option label="周一" value="1"></el-option>
                                                <el-option label="周二" value="2"></el-option>
                                                <el-option label="周三" value="3"></el-option>
                                                <el-option label="周四" value="4"></el-option>
                                                <el-option label="周五" value="5"></el-option>
                                                <el-option label="周六" value="6"></el-option>
                                                <el-option label="周日" value="7"></el-option>
                                            </el-select>
                                        </el-row>
                                        <el-row>
                                            <el-select v-model="putForm.ctime[1]" placeholder="上课时间">
                                                <el-option label="第一节" value="1"></el-option>
                                                <el-option label="第二节" value="2"></el-option>
                                                <el-option label="第三节" value="3"></el-option>
                                                <el-option label="第四节" value="4"></el-option>
                                                <el-option label="第五节" value="5"></el-option>
                                                <el-option label="第六节" value="6"></el-option>
                                                <el-option label="第七节" value="7"></el-option>
                                                <el-option label="第八节" value="8"></el-option>
                                                <el-option label="第九节" value="9"></el-option>
                                                <el-option label="第十节" value="10"></el-option>
                                                <el-option label="第十一节" value="11"></el-option>
                                                <el-option label="第十二节" value="12"></el-option>
                                            </el-select>
                                            至
                                            <el-select v-model="putForm.ctime[2]" placeholder="下课时间">
                                                <el-option label="第一节" value="1"></el-option>
                                                <el-option label="第二节" value="2"></el-option>
                                                <el-option label="第三节" value="3"></el-option>
                                                <el-option label="第四节" value="4"></el-option>
                                                <el-option label="第五节" value="5"></el-option>
                                                <el-option label="第六节" value="6"></el-option>
                                                <el-option label="第七节" value="7"></el-option>
                                                <el-option label="第八节" value="8"></el-option>
                                                <el-option label="第九节" value="9"></el-option>
                                                <el-option label="第十节" value="10"></el-option>
                                                <el-option label="第十一节" value="11"></el-option>
                                                <el-option label="第十二节" value="12"></el-option>
                                            </el-select>
                                        </el-row>
                                    </el-form-item>
                                </el-row>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="showForm = false">取 消</el-button>
                                <el-button type="primary" @click="putCourse('chaForm')">确 定</el-button>
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
                cno: '',
                cname: ''
            },
            courseTable: [],

            showTable: false,
            showForm: false,
            openForm: false,
            TOcno: '',
            TOcname: '',
            form: {
                cno: "",
                cname: "",
                credit: '',
                tname: "",
                assMethod: "",
                ctime: [],
                cloc: "",
                capacity: ''
            },
            putForm: {
                cno: "",
                cname: "",
                credit: '',
                tname: "",
                assMethod: "",
                ctime: [],
                cloc: "",
                capacity: ''
            },
            rules: {
                cno: [
                    { required: true, message: '请输入课程号', trigger: 'blur' },
                    { min: 4, max: 4, message: '长度为4位数', trigger: 'blur' }
                ],
                cname: [
                    { required: true, message: '请输入课程名称', trigger: 'blur' }
                ],
                credit: [
                    { required: true, message: '请输入课程学分', trigger: 'blur' }
                ],
                tname: [
                    { required: false, trigger: 'blur' },
                ],
                assMethod: [
                    { required: true, message: '请选择考核方式', trigger: 'change' }
                ],
                capacity: [
                    { required: true, message: '请设置限选人数', trigger: 'blur' },
                    { validator: this.validateInteger, trigger: 'blur' }
                ],
                ctime: [
                    { required: true, message: '请选择上课时间', trigger: 'change' },
                    {
                        validator: (rule, value, callback) => {
                            setTimeout(() => {
                                if (Number(value[1]) <= Number(value[2])) {
                                    callback();
                                } else {
                                    callback(new Error('上课时间应不晚于下课时间'));
                                }
                            }, 1000);
                        },
                        trigger: 'change'
                    }
                ],
                cloc: [
                    { required: true, message: '请输入上课地点', trigger: 'blur' }
                ],
            },
            coursesData: [],
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
        goToClassByNanager(TOcno, TOcname) {
            this.$router.push(
                {
                    path: '/ClassByManager',
                    query: { cno: TOcno, cname: TOcname }
                }
            );
        },
        async searchCourseBycno() {
            if (this.searchForm.cno) {
                axios.get(`/CoursesManage?cno=${this.searchForm.cno}`).then(result => {
                    this.courseTable = result.data.data;
                    this.openDialogTable();
                });
            }
            else
                this.$message.error('请输入课程号');

        },
        async searchCourseBycname() {
            if (this.searchForm.cname) {
                axios.get(`/CoursesManage?cname=${this.searchForm.cname}`).then(result => {
                    this.courseTable = result.data.data;
                    this.openDialogTable();
                });
            }
            else
                this.$message.error('请输入课程号');

        },
        getCourseForm(rowData) {
            this.putForm = rowData;
            this.showForm = true
        },
        async putCourse(chaForm) {
            this.$refs[chaForm].validate((valid) => {
                if (valid) {
                    try {
                        const formData = chaForm;
                        if (formData)
                            axios.put(`/CoursesManage?cno=${formData.cno}`, formData);
                        else
                            alert("数据不可为空");
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
        async postCourse(addForm) {
            this.$refs[addForm].validate((valid) => {
                if (valid) {
                    try {
                        const formData = addForm;
                        axios.post(`/CoursesManage?cno=${formData.cno}`, formData);
                        console.log('数据提交成功！');
                    } catch (error) {
                        console.error('数据提交失败：', error);
                    }
                    this.openForm = false;
                    this.refresh()
                }
                else {
                    this.$message.error('请完善表单内容');

                }
            });
        },
        async deleteCourse(cno) {
            axios.delete(`/CoursesManage?cno=${cno}`).then(result => {
                console.log(result.data.data);
            });
            this.refresh()
        },
        openAddForm() {
            console.log(this.openForm);
            this.openForm = true;
        },
        confirmDelete(cno) {
            this.$confirm('确认删除？')
                .then(() => {
                    this.deleteCourse(cno); // 执行删除操作
                })
                .catch(() => {
                    // 用户取消删除，什么也不做
                });
        },
        refresh() { //刷新
            axios.get("/CoursesManage").then((result) => {
                this.coursesData = result.data.data;
                this.$message.success('数据已更新');
            });
        },

        batchDelete() {
            const selectedCourses = this.$refs.courseTable.selection.map(Course => Course.cno);
            if (selectedCourses.length === 0) {
                this.$message.warning('请先选择要删除的学生');
                return;
            }
            axios.delete(`/CoursesManage?cnos=${selectedCourses.join(',')}`)
                .then(result => {
                    console.log(result)
                    this.refresh()
                    this.$message.success('批量删除成功');
                })
        },
        deselect() {
            this.$refs.courseTable.clearSelection();
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
        /* 分页条 */
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
            return this.coursesData.length; // 总数据条数
        },
        paginatedCoursesData() {
            // 根据当前页数和每页显示的数量，计算截取的数据段
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.coursesData.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.userData = this.$route.meta.userData;
        axios.get("/CoursesManage").then((result) => {
            this.coursesData = result.data.data;
            this.$message.success('数据已更新');
            /* result.data.data; */
        }); //发送异步请求
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