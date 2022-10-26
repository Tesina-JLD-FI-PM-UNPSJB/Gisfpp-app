import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Project, StateProject, TypeProject } from '../../model/Project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit, OnDestroy {

  projects: Project[] = [];
  openModalDelete: boolean = false;
  selectedProject?: Project;
  readonly sizePage = 10;
  totalProjects = 0;
  private loadedPages = 0;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProjects(1);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  fetchProjects(numberPage: number): void {
    this.projectService.getPageProjects(numberPage, this.sizePage)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe( page => {
      this.projects = page.result || [];
      this.totalProjects = page.totalElements || 0;
    });
  }

  deleteProject() {
    throw new Error('Method not implemented.');
  }

  onEdit(project: Project): void { }

  onDelete(project: Project): void {
    this.selectedProject = project;
    this.openModalDelete = true;
  }

  onCreateNewProject(): void {
    this.router.navigate(['/gisfpp/projects/new']);
  }

  onChangedPage(nroPage: number): void {
    if (nroPage > this.loadedPages) {
      this.fetchProjects(nroPage);
    }
  }

}
