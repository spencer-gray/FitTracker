<template>
	<div class="chatroom">
		<div class="chatroom-header">
            Live Chat Room
		</div>
		<Chat v-bind:messages="messages" v-bind:username="username" v-on:sendMessage="this.sendMessage" />
	</div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';
import Chat from '@/components/Chat';
import { mapGetters } from 'vuex';

export default {
	name: 'Chatroom',
	components: {
		Chat
	},
	data: function () {
		return {
			username: "",
			socket: io(),
			messages: [],
			users: []
		}
	},
	methods: {
		joinServer: function () {
			this.socket.on('initialize', data => {
				this.users = data.users;
				this.socket.emit('newuser', this.username);
			});
			this.listen();
        },
        // Creating listeners
		listen: function () {
			this.socket.on('userJoined', user => {
				this.users.push(user);
			});
			this.socket.on('userLeft', user => {
				this.users.splice(this.users.indexOf(user), 1);
			});
			this.socket.on('message', message => {
				this.messages.push(message);
			});
		},
		sendMessage: function (message) {
			this.socket.emit('message', message);
        },
        leaveServer: function() {
            this.socket.emit('')
        }
	},
	mounted: function () {
		this.joinServer();
    },
    computed: mapGetters(['getLoginState', 'getUsername']),
    created: function() {
    // User is not authorized, redirect to login page
    if (localStorage.getItem('token') === null) {
        this.$router.push('login');
    } else {
        this.username = this.$store.getters.getUsername;
        axios.get('chat')
          .then((response) => this.messages = response.data.reverse())
          .catch((error) => console.log(error));

    }
  },
}
</script>

<style lang="scss">

.chatroom {
    width: 50%;
    margin: 2rem auto;
    min-width: 350px;
}

.chatroom-header {
    margin: 2rem auto;
    text-align: center;
    font-size: 22px;
    color: #30475e;
    font-weight: 700;
}

</style>
