import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss']
})
export class LocationPickerComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onPickLocation() {
    this.modalController.create({ component: MapModalComponent }).then(modalElement => {
      modalElement.present();
    });
  }
}
