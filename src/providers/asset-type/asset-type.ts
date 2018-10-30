import { Injectable } from '@angular/core';
// FIRESTORE
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/bufferCount"

@Injectable()
export class AssetTypeProvider {
  assetsCollection: AngularFirestoreCollection<any>;
  assets: any;
  assetDocument: AngularFirestoreDocument;
  asset: any;

  constructor(
    public fireStore: AngularFirestore
  ) {
    this.assetsCollection = this.fireStore.collection<any>('assetTypes');
  }


  /* This method returns a Observable, you need use .valueChanges() to display in ngFor */
  getAssetTypes() {
    return this.assetsCollection;
  }

  addAsset(asset) {
    var result: any;
    result = this.assetsCollection.add(asset).then(function () {
      return true;
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        return false;
      });
    return result;
  }

}
