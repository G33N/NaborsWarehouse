import { Component } from '@angular/core';
import { NavController, GESTURE_ITEM_SWIPE } from 'ionic-angular';
//  PROVIDERS
import { WarehouseProvider } from './../../providers/warehouse/warehouse';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
// PAGES
import { AddItemPage } from './../add-item/add-item';
// INTERFASES
import { Item } from './../../app/models/item';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items: any;
  itemDocument: AngularFirestoreDocument;
  itemListRef$: Observable<Item[]>
  searchTerm = {} as any;


  constructor(
    public navCtrl: NavController,
    public warehouseProvider: WarehouseProvider
  ) {
    this.getItems();
  }

  getItems() {
    this.items = this.warehouseProvider.getItems().snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getDocument(key) {
    this.itemDocument = this.warehouseProvider.getDocByKey(`${key}`);
    return this.itemDocument;
  }

  deleteDocument(key) {
    this.itemDocument = this.getDocument(key);
    this.itemDocument.delete();
  };

  updateDocument(key) {
    this.itemDocument = this.getDocument(key);
    this.navCtrl.push(AddItemPage, { itemDocument: this.itemDocument });
  }

}
