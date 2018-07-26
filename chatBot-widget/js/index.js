// (function() {

// 	$('#live-chat header').on('click', function() {

// 		$('.chat').slideToggle(300, 'swing');
// 		$('.chat-message-counter').fadeToggle(300, 'swing');

// 	});

// 	$('.chat-close').on('click', function(e) {

// 		e.preventDefault();
// 		$('#live-chat').fadeOut(300);

// 	});

// }) ();


window.responseContext = {}
const chatApp = new Vue({
    el : '#live-chat',
    data : {
        check : 'sdfbhsa',
        botTitle : 'Site Assistant',
        inputValue : '',
        chatBlock : [],
        count : 0
    },
    methods : {
        sendMessage(){
            let message = this.inputValue
            let userMessage = {
                message :message,
                ref : "user"
            }
            this.chatBlock.push(userMessage)
            this.inputValue = ""
            this.$http.post('http://localhost:3000/sendMessage',{message, responseContext}).then(response=>{
                responseContext = response.body.response.context
                response.body.response.output.text.forEach(message =>{
                    let a = {
                        count : this.count,
                        message : message,
                        ref : "bot"
                    }
                    // console.log(responseMessage)
                    this.chatBlock.push(a)
                })
                this.count++
            
            }).catch(error =>{
                console.log(error)
            })
        },
    },
    updated(){
        let div = document.querySelector('.chat-history')
        div.scrollTop = div.scrollHeight
    },
    created() {
        this.$http.post('http://localhost:3000/sendMessage',{responseContext}).then(response=>{
            responseContext = response.body.response.context
                response.body.response.output.text.forEach(message =>{
                    let a = {
                        count : this.count,
                        message : message,
                        ref : "bot"
                    }
                    // console.log(responseMessage)
                    this.chatBlock.push(a)
                })
                this.count++
        })
    },
   
})