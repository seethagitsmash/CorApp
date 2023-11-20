import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../api.service';

interface criteriaFormat {
  id: number;
  ref_id: number;
  fuel: string;
  fuel_id: number;
  model: string;
  model_code: string;
  new_gwp: number;
  old_gwp: number;
}
interface modelStrct {
  city: string;
  cityId: string;
  fuelType: string;
  id: number;
  isActive: boolean;
  make: string;
  makeCode: string;
  model: string;
  modelCode: string;
}

@Component({
  selector: 'app-model-selection',
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.scss'],
})
export class ModelSelectionComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.handleUserAuth();
    this.handleSessionReload();
    this.getModel();
  }

  handleUserAuth(): void {
    const decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie != 'true') {
      this.router.navigate(['/']);
    }
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

  checkError(i: number, field: string): boolean {
    const error = this.errorList.filter(
      (e: any) => e.field === field && e.index === i
    );

    if (error.length) {
      return true;
    }
    return false;
  }

  handleSession(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      a.modelList = this.rowLists;
      a.new_car_total = this.new_car_total;
      a.old_car_total = this.old_car_total;
      a.car_total = this.car_total;
      sessionStorage.setItem('cor', JSON.stringify(a));
    }
  }

  handleSessionReload(): void {
    let cor = sessionStorage.getItem('cor');
    if (cor === null) {
      this.router.navigate(['/cor/simulator/selection']);
    } else {
      let a = JSON.parse(cor);
      this.make = a.make;
      this.sessData = a;
      if ('modelList' in a) {
        this.new_car_total = a.new_car_total;
        this.old_car_total = a.old_car_total;
        this.car_total = a.car_total;
        this.rowLists = a.modelList;
      }
    }
  }

  getModel(): void {
    const body = {
      make: this.make,
    };

    this.apiService.getModel(body).subscribe((data: any) => {
      this.modelDieselList = data.fuelModelList.Diesel;
      this.modelPetrolList = data.fuelModelList.Others;
      this.modelElectricList = data.fuelModelList.Others;
      this.modelAllList = [
        ...data.fuelModelList.Diesel,
        ...data.fuelModelList.Others,
      ];
    });
  }

  errorList: any = [];
  new_car_total: number = 0;
  old_car_total: number = 0;
  car_total: number = 0;
  rowLists: criteriaFormat[] = [
    {
      id: 1,
      ref_id: 1,
      fuel: '',
      fuel_id: 0,
      model: '',
      model_code: '',
      new_gwp: 0,
      old_gwp: 0,
    },
  ];
  make: string = '';
  fuelList: any = [
    {
      name: 'Diesel',
      id: 1,
    },
    {
      name: 'Petrol',
      id: 2,
    },
    {
      name: 'Electric',
      id: 3,
    },
  ];
  modelAllList: modelStrct[] = [];
  modelDieselList: modelStrct[] = [];
  modelPetrolList: modelStrct[] = [];
  modelElectricList: modelStrct[] = [];
  isModalVisible = false;
  modalTitle: string = 'Summary of Model wise expected GWP';
  sessData: any = '';
  isLoading: boolean = false;

  handleBackPage(): void {
    this.router.navigate(['/cor/make']);
  }

  handleModalVisible(): void {
    this.isLoading = true;
    console.log(this.rowLists, 'pppppppp');
    this.errorList = [];
    this.new_car_total = 0;
    this.old_car_total = 0;

    // Find empy field to show error
    if (this.handleErrorField()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Fill all the detail inputs!');
      return;
    }

    // Error handler - Duplicate entry
    if (this.checkModelDuplication()) {
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      this.createMessage('error', 'Duplicate entry of model is not allowed!');
      return;
    }

    this.car_total = this.new_car_total + this.old_car_total;
    this.isModalVisible = !this.isModalVisible;
  }

  handleErrorField(): boolean {
    let hasError: boolean = false;
    this.rowLists.map((e, i) => {
      if (e.fuel === '') {
        this.errorList.push({
          index: i,
          field: 'fuel',
        });
        hasError = true;
      }
      if (e.model === '') {
        this.errorList.push({
          index: i,
          field: 'model',
        });
        hasError = true;
      }
      if (+e.new_gwp === 0) {
        this.errorList.push({
          index: i,
          field: 'new',
        });
        hasError = true;
      }
      if (+e.old_gwp === 0) {
        this.errorList.push({
          index: i,
          field: 'old',
        });
        hasError = true;
      }

      // Find and map model name from model id
      const findModel = this.modelAllList.find(
        (el: any) => el.model === e.model
      );
      if (findModel) this.rowLists[i].model_code = findModel.modelCode;

      // Find and map fuel name from fuel id
      const findFuel = this.fuelList.find((el: any) => el.name === e.fuel);
      if (findFuel) this.rowLists[i].fuel_id = findFuel.id;

      this.new_car_total = this.new_car_total + +e.new_gwp;
      this.old_car_total = this.old_car_total + +e.old_gwp;
    });

    return hasError;
  }

  checkModelDuplication(): boolean {
    let hasError: any = [];
    var valueArr = this.rowLists.map(function (item, i) {
      hasError.push({
        index: i,
        field: 'model',
      });
      return item.model;
    });
    var isDuplicate = valueArr.some(function (item, idx) {
      if (valueArr.indexOf(item) != idx) {
        hasError.push({
          index: idx,
          field: 'model',
        });
        return true;
      }

      return false;
    });

    if (isDuplicate) this.errorList.push(...hasError);

    return isDuplicate;
  }

  handleRemoveRow(i: number): void {
    var rowListsReplica = this.rowLists;
    rowListsReplica.splice(i, 1);
    this.rowLists = rowListsReplica;
  }

  handleAddRow(ref_id: number): void {
    const duplicateObject = {
      id: this.rowLists.length + 1,
      ref_id: ref_id + 1,
      fuel: '',
      fuel_id: 0,
      model: '',
      model_code: '',
      new_gwp: 0,
      old_gwp: 0,
    };

    this.rowLists.push(duplicateObject);
  }

  handleResetModelInput(i: number): void {
    this.rowLists[i].model = '';
  }

  handleSaveModel(): void {
    this.handleSession();

    let body = {
      city: this.sessData.city,
      city_Code: this.sessData.cityCode,
      id: 0,
      make: this.sessData.make,
      state: this.sessData.state,
      total_New_Car_GWP: this.sessData.new_car_total,
      total_Old_Car_GWP: this.sessData.old_car_total,
      tranId: this.sessData.tranId,
      userName: sessionStorage.getItem('user'),
      gwpSummaryDtls: [{}],
    };

    let diesel_total = 0;
    let petrol_total = 0;
    let electric_total = 0;
    let old_diesel_total = 0;
    let old_petrol_total = 0;
    let old_electric_total = 0;

    this.rowLists.map((e: any) => {
      let a = {
        // city: 'string',
        // city_Code: 'string',
        // createdBy: 'string',
        // createdDate: '2023-11-06T07:23:24.158Z',
        fuelType: e.fuel,
        gwp_New_Car: e.new_gwp,
        gwp_Old_Car: e.old_gwp,
        // id: 0,
        // make: e.make,
        model: e.model,
        // state: e.state,
        // summaryModel_Gwp_Id: 0,
        // tranId: e.,
      };

      if (e.fuel === 'Diesel') {
        diesel_total += +e.new_gwp;
        old_diesel_total += +e.old_gwp;
      }
      if (e.fuel === 'Petrol') {
        petrol_total += +e.new_gwp;
        old_petrol_total += +e.old_gwp;
      }
      if (e.fuel === 'Electric') {
        electric_total += +e.new_gwp;
        old_electric_total += +e.old_gwp;
      }

      body.gwpSummaryDtls.push(a);
    });

    body.gwpSummaryDtls.splice(0, 1);

    this.apiService.saveUpdateModelWiseGwp(body).subscribe(
      (response: any) => {
        if (response.errMsg === null) {
          let cor = sessionStorage.getItem('cor');
          if (cor === null) {
            this.router.navigate(['/cor/simulator/selection']);
          } else {
            let a = JSON.parse(cor);
            a.tranId = response.tranId;

            a.diesel_total = diesel_total;
            a.old_diesel_total = old_diesel_total;
            a.petrol_total = petrol_total;
            a.old_petrol_total = old_petrol_total;
            a.electric_total = electric_total;
            a.old_electric_total = old_electric_total;

            sessionStorage.setItem('cor', JSON.stringify(a));
            this.router.navigate(['/cor/btype']);
          }
        } else {
          setTimeout(() => {
            this.isLoading = false;
          }, 3000);
          this.createMessage('error', response.errMsg);
        }
      },
      (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
        this.createMessage('error', 'Server Error... Please try again!');
      }
    );
  }

  handleLogout(): void {
    this.router.navigate(['/']);
  }
}
