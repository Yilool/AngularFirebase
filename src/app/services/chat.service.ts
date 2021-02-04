import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Msg } from '../interfaces/msg';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chatColection: AngularFirestoreCollection<Msg>;
  public chat: Msg[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore, public afa: AngularFireAuth) {
    this.afa.authState.subscribe((us) => {
      if (!us) {
        return;
      }

      this.user.nombre = us.displayName;
      this.user.uid = us.uid;
    });
  }

  login() {
    this.afa.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.user = {};
    this.afa.signOut();
  }

  cargarMsg() {
    this.chatColection = this.afs.collection<Msg>('Chat', (ref) =>
      ref.orderBy('fecha', 'desc').limit(15)
    );
    return this.chatColection.valueChanges().pipe(
      map((mensaje: Msg[]) => {
        this.chat = [];
        for (const m of mensaje) {
          this.chat.unshift(m);
        }
      })
    );
  }

  anniadirMsg(txt: string) {
    let mensaje: Msg = {
      usuario: this.user.nombre,
      msg: txt,
      fecha: new Date().getTime(),
      uid: this.user.uid,
    };

    return this.chatColection.add(mensaje);
  }
}
