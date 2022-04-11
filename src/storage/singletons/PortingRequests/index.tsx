import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import configStore from "../Config";
import { request } from "services/api";
import { errorNotification } from "utils/functions/notifications";

type PortingRequirements = Array<{
  id: string;
  name: string;
  inputs: Array<{
    section: string;
    parameters: Array<{
      name: string;
      type: string;
      mandatory: boolean;
    }>;
  }>;
  numbering: { startsWith: string; minDigits: number; maxDigits: number };
  documents: Array<{ name: string; allowedFormats: Array<string> }>;
}>;

class PortingRequestsStore {
  portingRequests: Array<any> = [];
  currentRequestId: number | null = null;
  currentPortingRequest: any = {};
  portingRequirements: PortingRequirements = [];
  defaultOperatorId: number | null = null;
  requiredDocuments: Array<any> = [];

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
      loaderName: "@getPortingRequirements",
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

  createPortingRequest = async (
    tenantId: string,
    subId: string,
    payload: any,
  ) => {
    console.log(tenantId, subId, payload);
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests`,
      method: "post",
      payload,
    });
  };

  getDefaultOperatorId = async () => {
    request({
      route: `${configStore.config.draasInstance}/public/porting/operators`,
      loaderName: "@getPortingOperators",
    })
      .then((data: AxiosResponse<any>) => {
        runInAction(() => {
          this.defaultOperatorId =
            data.data.operators.find(
              ({ default: isOperatorDefault }: { default: boolean }) =>
                isOperatorDefault,
            )?.id || 0;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.defaultOperatorId = null;
        });
      });
  };

  getRequiredDocuments = async () => {
    // request({
    //   route: `${configStore.config.draasInstance}/public/porting/documents`,
    //   loaderName: "@getPortingOperators",
    // })
    //   .then((data: AxiosResponse<any>) => {
    //     runInAction(() => {
    //       this.requiredDocuments = data.data.documents;
    //     });
    //   })
    //   .catch(() => {
    //     runInAction(() => {
    //       this.requiredDocuments = [];
    //     });
    //   });

    request({
      route: `${configStore.config.draasInstance}/public/porting/requirements`,
      loaderName: "@getPortingRequirements",
    })
      .then((data: AxiosResponse<any>) => {
        runInAction(() => {
          this.requiredDocuments = data.data.countries[0].documents;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.requiredDocuments = [];
        });
      });
  };

  addAttachment = async (
    tenantId: string,
    subId: string,
    portId: string | number,
    attachment: File,
  ) => {
    const file = new FormData();
    file.append(attachment.name, attachment);

    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests/${portId}/attachments`,
      loaderName: "@addAttachment",
      method: "post",
      payload: file,
      customHeaders: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
      },
    })
      .then((data: AxiosResponse<any>) => {
        runInAction(() => {
          this.requiredDocuments = data.data.documents;
        });
      })
      .catch(e => {
        runInAction(() => {
          errorNotification(e);
        });
      });
  };

  activatePortRequest = async (
    tenantId: string,
    subId: string,
    portId: string | number,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests/${portId}/activate`,
      loaderName: "@activatePortRequest",
      method: "put",
    });
  };

  cancelPortRequest = async (
    tenantId: string,
    subId: string,
    portId: string | number,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests/${portId}/cancel`,
      loaderName: "@cancelPortRequest",
      method: "put",
    });
  };

  clearCurrentRequest = () => {
    this.currentRequestId = null;
    this.currentPortingRequest = {};
  };
}

export default new PortingRequestsStore();
