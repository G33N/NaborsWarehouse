import { Injectable } from '@angular/core';
// FIRESTORE
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/bufferCount"

@Injectable()
export class WarehouseProvider {
  itemsCollection: AngularFirestoreCollection<any>;
  items: any;
  itemDocument: AngularFirestoreDocument;
  item: any;

  constructor(
    public fireStore: AngularFirestore
  ) {
    
  }

  /* This method returns a Observable, you need use .valueChanges() to display in ngFor */
  getItems() {
    this.itemsCollection = this.fireStore.collection<any>('items');
    return this.itemsCollection;
  }

  getWhere(property, value) {
    this.itemsCollection = this.fireStore.collection('items', ref => ref.where(property, '==', value));
    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        //const id = action.payload.doc.id;
        console.log(data);

        return data
      });
    });
    return this.items;
  }

  getDocByKey(key) {
    this.itemDocument = this.fireStore.doc(`items/${key}`);
    return this.itemDocument;
  }

  addItem(item) {
    var result: any;
    result = this.itemsCollection.add(item).then(function () {
      return true;
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        return false;
      });
    return result;
  }

}
