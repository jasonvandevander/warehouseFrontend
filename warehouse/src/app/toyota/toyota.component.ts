import { Component, OnInit} from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { toyotaModel } from './toyota';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-toyota',
  templateUrl: './toyota.component.html',
  styleUrls: ['./toyota.component.css']
})
export class ToyotaComponent implements OnInit{
  
  toyotas!: toyotaModel[];
  editItem?:toyotaModel;
  deleteToyota!:toyotaModel;
  total = [];

   constructor ( private sharedServices: SharedService){}

   ngOnInit(): void {
    this.onGetToyota()
   }

   onGetToyota(): void{
     this.sharedServices.getItems().subscribe({
     next: (response: toyotaModel[]) => {this.toyotas = response;},
     error: (error: HttpErrorResponse) => {alert(error.message)},
     complete: () => console.log('Get transaction completed')
     }); 
   }

   onAddToyota(addForm:NgForm): void{
     document.getElementById('add-toyota')?.click();
     this.sharedServices.createItem(addForm.value).subscribe({
     next: (response:toyotaModel) => {console.log(response); this.onGetToyota(); addForm.resetForm()},
     error: (error: HttpErrorResponse) => {alert(error.message); addForm.reset},
     complete: () => console.log('Add transaction completed')
     });
    }

    onUpdateToyota(toyota:toyotaModel): void{
      this.sharedServices.updateItem(toyota).subscribe({
      next: (response: toyotaModel) => {console.log(response); this.onGetToyota()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Update transaction completed')
      });
    } 

    onDeleteToyota(toyotaId:number): void{
      this.sharedServices.deleteItem(toyotaId).subscribe({
      next: (response: void) => {console.log(response); this.onGetToyota()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Delete transaction completed')
      });
    }  

    public searchToyota(key: string): void{
      console.log(key);
      const results: toyotaModel[] = [];
      for(const toyota of this.toyotas){
        if(toyota.color.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        toyota.model.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        toyota.status.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        toyota.year.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
            results.push(toyota);
           }
      }
      this.toyotas = results;
      if(results.length === 0 || !key){
        this.onGetToyota();
      }
    }
      
    public onOpenModal(toyota:toyotaModel, mode: string){
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      
      if(mode === 'add'){
        button.setAttribute('data-target', '#addToyotaModal');
      }
      if(mode === 'edit'){
        this.editItem = toyota;
        button.setAttribute('data-target', '#updateToyotaModal');
      }
      if(mode === 'delete'){
        this.deleteToyota = toyota;
        button.setAttribute('data-target', '#deleteToyotaModal');
      }
      container!.appendChild(button);
      
      button.click();
    }

    
    // calculateTotal():any{
    //   let x =9;
    //   let y = 9;
    //   let m =x*y;
    //   const numberOfItem = this.total.numberOfCars;
    //   const price = this.total.price;
    //   const myTotal = price * numberOfItem;
    //   console.log(m);
    // }
    
}
