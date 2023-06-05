import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable} from 'rxjs'
import { toyotaModel } from './toyota/toyota';
import { Porsche } from './porsche/porsche';
import { Mercedes } from './mercedes/mercedes';
import { Honda } from './honda/honda';
import { Ferrari } from './ferrari/ferrari';
import { Dodge } from './dodge/dodge';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiServerUrl = "http://localhost:5000";

  constructor(private http: HttpClient) { } 


  getItems(): Observable<toyotaModel[]>{
    return this.http.get<toyotaModel[]>(`${this.apiServerUrl}/toyota/all`)
  }

  createItem(toyota:toyotaModel):Observable<toyotaModel>{
    return this.http.post<toyotaModel>(`${this.apiServerUrl}/toyota/add`, toyota)
  }

  updateItem(toyota:toyotaModel):Observable<toyotaModel>{
    return this.http.put<toyotaModel>(`${this.apiServerUrl}/toyota/update`, toyota)
  }

  deleteItem(toyotaId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/toyota/delete/${toyotaId}`)
  }

  //Porsche Functions
  getPorsche():Observable<Porsche[]>{
     return this.http.get<Porsche[]>(`${this.apiServerUrl}/porsche/all`);
  }

  createPorsche(porsche:Porsche):Observable<Porsche>{
    return this.http.post<Porsche>(`${this.apiServerUrl}/porsche/add`, porsche);
  }

  updatePorsche(porsche:Porsche):Observable<Porsche>{
    return this.http.put<Porsche>(`${this.apiServerUrl}/porsche/update`, porsche);
  }

  deletePorsche(porscheId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/porsche/delete/${porscheId}`);
  }

  //Mercedes Functions
  getMercedes():Observable<Mercedes[]>{
    return this.http.get<Mercedes[]>(`${this.apiServerUrl}/mercedes/all`);
 }

 createMercedes(mercedes:Mercedes):Observable<Mercedes>{
   return this.http.post<Mercedes>(`${this.apiServerUrl}/mercedes/add`, mercedes);
 }

 updateMercedes(mercedes:Mercedes):Observable<Mercedes>{
   return this.http.put<Mercedes>(`${this.apiServerUrl}/mercedes/update/`, mercedes);
 }

 deleteMercedes(mercedesId:number):Observable<void>{
   return this.http.delete<void>(`${this.apiServerUrl}/mercedes/delete/${mercedesId}`);
 }


 //Honda Functions
 getHonda():Observable<Honda[]>{
  return this.http.get<Honda[]>(`${this.apiServerUrl}/honda/all`);
}

createHonda(honda:Honda):Observable<Honda>{
 return this.http.post<Honda>(`${this.apiServerUrl}/honda/add/`, honda);
}

updateHonda(honda:Honda):Observable<Honda>{
 return this.http.put<Honda>(`${this.apiServerUrl}/honda/update/`, honda);
}

deleteHonda(hondaId:number):Observable<void>{
 return this.http.delete<void>(`${this.apiServerUrl}/honda/delete/${hondaId}`);
}


//Ferrari Functions
getFerrari():Observable<Ferrari[]>{
  return this.http.get<Ferrari[]>(`${this.apiServerUrl}/ferrari/all`);
}

createFerrari(ferrari:Ferrari):Observable<Ferrari>{
 return this.http.post<Ferrari>(`${this.apiServerUrl}/ferrari/add/`, ferrari);
}

updateFerrari(ferrari:Ferrari):Observable<Ferrari>{
 return this.http.put<Ferrari>(`${this.apiServerUrl}/ferrari/update/`, ferrari);
}

deleteFerrari(ferrariId:number):Observable<void>{
 return this.http.delete<void>(`${this.apiServerUrl}/ferrari/delete/${ferrariId}`);
}


//Dodge Functions
getDodge():Observable<Dodge[]>{
  return this.http.get<Dodge[]>(`${this.apiServerUrl}/dodge/all`);
}

createDodge(dodge:Dodge):Observable<Dodge>{
 return this.http.post<Dodge>(`${this.apiServerUrl}/dodge/add`, dodge);
}

updateDodge(dodge:Dodge):Observable<Dodge>{
 return this.http.put<Dodge>(`${this.apiServerUrl}/dodge/update/`, dodge);
}

deleteDodge(dodgeId:number):Observable<void>{
 return this.http.delete<void>(`${this.apiServerUrl}/dodge/delete/${dodgeId}`);
}
  
}
