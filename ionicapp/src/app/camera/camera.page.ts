import { Component, OnInit } from '@angular/core';
import { Image } from '../models/image.model';
import { PhotosService } from '../services/photos.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  photos: string[] = [];
  images: Image[] | undefined;

  urlBase: string;

  constructor(
    private photo_service: PhotosService,
    private user_service: UserService
  ) {
    
    this.photos = this.photo_service.photos;
    this.urlBase = this.user_service.apiUrl;

   }
  
  ngOnInit() {

  }

  loadImages() {
    this.user_service.getImages().subscribe(
      (images: Image[]) => {
        this.images = images;
        console.log(this.images)
      }
    )
  }

  ionViewWillEnter() {
    this.loadImages();
  }

  watchChange(event) {
    // console.log(<File>event.target.files[0]);
    
  }

  changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      );
    }
  
    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    );
  }

  
  formatDateNow() {
    
    let dateNow = this.changeTimeZone(new Date(), 'America/La_Paz');
    let date = dateNow.toLocaleDateString().split('/')
    let auxDate = date[2] + '-' + date[1] + '-' + date[0];
    let hour = dateNow.toLocaleTimeString();

    let concat = auxDate + ' ' + hour;

     return concat;
  }

  async takePhoto() {
    let blobImage = await this.photo_service.addNewPhoto() as Blob;

    
    console.log(blobImage);
    console.log(this.formatDateNow());
    

    const formData =  new FormData();
    formData.append("image", blobImage, "image.png");
    formData.append("createDate", this.formatDateNow());

    this.user_service.uploadIMage(formData).subscribe(
      (status) => {
        console.log(status);
        this.loadImages();
      }
    );

    // console.log(formData);
    // console.log(JSON.stringify(formData));
    
    // formData.forEach((value,key) => {
    //   console.log(key+" "+value)
    // });

    // formData.append('image', blobImage, "adad");

    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    // console.log(formData);

    // console.log(formData);
    // console.log(await blobImage);
  }

  // kola() {
  //   let form = new FormData();
  //   form.append("name", "adad");
  //   form.append('labelName', 'test');
  //   form.append('formPart', 'test');
    
  //   console.log(JSON.stringify(form));
  //   form.forEach((value,key) => {
  //     console.log(key+" "+value)
  //   });
  // }

}
