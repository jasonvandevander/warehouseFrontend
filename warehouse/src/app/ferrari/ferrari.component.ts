import { Component, OnInit} from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Ferrari } from './ferrari';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-ferrari',
  templateUrl: './ferrari.component.html',
  styleUrls: ['./ferrari.component.css']
})
export class FerrariComponent implements OnInit{

  ferraris!: Ferrari[];
  editItem?:Ferrari;
  deleteFerrari!:Ferrari;

   constructor ( private sharedServices: SharedService){}
   ngOnInit(): void {
    this.onGetFerrari()
   }

   onGetFerrari(): void{
     this.sharedServices.getFerrari().subscribe({
     next: (response: Ferrari[]) => {this.ferraris = response;},
     error: (error: HttpErrorResponse) => {alert(error.message)},
     complete: () => console.log('Get transaction completed')
     });
   }

   onAddFerrari(addForm:NgForm): void{
     document.getElementById('add-ferrari')?.click();
     this.sharedServices.createFerrari(addForm.value).subscribe({
     next: (response: Ferrari) => {console.log(response); this.onGetFerrari(); addForm.resetForm()},
     error: (error: HttpErrorResponse) => {alert(error.message); addForm.reset},
     complete: () => console.log('Add transaction completed')
     });
    }

    onUpdateFerrari(ferrari:Ferrari): void{
      this.sharedServices.updateFerrari(ferrari).subscribe({
      next: (response: Ferrari) => {console.log(response); this.onGetFerrari()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Update transaction completed')
      });
    } 

    onDeleteFerrari(ferrariId:number): void{
      this.sharedServices.deleteFerrari(ferrariId).subscribe({
      next: (response: void) => {console.log(response); this.onGetFerrari()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Delete transaction completed')
      });
    }  

    public searchFerrari(key: string): void{
      console.log(key);
      const results: Ferrari[] = [];
      for(const ferrari of this.ferraris){
        if(ferrari.color.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        ferrari.model.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        ferrari.status.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        ferrari.year.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
            results.push(ferrari);
           }
      }
      this.ferraris = results;
      if(results.length === 0 || !key){
        this.onGetFerrari();
      }
    }
      
    public onOpenModal(ferrari:Ferrari, mode: string){
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      
      if(mode === 'add'){
        button.setAttribute('data-target', '#addFerrariModal');
      }
      if(mode === 'edit'){
        this.editItem = ferrari;
        button.setAttribute('data-target', '#updateFerrariModal');
      }
      if(mode === 'delete'){
        this.deleteFerrari = ferrari;
        button.setAttribute('data-target', '#deleteFerrariModal');
      }
      container!.appendChild(button);
      
      button.click();
    }

  // totalPrice(): number{
  //   let total = 0;
  //   this.ferraris.forEach(item =>{
  //     total = item.numberOfCars * item.price;

  //     const output = document.getElementById('networth');
  //     output!.style.display = 'block';
  //     output!.innerHTML = total;
  //   })
  //   return total;
  // }

}
