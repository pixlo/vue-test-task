<template>
  <div>
    <input type="text" v-model="comment" @keypress.enter="addComment" />
    <button @click="addComment">Добавить комментарий</button>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <span>{{ comment.text }}</span>
        <span>
          <button @click="removeComment(comment.id)">удалить</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { SocketMessenger } from "../factories/SocketMessenger";
import { SocketMessage } from "../factories/SocketMessage";

export default {
  name: "Comments",
  data() {
    return {
      comments: [
        {
          id: "1",
          text: "Тестовый коммент 1"
        },
        {
          id: "2",
          text: "Это шедевр"
        },
        {
          id: "3",
          text: "Это прекрасно"
        },
        {
          id: "4",
          text: "Лучшее, что я видел"
        },
        {
          id: "5",
          text: "Два чая этому автору"
        }
      ],
      comment: "",
      socketMessenger: new SocketMessenger("wss://echo.websocket.org")
    };
  },
  mounted() {
    this.socketMessenger.connect();
  },
  beforeDestroy() {
    this.socketMessenger.disconnect();
  },
  methods: {
    removeComment(id) {
      this.socketMessenger.sendMessage(
        new SocketMessage({
          message: id,
          onSuccess: response => {
            const index = this.comments.findIndex(v => v.id === id);
            if (index > -1) {
              this.comments.splice(index, 1);
            }
            console.log("Removed:", response.data);
          },
          onError: error => {
            console.log("remove comment error:", error);
          },
          timeout: 500
        })
      );
    },
    addComment() {
      this.socketMessenger.sendMessage(
        new SocketMessage({
          message: this.comment,
          onSuccess: response => {
            this.comments.push({
              id: String(Math.round(Math.random() * 10000)),
              text: response.data
            });
            this.comment = "";
          },
          onError: error => {
            console.log("add comment error:", error);
          }
        })
      );
    }
  }
};
</script>

<style scoped></style>
