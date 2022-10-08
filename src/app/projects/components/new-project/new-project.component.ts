import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeOperation } from 'src/app/core/models/operations-form.enum';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Project } from '../../model/Project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  operation = ModeOperation.NEW;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectSetvice: ProjectService,
              private notificationService: NotificationsService) { }

  ngOnInit(): void {
  }

  onConfirm(project: Project): void {
    this.projectSetvice.saveNewProject(project)
      .subscribe(
        { next: (value) => {
          this.notificationService.pushSuccess('Proyecto Guardado ... OK');
          this.goBack();
        },
        error: error => this.notificationService.pushError(error),}
      );
  }

  onCancel(): void { this.goBack(); }

  private goBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
