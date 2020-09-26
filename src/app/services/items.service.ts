import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';
import { map } from 'rxjs/Operators';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  private url = 'https://login-app-f9212.firebaseio.com';
  constructor(private http: HttpClient) { }

  createItem(item: ItemModel) {
    return this.http.post(`${this.url}/items.json`, item)
    .pipe(
      map((ans:any)=>{
        item.id=ans.name;
        return item
      })
    )
  }

  updateItem(item:ItemModel){
    const tempItem = {
      ...item
    };
    delete tempItem.id;
    return this.http.put(`${this.url}/items/${item.id}.json`,tempItem);
  }

  deleteItem(id:string){
    return this.http.delete(`${this.url}/items/${id}.json`);
  }
 
  getItem(id:string){
    return this.http.get(`${this.url}/items/${id}.json`);
  }

  getItems(){
    return this.http.get(`${this.url}/items.json`)
    .pipe(
      map(this.createArray)
    )
  }

  createArray(itemsObj:object){

    const items: ItemModel []= [];

    if(itemsObj==null){return [];}

    Object.keys( itemsObj ).forEach(key=>{
      const item: ItemModel = itemsObj[key];
      item.id=key;
      items.push(item);
    })
    
    return items;
  }
}
