import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService implements OnDestroy {
  private _notificationsEnterRoom = new BehaviorSubject<any[]>([]);
  public notificationsEnterRoom$ = this._notificationsEnterRoom.asObservable();
  private unsubscribe$ = new Subject<void>();

  constructor(private socket: Socket) {
    this.subscribeToStudentEnters();
  }

  // Suscribirse a un evento específico
  private subscribeToStudentEnters() {
    this.socket
      .fromEvent('student_enters')
      .pipe(
        catchError((error) => {
          console.error('Error in socket connection:', error);
          return [];
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: any) => {
        this._notificationsEnterRoom.next(data);
      });
  }

  // Emitir un evento específico
  sendNotificationsEnterRoom(payload: { room: string; idUser: string; classId: string }) {
    this.socket.emit('student_enters', payload);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
