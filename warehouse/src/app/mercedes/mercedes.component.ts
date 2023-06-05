import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Mercedes } from './mercedes';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mercedes',
  templateUrl: './mercedes.component.html',
  styleUrls: ['./mercedes.component.css']
})
export class MercedesComponent implements OnInit{
  
  mercedesBenze!: Mercedes[];
  editItem?:Mercedes;
  deleteMercedes!:Mercedes;

   constructor ( private sharedServices: SharedService){}

   ngOnInit(): void {
    this.onGetMercedes()
   }

   onGetMercedes(): void{
     this.sharedServices.getMercedes().subscribe({
     next: (response: Mercedes[]) => {this.mercedesBenze = response;},
     error: (error: HttpErrorResponse) => {alert(error.message)},
     complete: () => console.log('Get transaction completed')
     });
   }

   onAddMercedes(addForm:NgForm): void{
     document.getElementById('add-mercedes')?.click();
     this.sharedServices.createMercedes(addForm.value).subscribe({
     next: (response: Mercedes) => {console.log(response); this.onGetMercedes(); addForm.resetForm()},
     error: (error: HttpErrorResponse) => {alert(error.message); addForm.reset},
     complete: () => console.log('Add transaction completed')
     });
    }

    onUpdateMercedes(mercedes:Mercedes): void{
      this.sharedServices.updateMercedes(mercedes).subscribe({
      next: (response: Mercedes) => {console.log(response); this.onGetMercedes()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Update transaction completed')
      });
    } 

    onDeleteMercedes(mercedesId:number): void{
      this.sharedServices.deleteMercedes(mercedesId).subscribe({
      next: (response: void) => {console.log(response); this.onGetMercedes()},
      error: (error: HttpErrorResponse) => {alert(error.message)},
      complete: () => console.log('Delete transaction completed')
      });
    }  

    public searchMercedes(key: string): void{
      console.log(key);
      const results: Mercedes[] = [];
      for(const mercerdes of this.mercedesBenze){
        if(mercerdes.color.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        mercerdes.model.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        mercerdes.status.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
        mercerdes.year.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
            results.push(mercerdes);
           }
      }
      this.mercedesBenze = results;
      if(results.length === 0 || !key){
        this.onGetMercedes();
      }
    }
      
    public onOpenModal(mercedes:Mercedes, mode: string){
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      
      if(mode === 'add'){
        button.setAttribute('data-target', '#addMercedesModal');
      }
      if(mode === 'edit'){
        this.editItem = mercedes;
        button.setAttribute('data-target', '#updateMercedesModal');
      }
      if(mode === 'delete'){
        this.deleteMercedes = mercedes;
        button.setAttribute('data-target', '#deleteMercedesModal');
      }
      container!.appendChild(button);
      
      button.click();
    }
    
   
}
