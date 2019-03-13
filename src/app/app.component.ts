import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {

  public title='Virtualizen';
  public toggled;



  constructor(){
    this.toggled=true;
  }


  toggleTopBar(){
    this.toggled=true;
  }

  toggleSideBar(){
    this.toggled=false;
  }

}

