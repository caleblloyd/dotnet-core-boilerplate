import Vue from 'vue'
import { Route } from 'vue-router'
import Component from 'vue-class-component'
import DotvueComponent from '../dotvue/DotvueComponent'
import ViewTemplate from '../views/chat/view.html'
import { HubConnection } from '@aspnet/signalr'

const dataKeyView = "chat/view"

@DotvueComponent(module, {
    template: ViewTemplate
})
export class View extends Vue {

    public mounted() {
        const connection = new HubConnection('/api/chathub')

        connection.on('Send', (timestamp, user, message) => {
            const encodedUser = user
            const encodedMsg = message
            const listItem = document.createElement('li')
            listItem.innerHTML = timestamp + ' <b>' + encodedUser + '</b>: ' + encodedMsg
            document.getElementById('messages').appendChild(listItem)
        })

        document.getElementById('send').addEventListener('click', event => {
            const msg = (document.getElementById('message') as any).value
            const usr = (document.getElementById('user') as any).value

            connection.invoke('Send', usr, msg).catch(err => showErr(err))
            event.preventDefault()
        })

        function showErr(msg: string) {
            const listItem = document.createElement('li')
            listItem.setAttribute("style", "color: red")
            listItem.innerText = msg.toString()
            document.getElementById('messages').appendChild(listItem)
        }

        connection.start().catch(err => showErr(err))
    }

}
