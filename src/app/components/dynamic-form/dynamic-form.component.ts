import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges {

  @Input() formSetup: any;
  @Output() formResult = new EventEmitter<any>();

  userForm!: FormGroup;
  formTitle: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formSetup'] && this.formSetup) {
      this.formTitle = this.formSetup.title || '';//get from title from json
      this.prepareForm(this.formSetup.fields);
    }
  }

  private prepareForm(fields: any[]): void {
    const group: any = {};
    fields.forEach(f => {
      const rules = [];
      if (f.required) rules.push(Validators.required);
      if (f.validation?.pattern) {
        rules.push(Validators.pattern(new RegExp(f.validation.pattern)));
      
      }
      group[f.name] = new FormControl('', rules);
    });
    this.userForm = new FormGroup(group);
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.formResult.emit(this.userForm.value);
  }

  getErrorMsg(field: any): string {
    const control = this.userForm.get(field.name);
    if (control?.valid || !control?.touched) return '';
    if (control.errors?.['required']) return `${field.label} is required`;
    if (control.errors?.['pattern'] && field.validation?.message) return field.validation.message;
    return 'Invalid input';
  }



}
