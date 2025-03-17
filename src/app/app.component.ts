import { Component, ElementRef, inject, ViewChild, } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IAPIResponse, User } from './model/model';
import { FormsModule } from '@angular/forms';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'events-app';

  @ViewChild('model') model: ElementRef|undefined;
  eventService = inject(EventService)
  isLoginForm: boolean = false;

  loginObj: any = {
      "Password": "",
      "ContactNo": ""
    }
  
  constructor(){
    const loggedData = localStorage.getItem('eventUser');
    if(loggedData != null){
      this.userObj = JSON.parse(loggedData)
    }
  }

  userObj: User = new User();

  openPopup(){
    if(this.model){
      this.model.nativeElement.style.display = 'block';
    }
  }

  closePopup(){
    if(this.model){
      this.model.nativeElement.style.display = 'none';
    }
  }
  onRegister(){
    this.eventService.registerUser(this.userObj).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('Registration Success')
        this.closePopup()
      } else{
        alert(res.message)
      }
    })
  }
  onLogin(){
    this.eventService.loginUser(this.loginObj).subscribe((res:IAPIResponse)=>{
      if(res.result){
        alert('Login Success')
        localStorage.setItem('eventUser', JSON.stringify(res.data));
        this.userObj = res.data;
        this.closePopup()
      } else{
        alert(res.message)
      }
    })
  }
  logoff(){
    localStorage.removeItem('eventUser');
    this.userObj= new User();
  }
}
