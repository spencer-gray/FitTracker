<template>
	<div class="chat-window">
		<div class="chatbox-header">
			<div class="chatbox-username">{{username}}</div>
			<div class="active-indicator"></div>
		</div>
		<div class="messages">
			<div class="message" v-bind:key="message._id" v-for="message in messages">
				<div class="username">{{message.username}}</div>
				<div class="message-text">{{message.msg}}</div>
			</div>
		</div>
		<form class="chat-input" v-on:submit="sendMessage">
			<input type="text" v-model="msg">
			<button v-on:click="sendMessage" v-bind:disabled="!msg">Send</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Chat',
	props: {
		messages: Array,
		username: String
	},
	data: function () {
		return {
			msg: ""
		}
	},
	updated: function() {
		var chatbox = document.querySelector(".messages");
		chatbox.scrollTop = chatbox.scrollHeight;
	},	
	methods: {
		sendMessage: function () {
			if (!this.msg) {
				return;
			}
			this.$emit('sendMessage', this.msg);
			this.msg = "";
			this.scrollToEnd();
		},
		scrollToEnd: function() {
			var chatbox = this.$el.querySelector(".messages");
			chatbox.scrollTop = chatbox.scrollHeight;
		}
	}
}

</script>

<style scoped lang="scss">

.chat-window {
	max-height: 60vh;
	display: flex;
	flex-direction: column;
	color: #30475e;
	border-radius: 10px;
	background-color: #F9F9F9;
	box-shadow: 1px 5px 5px 1px darkgray;
	
	.chatbox-header {
		margin: 1rem auto;
		display: flex;
		font-size: 18px;
		font-weight: 700;
	}

	.active-indicator {
		background-color: #5fdba7;
		min-height: 15px;
		min-width: 15px;
		max-height: 15px;
		max-width: 15px;
		margin-top: auto;
		margin-bottom: auto;
		border-radius: 50%;
		margin-left: 0.5rem;
	}

	.username {
		width: 100px;
		margin-right: 1rem;
	}

	.messages {
		overflow: scroll;
	}

	.message {
		display: flex;
		border-bottom: 1px solid #EFEFEF;
		padding: 0.5rem;
	}

	.message-text {
		flex: 1;
	}

	.chat-input {
		display: flex;
		input {
			flex: 1;
			box-sizing: border-box;
			padding-left: 10px;
			height: 40px;
			font-size: 18px;
		}
		button {
			box-sizing: border-box;
			width: 90px;
			height: 40px;
			background-color: #30475e;
			color: white;
			font-size: 14px;
		}
		button:hover {
			background-color: #7182b6;
			cursor: pointer;
		}
		button:focus {
			outline-width: 0;
		}
	}
}
</style>

