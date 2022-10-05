import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';

import { MenuMainComponent } from './components/menu-main/menu-main.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MenuMainComponent,
    SideNavComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
  ],
  exports: [
    MenuMainComponent,
    SideNavComponent,
    NotificationsComponent
  ]
})
export class CoreModule { }
