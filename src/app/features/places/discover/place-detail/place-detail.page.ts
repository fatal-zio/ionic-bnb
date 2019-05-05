import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController
} from '@ionic/angular';
import { CreateBookingComponent } from '../../../../features/bookings/create-booking/create-booking.component';
import { Place } from '../../../../shared/models/place.model';
import { PlaceService } from '../../../../core/services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    this.actionSheetController
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            }
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetElement => {
        actionSheetElement.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode }
      })
      .then(modal => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);

        if (resultData.role === 'confirm') {
          console.log('Booked!');
        }
      });
  }
}
