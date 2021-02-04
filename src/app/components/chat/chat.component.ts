import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  msg: string;
  element: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarMsg().subscribe(() => {
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.element = document.getElementById('app-mensajes');
  }

  enviar() {
    if (this.msg.length === 0) {
      return;
    }

    this.chatService
      .anniadirMsg(this.msg)
      .then(() => {
        this.msg = null;
      })
      .catch((err) => {
        console.error('Fallido', err);
      });
  }
}
