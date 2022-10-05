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
