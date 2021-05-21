<template>
  <div>
    <div class="text-green-700">this is original comment page!</div>
    <Comment />
  </div>
</template>

<script>
import Comment from "./components/comments/comment.vue";

export default {
  name: "App",
  components: {
    Comment,
  },
};
</script>
