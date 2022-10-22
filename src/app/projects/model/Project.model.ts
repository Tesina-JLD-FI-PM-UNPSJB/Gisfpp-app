export enum TypeProject {
  INTERNAL,
  ENTERPRISE,
  RESEARCH,
  EXTENSION
}

export enum StateProject {
  GENERATED,
  ACTIVE,
  SUSPENDED,
  CANCELLED,
}

export interface ProjectDTO {
  id?: number;
  code?: string;
  resolutionNumber?: string;
  title?: string;
  description?: string;
  type?: TypeProject;
  state?: StateProject;
  start?: Date;
  end?: Date;
  detail?: string;
}

export class Project {
  public id?: number;
  public code?: string;
  public resolutionNumber?: string;
  public title?: string;
  public description?: string;
  public type?: TypeProject;
  public state?: StateProject;
  public start?: Date;
  public end?: Date;
  public detail?: string;

  constructor() { }

  getData(): ProjectDTO {
    return { ...this } as ProjectDTO;
  }

  public setData(data: ProjectDTO): void {
    this.id = data.id;
    this.code = data.code;
    this.resolutionNumber = data.resolutionNumber;
    this.title = data.title;
    this.description = data.description;
    this.type = data.type;
    this.state = data.state;
    this.start = data.start;
    this.end = data.end;
    this.detail = data.detail;
  }

  public getTitleType(): string {
    if(this.type == undefined || this.type == null) return 'Indeterminado';

    switch (this.type) {
      case 0:
        return 'Interno';
      case 1:
        return 'Empresa';
      case 2:
        return 'Investigación';
      case 3:
        return 'Extensión';
      default:
        return 'Indeterminado';
    }
  }

  public getTitleState(): string {
    if(this.state == undefined || this.state == null) return 'Indeterminado';

    switch (this.state) {
      case 0:
        return 'Generado';
      case 1:
        return 'Activo';
      case 2:
        return 'Suspendido';
      case 3:
        return 'Cancelado';
      default:
        return 'Indeterminado';
    };

  }


}
