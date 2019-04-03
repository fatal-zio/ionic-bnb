import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { CreateBookingComponent } from '../../../../features/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  onBookPlace() {
    // this.navCtrl.navigateBack('/places/tabs/discover');
    this.modalController
      .create({ component: CreateBookingComponent })
      .then(modal => {
        modal.present();
      });
  }
}
