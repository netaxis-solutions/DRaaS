import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import { request } from "services/api";
import { errorNotification } from "utils/functions/notifications";
import {
  DocumentsType,
  PortingRequestPayload,
  PortingRequirements,
  RequestType,
} from "utils/types/numbers";
import TablePagination from "../TablePagination";

class PortingRequestsStore {
  portingRequests: Array<RequestType> = [];
  currentRequestId: number | null = null;
  currentPortingRequest: { [key: string]: any } = {};
  portingRequirements: PortingRequirements = [];
  defaultOperatorId: number | null = null;
  requiredDocuments: DocumentsType = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPortingRequests = async (tenantID: string, subscriptionID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/porting/requests`,
        loaderName: "@getPortingRequests",
        payload: {
          params: {
            page: TablePagination.tablePageCounter,
            page_size: TablePagination.tablePageSize,
            search: TablePagination.search,
          },
        },
      });
      const portingRequests = data.data.requests;

      runInAction(() => {
        this.portingRequests = portingRequests;
        TablePagination.getTableConfig(data.data);
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
        loaderName: "@getExactPortingRequest",
      });
      const currentRequest = data.data;
      runInAction(() => {
        this.currentPortingRequest = currentRequest;
      });
    } catch (e) {
      this.currentPortingRequest = {};
    }
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
          this.requiredDocuments = data.data.countries[0].documents;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.portingRequirements = [];
          this.requiredDocuments = [];
        });
      });
  };

  createPortingRequest = async (
    tenantId: string,
    subId: string,
    payload: PortingRequestPayload,
    successCallback?: (data: { id: number; portId: string }) => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests`,
      method: "post",
      payload,
    }).then(data => {
      successCallback && successCallback(data.data);
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

  addAttachment = async (
    tenantId: string,
    subId: string,
    portId: string | number,
    attachmentKey: string,
    attachment: File,
    successCallback?: () => void,
    failCallback?: () => void,
  ) => {
    const file = new FormData();
    file.append(attachmentKey, attachment);

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
        successCallback && successCallback();
      })
      .catch(e => {
        runInAction(() => {
          errorNotification(e);
        });
        failCallback && failCallback();
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

  deleteAttachment = async (
    tenantId: string,
    subId: string,
    portId: string | number,
    documentId: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests/${portId}/attachments/${documentId}`,
      loaderName: "@deleteAttachment",
      method: "delete",
    });
  };

  clearCurrentRequest = () => {
    this.currentRequestId = null;
    this.currentPortingRequest = {};
  };
}

export default new PortingRequestsStore();
