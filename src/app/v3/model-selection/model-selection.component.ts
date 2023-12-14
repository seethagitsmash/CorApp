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
      // fuelList

      const a = Object.keys(data.fuelModelList);

      a.map((e: any) => {
        if (data.fuelModelList[e].length) {
          this.fuelList.push({
            name: e,
            id: this.fuelList.length + 1,
          });
        }
      });

      this.modelDieselList = data.fuelModelList.Diesel;
      this.modelPetrolList = data.fuelModelList.Petrol;
      this.modelElectricList = data.fuelModelList.Electric;
      this.modelInbuiltList = data.fuelModelList.Inbuilt;
      const allModel = [
        ...data.fuelModelList.Diesel,
        ...data.fuelModelList.Petrol,
        ...data.fuelModelList.Electric,
        ...data.fuelModelList.Inbuilt,
      ];
      this.modelAllList = allModel;

      this.handleMakeChange(allModel);
    });
  }

  // After user save this record - Gone back - change make - comes back - reset the model and all selection
  handleMakeChange(allModel: any): void {
    const isPreviousModelExits = allModel.find(
      (e: any) => e.model === this.rowLists[0].model
    );

    if (isPreviousModelExits === undefined) {
      this.rowLists = [
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
    }
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
  fuelList: any = [];
  modelAllList: modelStrct[] = [];
  modelDieselList: modelStrct[] = [];
  modelPetrolList: modelStrct[] = [];
  modelElectricList: modelStrct[] = [];
  modelInbuiltList: modelStrct[] = [];
  isModalVisible = false;
  modalTitle: string = 'Summary of Model wise expected GWP';
  sessData: any = '';
  isLoading: boolean = false;

  handleBackPage(): void {
    this.router.navigate(['/cor/make']);
  }

  handleModalVisible(): void {
    this.isLoading = true;
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

    this.isLoading = false;
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
      if (+e.new_gwp === 0 && +e.old_gwp === 0) {
        this.errorList.push({
          index: i,
          field: 'new',
        });
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
      return item.fuel + item.model;
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
    const user = sessionStorage.getItem('user');

    let body = {
      city: this.sessData.city,
      city_Code: this.sessData.cityCode,
      id: 0,
      make: this.sessData.make,
      state: this.sessData.state,
      total_New_Car_GWP: this.new_car_total,
      total_Old_Car_GWP: this.old_car_total,
      tranId: this.sessData.tranId ? this.sessData.tranId : 0,
      userName: user,
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
        // city: this.sessData.city,
        // city_Code: this.sessData.cityCode,
        // createdBy: user,
        // createdDate: new Date(),
        fuelType: e.fuel,
        gwp_New_Car: e.new_gwp !== null ? e.new_gwp : 0,
        gwp_Old_Car: e.old_gwp !== null ? e.old_gwp : 0,
        // id: 0,
        // make: this.sessData.make,
        model: e.model,
        // state: this.sessData.state,
        // summaryModel_Gwp_Id: 0,
        // tranId: this.sessData.tranId ? this.sessData.tranId : 0,
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
