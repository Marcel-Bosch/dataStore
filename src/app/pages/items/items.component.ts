import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: ItemModel[] = [];
  loading = false;

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.loading=true;
    this.itemsService.getItems()
      .subscribe(ans => {
        this.items = ans;
        this.loading= false;
      });
  }
  deleteItem(item: ItemModel, i: number) {
    Swal.fire({
      title: 'Confirm',
      text: `Do you want to delete ${item.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(ans => {
      if (ans.value) {
        this.items.splice(i, 1)
        this.itemsService.deleteItem(item.id).subscribe();
      }
    })
  }
}
