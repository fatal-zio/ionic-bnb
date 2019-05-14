import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../core/services/booking.service';
import { Booking } from '../../shared/models/booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // cancel booking here
  }

  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
