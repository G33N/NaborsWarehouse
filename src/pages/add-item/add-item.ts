import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// PAGES
import { HomePage } from './../home/home';
// PROVIDERS
import { WarehouseProvider } from '../../providers/warehouse/warehouse';
import { AssetTypeProvider } from './../../providers/asset-type/asset-type';

// INTERFASES
import { Item } from './../../app/models/item';
// IONIC PLUGINS
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  item = {} as Item;
  itemDocument: AngularFirestoreDocument;
  categories: any;
  result: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public warehouseProvider: WarehouseProvider,
    public toast: Toast,
    public assetTypeProvider: AssetTypeProvider,
    private barcodeScanner: BarcodeScanner
  ) {
    this.item.assetTag = navParams.get('scan');    

  }

  ionViewDidLoad() {
    // I need wait to the view to insert this.
    this.categories = this.assetTypeProvider.getAssetTypes().snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  addItem() {
    this.item.category 
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
    this.navCtrl.setRoot(HomePage);
  }

  getDocument() {
    this.itemDocument = this.warehouseProvider.getDocByKey('123123');
    return this.itemDocument;
  }

  async scanSerialNumber() {
    try {
      const options: BarcodeScannerOptions = {
        prompt: 'Point your camera at a barcode',
        torchOn: true
      }
      this.result = await this.barcodeScanner.scan(options).then((barcodeData) => {
        this.item.serialNumber = barcodeData.text;
      });
    }
    catch (error) {
      this.toast.show(error, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        })
    }
  }

}
