import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// PAGES
import { HomePage } from './../home/home';
// PROVIDERS
import { WarehouseProvider } from '../../providers/warehouse/warehouse';
// INTERFASES
import { Item } from './../../app/models/item';
// IONIC PLUGINS
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  item = {} as Item;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehouseProvider,
    public toast: Toast
  ) {
    
    this.item.asset = navParams.get('scan');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  addItem() {
    var result = this.warehouseProvider.addItem(this.item);
    if (result) {
      this.toast.show(`The item was added successfully`, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        });
      this.goToHome();
    }
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

}
