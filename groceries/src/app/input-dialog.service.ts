import { Injectable } from '@angular/core';
import { GroceriesServicesService } from './groceries.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class InputDialogService {
  constructor(
    public alertCtrl: AlertController,
    public dataService: GroceriesServicesService
  ) {}

  async presentAlert(item?, itemId?) {
    // tslint:disable-next-line: no-unused-expression
    item ? item._id : undefined;
    {
      const alert = await this.alertCtrl.create({
        header: item ? 'Edit item on the list' : 'Add item to the list',
        message: !itemId?.length
          ? 'Specify item and quantity'
          : 'Edit item and/or quantity',
        inputs: [
          {
            name: 'name',
            placeholder: 'Item Name',
            value: item ? item.name : null,
          },
          {
            name: 'quantity',
            placeholder: 'Quantity',
            value: item ? item.quantity : null,
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: (data) => {
              console.log('Cancel clicked');
            },
          },
          {
            text: !itemId?.length ? 'Save' : 'Edit',
            // tslint:disable-next-line: no-shadowed-variable
            handler: (item) => {
              console.log('Saved clicked:', { item, itemId });
              if (!itemId?.length) {
                this.dataService.addItem(item);
                console.log('input dialog controller, addItem');
              } else {
                console.log('input dialog controller, editItem');
                this.dataService.editItem(item, itemId);
              }
            },
          },
        ],
      });
      alert.present();
    }
  }
}
