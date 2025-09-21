import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

public _message:string='';
public _color:string='';

   @Input()
  set message(value: any) {
    this._message = value;
  }

  get message(): any {
    return this._message;
  }

   @Input()
  set color(value: any) {
    this._color = value;
  }

  get color(): any {
    return this._color;
  }

  getBackgroundColor(){
    return this._color;
  }
}
