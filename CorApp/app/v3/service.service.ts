import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  // private approvalStageMessage = new BehaviorSubject(
  //   'Basic Approval is required!'
  // );
  // currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor() {}

  // updateApprovalMessage(message: string) {
  //   this.approvalStageMessage.next(message);
  // }

  // private
}
