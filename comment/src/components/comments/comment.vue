<template>
  <div>
    <div v-for="name in recomp.data" :key="name.id" class="ml-4 mt-4 font-bold">
      {{ name.desc }}
    </div>
    <div class="flex my-4 relative">
      <el-input
        placeholder="사용자 입력"
        v-model="cmtWriter"
        class="w-24 ml-4"
      ></el-input>
      <el-input
        placeholder="내용을 입력해주세요"
        v-model="cmtText"
        class="w-64 ml-2"
        @keyup.enter="addComment"
      ></el-input>
      <el-button
        type="info"
        plain
        class="ml-4 hover:bg-purple-700"
        @click="addComment"
      >
        입력</el-button
      >

      <div class="flex absolute inset-y-0 right-0 mr-12 ">
        <div v-if="settingBox">
          <el-input-number
            v-model="recompId"
            @change="getComments()"
            :min="1"
            :max="2"
            class="ml-2 "
          ></el-input-number>
        </div>
        <div
          class="el-icon-setting cursor-pointer ml-2 text-2xl text-gray-500 hover:text-green-600"
          @click="openSettingBox"
        ></div>
      </div>
    </div>

    <div
      class="text-left border-t-2 "
      v-for="c in comments.slice().reverse()"
      :key="`comments-${c.id}`"
    >
      <div v-if="c.editF" class="">
        <div class="flex my-4 relative">
          <div>
            <el-avatar
              shape="circle"
              :size="30"
              :src="circleUrl"
              class="mx-3"
            ></el-avatar>
            <br />
          </div>
          <div>
            <div class="flex float-left ">
              <b class="text-xl">{{ c.createAt }}</b>
              <div class="ml-5">
                <i
                  class="el-icon-s-comment cursor-pointer hover:text-green-600 mr-1"
                  @click="openSubcmt(c)"
                ></i>
                <i
                  class="el-icon-edit cursor-pointer hover:text-yellow-500 mr-1"
                  @click="openEdit(c)"
                ></i>
                <i
                  class="el-icon-delete cursor-pointer mr-1 hover:text-red-600"
                  @click="delComment(c)"
                ></i>
                <i class="text-xs mr-80">
                  {{ c.time }}
                </i>
              </div>
            </div>

            <div class="text-lg ">{{ c.text }}</div>
          </div>

          <div class="flex absolute inset-y-2 right-0 mr-12">
            <div
              v-if="c.check"
              class=" el-icon-star-on ml-2 cursor-pointer text-2xl md:hover:text-yellow-400 focus:text-yellow-400 active:text-yellow-400 "
              @click="plusStar(c)"
            ></div>
            <div
              v-else
              class=" el-icon-star-on cursor-pointer ml-2 text-2xl text-yellow-400 "
              @click="plusStarfalse(c)"
            ></div>
            <div class="ml-1 mt-1 text-lg text-yellow-400 ">
              {{ c.like }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="my-4 ml-4">
        <el-input
          placeholder="사용자 입력"
          v-model="c.editWriter"
          class="w-24"
          >{{ c.createAt }}</el-input
        >
        <el-input
          placeholder="내용을 입력해주세요"
          v-model="c.editT"
          class="w-64 ml-2"
          @keyup.enter="editComment(c)"
        ></el-input>
        <el-button type="info" plain class="ml-4" @click="editComment(c)"
          >입력</el-button
        >
        <el-button type="danger" class="ml-4" @click="openEdit(c)"
          >취소</el-button
        >
      </div>

      <div class="mb-4">
        <div
          v-for="s in c.subcomments"
          :key="`subcomment-${s.id}`"
          class="pl-14"
        >
          <div v-if="s.noEdit">
            <div class="flex rounded-lg bg-gray-300 mb-4 w-11/12 p-2">
              <div>
                ┗

                <el-avatar
                  shape="square"
                  :size="20"
                  :src="squareUrl"
                  class="mr-4 ml-2"
                ></el-avatar>
              </div>
              <div>
                <div class="flex">
                  <b class="text-lg">
                    {{ s.createAt }}
                  </b>
                  <div class="ml-5">
                    <i
                      class="el-icon-edit cursor-pointer hover:text-yellow-500 mr-1"
                      @click="openEditSub(s)"
                    ></i>
                    <i
                      class="el-icon-delete cursor-pointer hover:text-red-600 mr-1"
                      @click="delSubC(s)"
                    ></i>
                  </div>
                  <div class="text-xs ml-1">
                    {{ s.time }}
                  </div>
                </div>

                <div>
                  {{ s.text }}
                </div>
              </div>
            </div>
          </div>

          <div v-else class="mb-4">
            <el-input
              placeholder="사용자 입력"
              v-model="s.editSW"
              class="w-24"
            ></el-input>
            <el-input
              placeholder="내용을 입력해주세요"
              v-model="s.editSubText"
              class="w-64 ml-2"
              @keyup.enter="editSubComment(s)"
            ></el-input>
            <el-button type="info" plain class="ml-4" @click="editSubComment(s)"
              >입력</el-button
            >
            <el-button type="danger" class="ml-4" @click="openEditSub(s)"
              >취소</el-button
            >
          </div>
        </div>
        <div v-if="c.subCmtF" class="mb-4 ml-14">
          <el-input
            placeholder="사용자 입력"
            v-model="c.subCmtW"
            class="w-24"
          ></el-input>
          <el-input
            placeholder="내용을 입력해주세요"
            v-model="c.subCmtT"
            class="w-64 ml-2"
            @keyup.enter="addSubcomment(c)"
          ></el-input>
          <el-button type="info" plain class="ml-4" @click="addSubcomment(c)"
            >입력</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    change: {
      type: Boolean,
      default: true,
    },
    recompId: {
      type: Number,
      default: 1, //recompId 안주면 1
    },
  },
  data() {
    return {
      checked: true,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      comments: [],
      recomp: [],
      cmtText: "",
      cmtWriter: "",
      current_time: "",
      settingBox: false,
    };
  },
  mounted() {
    this.getComments();

    this.date = this.getDate();
    this.time = this.getTime();
  },
  methods: {
    getDate: function() {
      return new Date().toLocaleDateString();
    },
    getTime: function() {
      return new Date().toLocaleTimeString();
    },
    clickstar() {
      change = !change;
    },
    changeId(change) {
      change = !change;
      this.getComments();
    },
    handleChange(value) {
      console.log(value);
    },
    async getComments() {
      const res = await axios.get(
        `http://localhost:3000/comments?recompId=${this.recompId}&_embed=subcomments`
      );
      const reRes = res.data.map((c) => {
        (c.subCmtF = false),
          (c.subCmtW = ""),
          (c.subCmtT = ""),
          (c.editF = true),
          (c.editT = "");
        return c;
      });
      this.comments = reRes;

      const re = await axios.get(
        `http://localhost:3000/recomp?id=${this.recompId}`
      );
      this.recomp = re;
    },
    async addComment() {
      if (!this.cmtText || !this.cmtWriter) {
        this.$message({
          message: "작성자 또는 내용이 입력되지 않았습니다.",
          type: "warning",
        });
        return;
      }
      await axios.post(`http://localhost:3000/comments`, {
        recompId: this.recompId,
        text: this.cmtText,
        createAt: this.cmtWriter,
        like: 0,
        check: true,
        time: this.date + " " + this.time,
      });

      this.getComments();
      this.cmtText = "";
      this.cmtWriter = "";
    },
    delComment(c) {
      this.$confirm("삭제하시겠습니까??", "Warning", {
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        type: "warning",
      })
        .then(async () => {
          await axios.delete(`http://localhost:3000/comments/` + c.id);
          this.$message({
            type: "success",
            message: "삭제되었습니다.",
          });
          this.getComments();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "삭제를 취소합니다.",
          });
        });
    },
    async openSubcmt(c) {
      c.subCmtF = !c.subCmtF;
    },
    async addSubcomment(c) {
      if (!c.subCmtT || !c.subCmtW) {
        this.$message({
          message: "작성자 또는 내용이 입력되지 않았습니다.",
          type: "warning",
        });
        return;
      }
      await axios.post("http://localhost:3000/subcomments", {
        commentId: c.id,
        text: c.subCmtT,
        createAt: c.subCmtW,
        noEdit: true,
        editSW: "",
        editSubText: "",
        time: this.date + " " + this.time,
      });
      this.getComments();
      c.subCmtT = "";
    },
    delSubC(s) {
      this.$confirm("삭제하시겠습니까??", "Warning", {
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        type: "warning",
      })
        .then(async () => {
          await axios.delete(`http://localhost:3000/subcomments/` + s.id);
          this.$message({
            type: "success",
            message: "삭제되었습니다.",
          });
          this.getComments();
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: "삭제를 취소합니다.",
          });
        });
    },
    async openEdit(c) {
      c.editF = !c.editF;
      c.editWriter = c.createAt;
      c.editT = c.text;
      c.current_time = this.date + this.time + "(수정)";
    },
    editComment(c) {
      if (!c.editT) {
        this.$message({
          message: "내용이 입력되지 않았습니다.",
          type: "warning",
        });
        return;
      }
      this.$confirm("정말 수정 하시겠습니까??", "Warning", {
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        type: "warning",
      })
        .then(async () => {
          await axios.patch(`http://localhost:3000/comments/${c.id}`, {
            text: c.editT,
            createAt: c.editWriter,
            time: c.current_time,
          });
          this.getComments();
          this.$message({
            type: "info",
            message: "수정되었습니다.",
          });
          c.editF = !c.editF;
          c.editT = "";
          c.editWriter = "";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "수정을 취소합니다.",
          });
        });
    },
    async openEditSub(s) {
      await axios.patch(`http://localhost:3000/subcomments/${s.id}`, {
        noEdit: !s.noEdit,
        editSW: s.createAt,
        editSubText: s.text,
      });
      this.getComments();
    },
    editSubComment(s) {
      if (!s.editSW || !s.editSubText) {
        this.$message({
          message: "내용이 입력되지 않았습니다.",
          type: "warning",
        });
        return;
      }
      this.$confirm("정말 수정 하시겠습니까??", "Warning", {
        confirmButtonText: "예",
        cancelButtonText: "아니오",
        type: "warning",
      })
        .then(async () => {
          await axios.patch(`http://localhost:3000/subcomments/${s.id}`, {
            text: s.editSubText,
            createAt: s.editSW,
            noEdit: true,
            editSW: "",
            editSubText: "",
            time: this.date + this.time + "(수정)",
          });
          this.getComments();
          this.$message({
            type: "info",
            message: "수정되었습니다.",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "수정을 취소합니다.",
          });
        });
    },
    async plusStar(c) {
      await axios.patch(`http://localhost:3000/comments/${c.id}`, {
        like: c.like + 1,
        check: !c.check,
      });
      this.getComments();
    },
    async plusStarfalse(c) {
      await axios.patch(`http://localhost:3000/comments/${c.id}`, {
        like: c.like - 1,
        check: !c.check,
      });
      this.getComments();
    },
    openSettingBox() {
      this.settingBox = !this.settingBox;
    },
  },
};
</script>

<style lang="scss" scoped></style>
