import { Component, OnInit} from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Honda } from './honda';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-honda',
  templateUrl: './honda.component.html',
  styleUrls: ['./honda.component.css']
})
export class HondaComponent implements OnInit{
  hondas!:Honda[];
  editItem?:Honda;
  deleteHonda!: Honda;

  constructor(private sharedServices: SharedService){}
  
  ngOnInit(): void{
      this.onGetHonda();
  }
  onGetHonda(): void{
    this.sharedServices.getHonda().subscribe({
    next: (response: Honda[]) => {this.hondas = response;},
    error: (error: HttpErrorResponse) => {alert(error.message)},
    complete: () => console.log('Get transaction completed')
    });
  }

  onAddHonda(addForm:NgForm): void{
    document.getElementById('add-honda')?.click();
    this.sharedServices.createHonda(addForm.value).subscribe({
    next: (response: Honda) => {console.log(response); this.onGetHonda(); addForm.resetForm()},
    error: (error: HttpErrorResponse) => {alert(error.message); addForm.reset()},
    complete: () => console.log('Add transaction completed')
    });
   }

   onUpdateHonda(honda:Honda): void{
     this.sharedServices.updateHonda(honda).subscribe({
     next: (response: Honda) => {console.log(response); this.onGetHonda()},
     error: (error: HttpErrorResponse) => {alert(error.message)},
     complete: () => console.log('Update transaction completed')
     });
   } 

   onDeleteHonda(hondaId:number): void{
     this.sharedServices.deleteHonda(hondaId).subscribe({
     next: (response: void) => {console.log(response); this.onGetHonda()},
     error: (error: HttpErrorResponse) => {alert(error.message)},
     complete: () => console.log('Delete transaction completed')
     });
   }  

   public searchHonda(key: string): void{
     console.log(key);
     const results: Honda[] = [];
     for(const honda of this.hondas){
       if(honda.color.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
       honda.model.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
       honda.status.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 ||
       honda.year.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
           results.push(honda);
          }
     }
     this.hondas = results;
     if(results.length === 0 || !key){
       this.onGetHonda();
     }
   }
     
   public onOpenModal(honda:Honda, mode: string){
     const container = document.getElementById('main-container');
     const button = document.createElement('button');
     button.type = 'button';
     button.style.display = 'none';
     button.setAttribute('data-toggle', 'modal');
     
     if(mode === 'add'){
       button.setAttribute('data-target', '#addHondaModal');
     }
     if(mode === 'edit'){
       this.editItem = honda;
       button.setAttribute('data-target', '#updateHondaModal');
     }
     if(mode === 'delete'){
       this.deleteHonda = honda;
       button.setAttribute('data-target', '#deleteHondaModal');
     }
     container!.appendChild(button);
     
     button.click();
   }
  
}

