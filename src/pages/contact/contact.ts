import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//  PROVIDERS
import { WarehouseProvider } from './../../providers/warehouse/warehouse';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items: any;

  constructor(
    public navCtrl: NavController,
    public warehouseProvider: WarehouseProvider
  ) {
    this.items = this.warehouseProvider.getItems().valueChanges();
  }

}
