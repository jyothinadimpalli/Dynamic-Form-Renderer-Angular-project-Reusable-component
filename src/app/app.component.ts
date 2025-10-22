import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formSchema: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/schemas/user-registration.json').subscribe((res)=>{this.formSchema=res}, (err) => console.error('Error loading schema', err));
  }

  handleFormSubmit(values: any) {
    console.log('Form Submitted:', values);
    alert('Form submitted!\n\n' + JSON.stringify(values, null, 2));
  }
}
