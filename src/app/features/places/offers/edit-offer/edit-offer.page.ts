import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../../../shared/models/place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../../../../core/services/place.service';
import {
  NavController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss']
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  placeId: string;
  form: FormGroup;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private navController: NavController,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeId = paramMap.get('placeId');
      this.isLoading = true;
      this.placeSub = this.placeService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          place => {
            this.place = place;

            this.form = new FormGroup({
              title: new FormControl(this.place.title, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              description: new FormControl(this.place.description, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
              })
            });

            this.isLoading = false;
          },
          error => {
            this.alertController
              .create({
                header: 'An error occurred!',
                message: 'Place could not be fetched.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/places/tabs/offers']);
                    }
                  }
                ]
              })
              .then(alertElement => {
                alertElement.present();
              });
          }
        );
    });
  }

  onUpdatePlace() {
    if (!this.form.valid) {
      return;
    }

    this.loadingController
      .create({
        message: 'Updating place...'
      })
      .then(loadingElement => {
        loadingElement.present();
        this.placeService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingElement.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/offers']);
          });
      });
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
