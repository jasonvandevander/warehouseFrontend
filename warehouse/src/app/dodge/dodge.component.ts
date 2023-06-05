import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Dodge } from './dodge';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dodge',
  templateUrl: './dodge.component.html',
  styleUrls: ['./dodge.component.css']
})
export class DodgeComponent implements OnInit{

  dodges!: Dodge[];
  editItem?:Dodge;
  deleteDodge!:Dodge;

   constructor ( private sharedServices: SharedService){}

   ngOnInit(): void {
    this.onGetDodge()
   }

   onGetDodge(): void{
     this.sharedServices.getDodge().subscribe({
     next: (response: Dodge[]) => {this.dodges = response;},
     error: (error: HttpErrorResponse) => {alert(error.message)},
     complete: () => console.log('Get transaction completed')
     });
   }

   onAddDodge(addForm:NgForm): void{
     document.getElementById('add-dodge')?.click();
     this.sharedServices.createDodge(addForm.value).subscribe({
     next: (response: Dodge) => {console.log(response); this.onGetDodge(); addForm.resetForm()},
     error: (error: HttpErrorResponse) => {alert(error.message); addForm.reset},
     complete: () => console.log('Add transaction completed')
     });
    }

    onUpdateDodge(dodge:Dodge): void{
      this.sharedServices.updateDodge(dodge).subscribe({
      next: (response: Dodge) => {console.log(response); this.onGetDodge()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Update transaction completed')
      });
    } 

    onDeleteDodge(dodgeId:number): void{
      this.sharedServices.deleteDodge(dodgeId).subscribe({
      next: (response: void) => {console.log(response); this.onGetDodge()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Delete transaction completed')
      });
    }  

    public searchDodge(key: string): void{
      console.log(key);
      const results: Dodge[] = [];
      for(const dodge of this.dodges){
        if(dodge.color.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        dodge.model.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        dodge.status.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        dodge.year.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
            results.push(dodge);
           }
      }
      this.dodges = results;
      if(results.length === 0 || !key){
        this.onGetDodge();
      }
    }
      
    public onOpenModal(dodge:Dodge, mode: string){
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      
      if(mode === 'add'){
        button.setAttribute('data-target', '#addDodgeModal');
      }
      if(mode === 'edit'){
        this.editItem = dodge;
        button.setAttribute('data-target', '#updateDodgeModal');
      }
      if(mode === 'delete'){
        this.deleteDodge = dodge;
        button.setAttribute('data-target', '#deleteDodgeModal');
      }
      container!.appendChild(button);
      
      button.click();
    }
    
   
}
