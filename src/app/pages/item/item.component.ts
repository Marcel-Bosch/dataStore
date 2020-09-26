import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  

  item = new ItemModel();

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id !== 'new'){
      this.itemsService.getItem(id)
      .subscribe((ans:ItemModel)=>{
        this.item = ans;
        this.item.id = id;
      })
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form');

    }
    Swal.fire({
      title: 'Please wait',
      text:'Saving info',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let query: Observable<any>;
    if (this.item.id) {
     query = this.itemsService.updateItem(this.item);
    } else {
     query = this.itemsService.createItem(this.item);
    }

    query.subscribe(ans=>{
      Swal.fire({
        title: this.item.name,
        text: 'Item updated correctly',
        icon: 'success'
      });
    })

  }

}
