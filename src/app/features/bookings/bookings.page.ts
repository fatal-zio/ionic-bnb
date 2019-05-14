import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingController
      .create({ message: 'Cancelling...' })
      .then(loadingElement => {
        loadingElement.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingElement.dismiss();
        });
      });
  }

  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
