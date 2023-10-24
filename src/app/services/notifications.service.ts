import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  private _notificationsEnterRoom = new BehaviorSubject<any[]>([]);
  public notificationsEnterRoom$ = this._notificationsEnterRoom.asObservable();

  constructor(private socket: Socket) {
    socket.fromEvent('student_enters').subscribe((data: any) => {
      this._notificationsEnterRoom.next(data);
    });  
  }

  sendNotificationsEnterRoom(payload: {room: string, idUser: string}) {
    this.socket.emit('student_enters', payload);
  }
}