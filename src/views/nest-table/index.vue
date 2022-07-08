<template>
  <div>
    <el-table :data="timeColumn">
      <el-table-column label="上课时间">
        <el-table-column width="80" prop="weeklyStr" label="日期">
        </el-table-column>
        <el-table-column
          width="80"
          prop="courseTimeStr"
          label="时间"
        ></el-table-column>
      </el-table-column>
      <el-table-column v-for="item in classrooms" :label="item">
        <template #default="{ row, column, $index }">
          <div
            v-for="course in grouped[item][row['weeklyStr']][
              row['courseTimeStr']
            ]"
            :key="course.courseType"
          >
            <el-button
              type="text"
              style="margin: 0"
              :style="{
                color:
                  course.courseStatus !== 'normal'
                    ? course.courseStatus === 'next'
                      ? 'red'
                      : 'gray'
                    : '',
              }"
            >
              {{ formatCourse(course) }}
            </el-button>
            <div class="student-list">
              {{ formatStudentList(course) }}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import dataReducer from "../../utils/data-reducer";

const grouped = ref({});
const timeColumnSet = new Set([]);
const timeColumn = ref([]);
const classroomsSet = new Set([]);
const classrooms = ref([]);

const formatCourse = (item) => {
  const cState = {
    normal: "正常",
    next: "正常",
    suspend: "搁置",
  };
  return `${item.teacherNickname || '无'}/${item.adviserNickname || '无'}-${item.name}-${
    item.courseType
  }(${item.students.length}人)-${cState[item.courseStatus]}`;
};

const formatStudentList = (item) => {
  return item.students
    .map((stu) => `${stu.username}(${stu.clazzFullName}/${stu.remains})`)
    .join(",");
};

onMounted(async () => {
  const response = fetch("/response.json");
  const {
    data: { timetables: tbs },
  } = await (await response).json();

  tbs.forEach((item) => {
    classroomsSet.add(item.classroom.toLowerCase());
    timeColumnSet.add(`${item.weeklyStr}-${item.courseTimeStr}`);
  });

  classrooms.value.push(...classroomsSet);

  grouped.value = dataReducer(["classroom", "weeklyStr", "courseTimeStr"], tbs);

  [...timeColumnSet].forEach((item) => {
    const [weeklyStr, courseTimeStr] = item.split("-");
    timeColumn.value.push({
      weeklyStr,
      courseTimeStr,
    });
  });
});
</script>

<style lang="scss" scoped>
.student-list {
  color: gray;
}
</style>
