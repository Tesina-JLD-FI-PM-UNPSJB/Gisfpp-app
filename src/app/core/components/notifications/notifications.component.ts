import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: []
})
export class NotificationsComponent implements OnInit {

  openNotification = false;
  message = '';
  classTypeAlert = '';
  optAlertIcon = '';

  constructor(private notificationServ: NotificationsService) { }

  ngOnInit(): void {
    this.notificationServ.errorObs.subscribe((message) => {
      this.message = message;
      this.classTypeAlert = 'alert alert-danger';
      this.optAlertIcon = 'error';
      this.openNotification = true;
    });

    this.notificationServ.successObs.subscribe((message) => {
      this.message = message;
      this.classTypeAlert = 'alert alert-success';
      this.optAlertIcon = 'success';
      this.openNotification = true;
    });

    this.notificationServ.warningObs.subscribe((message) => {
      this.message = message;
      this.classTypeAlert = 'alert alert-warning';
      this.optAlertIcon = 'warning';
      this.openNotification = true;
    });

    this.notificationServ.infoObs.subscribe((message) => {
      this.message = message;
      this.classTypeAlert = 'alert alert-info';
      this.optAlertIcon = 'info';
      this.openNotification = true;
    });
  }

  closeNotification(): void {
    this.openNotification = false;
    this.message = '';
    this.classTypeAlert = '';
    this.optAlertIcon = '';
  }

}
