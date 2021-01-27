import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatColection: AngularFirestoreCollection<any>;
  public chat: any[] = [];

  constructor(private afs: AngularFirestore) { }

  cargarMsg() {
    this.chatColection = this.afs.collection<any>('Chat');
    return this.chatColection.valueChanges();
  }
}
