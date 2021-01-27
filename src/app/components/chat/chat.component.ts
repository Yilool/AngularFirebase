import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent{
  msg: string;

  constructor(private chatService: ChatService) {
    this.chatService.cargarMsg().subscribe((res: any[]) => {
      console.log(res);
    })
  }

  enviar() {
    console.log(this.msg);
    
  }
}
