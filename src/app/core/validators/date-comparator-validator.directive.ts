import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const DateComparatorValidator: ValidatorFn = ( control: AbstractControl ): ValidationErrors | null => {

  const startValueControl = control.get( 'start' )?.value;
  const endValueControl = control.get( 'end' )?.value;

  if ( startValueControl && endValueControl ) {
    let startDate: Date;
    let endDate: Date;
    try {
      startDate = new Date(startValueControl);
      endDate = new Date(endValueControl);
    } catch (error) {
      console.error(`DateComparatorValidator: ${error}`);
      return null;
    }

    if ( startDate.getTime() >= endDate.getTime() ) {
      return { startGreaterThanEnd: true,
        msgDatesComparator: 'La fecha de finalización debe ser posterior a la fecha de inicio'
      };
    }
  }
  return null;
};
