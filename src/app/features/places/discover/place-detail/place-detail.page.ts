import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController
} from '@ionic/angular';
import { CreateBookingComponent } from '../../../../features/bookings/create-booking/create-booking.component';
import { Place } from '../../../../shared/models/place.model';
import { PlaceService } from '../../../../core/services/place.service';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/core/services/booking.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placesSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private actionSheetController: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.placesSub = this.placeService
        .getPlace(paramMap.get('placeId'))
        .subscribe(place => {
          this.place = place;
        });
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
        if (resultData.role === 'confirm') {
          this.loadingController
            .create({ message: 'Booking place...' })
            .then(loadingElement => {
              loadingElement.present();

              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingElement.dismiss();
                });
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
