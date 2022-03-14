import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import configStore from "../Config";
import { request } from "services/api";

class PortingRequestsStore {
  portingRequests: Array<any> = [];
  currentRequestId: number = 0;
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

  setCurrentRequestId = (requestId: number) => {
    this.currentRequestId = requestId;
  };
}

export default new PortingRequestsStore();
