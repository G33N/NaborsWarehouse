import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//  PROVIDERS
import { WarehouseProvider } from './../../providers/warehouse/warehouse';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
// PAGES
import { AddItemPage } from './../add-item/add-item';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items: any;
  itemDocument: AngularFirestoreDocument;

  constructor(
    public navCtrl: NavController,
    public warehouseProvider: WarehouseProvider
  ) {
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
    this.navCtrl.push(AddItemPage, { item: this.itemDocument });
  }

}
