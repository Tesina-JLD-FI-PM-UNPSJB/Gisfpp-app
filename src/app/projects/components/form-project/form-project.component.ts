import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModeOperation } from 'src/app/core/models/operations-form.enum';
import { DateComparatorValidator } from 'src/app/core/validators/date-comparator-validator.directive';
import { Project } from '../../model/Project.model';

interface MessagesFormControlError {
  required?  : string,
  minlength?  : string,
  maxlength? : string
}

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {

  @Input() project?: Project;
  @Input() titleForm?: string;
  @Input() operation: ModeOperation = ModeOperation.VIEW;

  @Output() onConfirm = new EventEmitter<Project>();
  @Output() onCancel = new EventEmitter();

  thisForm!: FormGroup;
  btnConfirmDisabled: boolean = false;

  startDate : Date | null = null;
  endDate   : Date | null = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.configForm();
  }

  private buildForm(): void {
    this.thisForm = this.formBuilder.group({
      id: [''],
      code:[''],
      resolutionNumber:[''],
      title:['', [Validators.required, Validators.maxLength(80)]],
      description:[''],
      type:['0'],
      state:['0'],
      start:[null, [Validators.required]],
      end: [null, [Validators.required]],
      detail: [''],
    },
    { validators: [DateComparatorValidator] });

    this.thisForm.get('id')?.disable();
  }

  private configForm(): void {
    if (this.operation === ModeOperation.NEW) {
      this.project = new Project();
      this.thisForm.get('state')?.disable();
    } else if (this.operation === ModeOperation.EDIT) {
      this.thisForm.patchValue(this.project || {});
    } else {
      this.thisForm.disable();
      this.btnConfirmDisabled = true;
    }
  }

  dispatchOnConfirm(): void {
    this.thisForm.disable();
    this.fillProject(this.project)
    this.onConfirm.emit(this.project);
  }

  dispatchOnCancel(): void {
    this.onCancel.emit();
  }

  private fillProject(item?: Project): void {
    let { code, resolutionNumber, title,
      description, type, state, detail } = this.thisForm.value;

    if ( item != undefined && item != null ) {
      item.id = item.id;
      item.code = code;
      item.resolutionNumber = resolutionNumber;
      item.title = title;
      item.description = description;
      item.type = Number.parseInt( type );
      item.state = Number.parseInt( state );
      item.start = this.startDate ? this.startDate: new Date();
      item.end = this.endDate ? this.endDate: new Date();
      item.detail = detail;
    }
  }

  getMsgTitleInvalid() {
    let msgs: MessagesFormControlError = {
      required: 'El título del proyecto es requerido',
      maxlength: 'El título del proyecto no debe superar los 80 caracteres' };

    return this.getMsgControlFormInvalid('title', msgs);
  }

  getMsgDateStartInvalid(): string {
    let msgs: MessagesFormControlError = { required: 'Debe especificar la fecha de inicio del proyecto'};

    return this.getMsgControlFormInvalid('start', msgs);
  }

  getMsgDateEndInvalid(): string {
    let msgs: MessagesFormControlError = { required: 'Debe especificar la fecha de finalización del proyecto'};

    return this.getMsgControlFormInvalid('end', msgs);
  }

  private getMsgControlFormInvalid(name: string, msgs: MessagesFormControlError): string {
    const control = this.thisForm.get(name);

    if (control) {
      return control.hasError('required')
        ? msgs.required || ''
        : control.hasError('minlength')
        ? msgs.minlength || ''
        : control.hasError('maxlength')
        ? msgs.maxlength || ''
        : '';
    }
    return '';
  }

  isBtnConfirmDisabled(): boolean {
    return this.thisForm.invalid || this.btnConfirmDisabled;
  }

}
