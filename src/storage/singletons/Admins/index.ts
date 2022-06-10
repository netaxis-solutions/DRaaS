import { makeObservable, observable , action, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import Login from "../Login";

import { IAdminsData, IAdminsCreate } from "utils/types/admins";

import { request } from "services/api";
import {
  errorNotification,
} from "utils/functions/notifications";

class AdminsStorage {
  admins: IAdminsData[] = []
  currentEntity: any = []

  constructor() {
    makeObservable(this, {
      admins: observable,
      currentEntity: observable,
      getAdmins: action,
      createAdminsTenantLevel: action,
      createAdminsResellerLevel: action,
      createAdminsDistributorLevel: action,
      clearStorage: action,
    });
  }

  
  getAdmins = () => {
    request({
      route: `${configStore.config.draasInstance}/users`,
      loaderName: "@getAdmins",
    })
      .then(({data: {users}}: AxiosResponse<{users:IAdminsData[]}>) => {
        const admins = users
        runInAction(() => {
            this.admins = admins
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  createAdminsTenantLevel = (payload: IAdminsCreate) => {
    const tenantID = Login.getExactLevelReference("tenant")
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/admins`,
      loaderName: "@createAdminsTenantLevel",
      method: "post",
      payload
    })
    .then(() => {
      
    })
    .catch(e => {
      errorNotification(e);

    });
  };

  createAdminsResellerLevel = ( payload: IAdminsCreate) => {
    const resellerID = Login.getExactLevelReference("reseller")
    request({
      route: `${configStore.config.draasInstance}/resellers/${resellerID}/admins`,
      loaderName: "@createAdminsResellerLevel",
      method: "post",
      payload
    })
    .then(() => {
      
    })
    .catch(e => {
      errorNotification(e);

    });
  };

  createAdminsDistributorLevel = (payload: IAdminsCreate) => {
    const distributorID = Login.getExactLevelReference("distributor")
    request({
      route: `${configStore.config.draasInstance}/distributors/${distributorID}/admins`,
      loaderName: "@createAdminsDistributorLevel",
      method: "post",
      payload
    })
      .then(() => {
      })
      .catch(e => {
        errorNotification(e);

      });
  };

  createAdminsSystemLevel = (payload: IAdminsCreate) => {
    request({
      route: `${configStore.config.draasInstance}/system/admins`,
      loaderName: "@createAdminsSystemLevel",
      method: "post",
      payload
    })
      .then(() => {
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  getCurrentEntity =(currentSelect: string) =>{
    runInAction(()=>{
      this.currentEntity = []
    })
    request({
      route: `${configStore.config.draasInstance}/${currentSelect}s`,
      loaderName: "@getCurrentEntity",
      method: "get",
    })
      .then(({data}: any) => {
        const formatCurrentSelect = `${currentSelect}s`
        const currentData = data[formatCurrentSelect]
        const formattingCurrentData = currentData.map((el:any)=>{return{label:el.name, value:el.uuid}})
        runInAction(()=>{
          this.currentEntity = formattingCurrentData
        })
      })
      .catch(e => {
        errorNotification(e);

      });
  }

  clearStorage =()=>{
    this.admins= []
    this.currentEntity= []
  }

}

export default new AdminsStorage();
