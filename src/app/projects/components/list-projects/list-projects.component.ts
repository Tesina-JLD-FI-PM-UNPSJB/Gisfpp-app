import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, StateProject, TypeProject } from '../../model/Project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {
deleteProject() {
throw new Error('Method not implemented.');
}

  projects: Project[] = [];
  openModalDelete: boolean = false;
  selectedProject?: Project;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getAllProjects()
      .subscribe( data => {
          this.projects = data;
      });
  }

  onEdit(project: Project): void { }

  onDelete(project: Project): void {
    this.selectedProject = project;
    this.openModalDelete = true;
  }

  onCreateNewProject(): void {
    this.router.navigate(['/gisfpp/projects/new']);
  }

}
