import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServicesService } from '../groceries.service';
import { InputDialogService } from '../input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  items: { name: string; quantity: number }[] = [];
  errorMessage: string;

  // tslint:disable-next-line: max-line-length
  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: GroceriesServicesService,
    public inputDialogService: InputDialogService,
    public socialSharing: SocialSharing
  ) {
    this.loadItems();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      console.log('loaded 2');
      this.loadItems();
    });
  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems().subscribe(
      (items) => {
        console.log(items);
        this.items = items as any;
      },
      (error) => (this.errorMessage = error as any)
    );
  }

  /*Add a Grocery Item*/
  async addItem() {
    console.log('Adding Item...');
    this.inputDialogService.presentAlert();
  }

  /*Edit Grocery Item*/
  async editItem(n, i) {
    console.log('Edit Item: ', n, i);
    const toast = this.toastCtrl.create({
      message: 'Updating Item: ' + n.itemName,
      duration: 3000,
    });
    (await toast).present();
    this.inputDialogService.presentAlert(n, n._id);
  }

  /*Remove Grocery Item*/
  async removeItem(n, i) {
    console.log('Remove Item: ', n);
    const toast = this.toastCtrl.create({
      message: 'Deleting Item - ' + n.name,
      duration: 3000,
    });
    (await toast).present();
    this.dataService.removeItem(n._id, i);
  }

  /*Share Grocery Item*/
  async shareItem(n, i) {
    console.log('Share: ', n, i);
    const toast = this.toastCtrl.create({
      message: 'Sharing the following item:' + n.itemName + ' ...',
      duration: 3000,
    });
    (await toast).present();

    const message = 'Grocery Item - Name:' + n.itemName + '- Quantity:' + n.qty;
    const subject = 'Sharing via Grocery App';
    this.socialSharing
      .share(message, subject)
      .then(() => {
        console.log('Shared Successfully!');
      })
      .catch((error) => {
        console.error('Error during sharing', error);
      });
  }
}
