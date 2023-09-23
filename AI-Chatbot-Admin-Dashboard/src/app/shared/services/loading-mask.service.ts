import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingMaskService {
  private loadingMask = new BehaviorSubject({ status: false });
  constructor() {}

  listenMaskChanges(): Observable<any> {
    return this.loadingMask.asObservable();
  }

  showMask(showMask: boolean = false) {
    this.loadingMask.next({ status: showMask });
  }
}
