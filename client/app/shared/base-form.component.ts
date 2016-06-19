import { ControlGroup } from '@angular/common';

export class BaseFormComponent {
  protected errorMessage: string
  protected serverValidations: Object;

  protected handleError(form: ControlGroup, error: any) {
    if(error.status === 'fail'){
      for (let propertyName of Object.keys(error.data)) {
        let formProperty = form.find(propertyName);
        formProperty.setErrors({'serverValidation': true});
      }
      this.serverValidations = error.data;
    } else {
      this.errorMessage = error.message
    }
  }
}

export interface ValidationResult {
  [key:string]:boolean;
}