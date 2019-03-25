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


  constructor(
    public navCtrl: NavController,
    public warehouseProvider: WarehouseProvider
  ) {
    this.getItems();
  }

  // Searchbar this filter the tasks
  searchItems(ev: any) {
    // Reset items back to all of the items
    this.getItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.snapshotToArray(this.items);
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    console.log(this.items);
  }

  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });

    return returnArr;
  };

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
