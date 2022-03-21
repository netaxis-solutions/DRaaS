import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import configStore from "../Config";
import { request } from "services/api";

class PortingRequestsStore {
  portingRequests: Array<any> = [];
  currentRequestId: number | null = null;
  currentPortingRequest: any = {};
  portingRequirements: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPortingRequests = async (tenantID: string, subscriptionID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/porting/requests?page_size=100`,
        loaderName: "@getPortingRequests",
      });
      const portingRequests = data.data.requests;

      runInAction(() => {
        this.portingRequests = portingRequests;
      });
    } catch (e) {
      this.portingRequests = [];
    }
  };

  getExactPortingRequest = async (
    tenantID: string,
    subscriptionID: string,
    id: number | string,
  ) => {
    try {
      const data = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/porting/requests/${id}`,
        loaderName: "@getPortingRequests",
      });
      const currentRequest = data.data;
      runInAction(() => {
        this.currentPortingRequest = currentRequest;
      });
    } catch (e) {
      this.currentPortingRequest = {};
    }
  };

  getPortingIdentity = async () => {
    await request({
      route: `${configStore.config.draasInstance}/public/porting_identity_requirements`,
    });
  };

  setCurrentRequestId = (requestId: number) => {
    this.currentRequestId = requestId;
  };

  getPortingRequirements = async () => {
    request({
      route: `${configStore.config.draasInstance}/public/porting/requirements`,
    })
      .then((data: AxiosResponse<any>) => {
        runInAction(() => {
          this.portingRequirements = data.data.countries;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.portingRequirements = [];
        });
      });
  };

  clearCurrentRequest = () => {
    this.currentRequestId = null;
    this.currentPortingRequest = {};
  };
}

export default new PortingRequestsStore();
