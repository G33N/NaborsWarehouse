import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
// IONIC PLUGINS
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
// PROVIDERS
import { WarehouseProvider } from '../../providers/warehouse/warehouse';
import { AddItemPage } from '../add-item/add-item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  items = {} as any;
  selectedItem: any;
  result: any;
  itemFound: boolean = false;
  quotes: any;
  comment: string;
  addItemModalInstance: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private socialSharing: SocialSharing,
    private warehouseProvider: WarehouseProvider,
    public modalCtrl: ModalController
  ) {
    this.items = this.warehouseProvider.getItems().valueChanges();
  }

  ionViewDidLoad() {
  }

  async scan() {
    this.selectedItem = {};
    try {
      const options: BarcodeScannerOptions = {
        prompt: 'Point your camera at a barcode',
        torchOn: true
      }
      this.result = await this.barcodeScanner.scan(options).then((barcodeData) => {
        this.warehouseProvider.getWhere('asset', barcodeData.text)
          .subscribe(snapshot => {
          if (snapshot.length == 0) {
            this.selectedItem = {};
            this.itemFound = false;
            this.presentConfirm(barcodeData.text);
          } else {
            this.selectedItem = snapshot[0];
            this.itemFound = true;
          }
        })
      });
    }
    catch (error) {
      this.toast.show(error, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        })
    }
  }

  clear() {
    this.presentConfirm('NBR109734');
  }

  compilemsg(item): string {
    let msg = '';
    msg += `\n ID: ${item.id} \n`;
    msg += `\n Name: ${item.name} \n`;
    msg += `\n Description: ${item.desc} \n`;
    msg += `\n Comment: ${this.comment} \n`;

    return msg += `\n Scanned with Nabors APP developed by Celiz Matias`;
  }

  whatsappShare(selectedItem) {
    var msg = this.compilemsg(selectedItem);
    this.socialSharing.shareViaWhatsApp(msg, null, null);
  }

  presentConfirm(scan) {
    let alert = this.alertCtrl.create({
      title: 'Item not found',
      message: 'Do you want to add this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: () => {
            this.presentAddItemModal(scan);
          }
        }
      ]
    });
    alert.present();
  }

  /* Modal to add a new item */
  presentAddItemModal(scan) {
    // let addItemModal = this.modalCtrl.create(AddItemPage, { scan: scan });
    this.navCtrl.push(AddItemPage, { scan: scan });
    // addItemModal.present();
  }

}