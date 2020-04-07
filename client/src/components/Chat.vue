<template>
	<div class="chat-window">
		<div class="messages">
			<div class="message" v-for="message in messages" v-bind:key="message._id">
				<div class="username">{{message.username}}</div>
				<div class="message-text">{{message.msg}}</div>
			</div>
		</div>
		<form class="input-container" v-on:submit="sendMessage">
			<input type="text" v-model="msg">
			<button v-on:click="sendMessage" v-bind:disabled="!msg">Send</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Chat',
	props: ['messages'],
	data: function () {
		return {
			msg: ""
		}
	},
	methods: {
		sendMessage: function () {
			if (!this.msg) {
				alert("Please enter a message");
				return;
			}
			this.$emit('sendMessage', this.msg);
			this.msg = "";
		}
	}
}
</script>

