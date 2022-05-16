import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import Login from "../Login";

import { request } from "services/api";
import { errorNotification } from "utils/functions/notifications";
import {
  DocumentsType,
  PortingRequestPayload,
  PortingRequirements,
  RequestType,
} from "utils/types/numbers";
import TablePagination from "../TablePagination";
import { t } from "services/Translation";

class PortingRequestsStore {
  portingRequests: Array<RequestType> = [];
  currentRequestId: number | null = null;
  currentPortingRequest: { [key: string]: any } = {};
  portingRequirements: PortingRequirements = [];
  defaultOperatorId: number | null = null;
  requiredDocuments: DocumentsType = [];
  currentDocuments: Array<any> = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPortingRequests = async (
    tenantId: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionID}/porting/requests`,
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
    tenantId: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    id: number | string,
  ) => {
    return await request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionID}/porting/requests/${id}`,
      loaderName: "@getExactPortingRequest",
    })
      .then((data: AxiosResponse<any>) => {
        const currentRequest = data.data;

        runInAction(() => {
          this.currentPortingRequest = currentRequest;
          this.currentDocuments = currentRequest.attachments || [];
        });
      })
      .catch(() => {
        this.currentDocuments = [];
      });
  };

  getCurrentRequestDocuments = async (
    tenantId: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    id: number | string,
    finalCallback?: () => void,
  ) => {
    await request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionID}/porting/requests/${id}`,
      loaderName: "@getCurrentRequestDocuments",
    })
      .then((data: AxiosResponse<any>) => {
        const attachments = data.data.attachments;
        runInAction(() => {
          this.currentDocuments = attachments || [];
        });
      })
      .catch(() => {
        runInAction(() => {
          this.currentDocuments = [];
        });
      })
      .finally(() => {
        finalCallback && finalCallback();
      });
  };

  setCurrentRequestId = (requestId: number) => {
    this.currentRequestId = requestId;
  };

  getPortingRequirements = async () => {
    return await request({
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
    tenantId: string = Login.getExactLevelReference("tenant"),
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

  getRequestInfoModalData = async (
    tenantId: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    currentRequestId: string | number,
    successCallback: () => void,
  ) => {
    Promise.all([
      this.getExactPortingRequest(tenantId, subscriptionID, currentRequestId),
      this.getPortingRequirements(),
    ])
      .then(() => {
        runInAction(() => {
          successCallback && successCallback();
        });
      })
      .catch(() => {});
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
    tenantId: string = Login.getExactLevelReference("tenant"),
    subId: string,
    portId: string | number,
    attachmentKey: string,
    attachment: File,
    successCallback?: () => void,
    failCallback?: () => void,
  ) => {
    const file = new FormData();
    file.append("description", attachmentKey);
    file.append("content", attachment);

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
      .then(() => {
        successCallback && successCallback();
      })
      .catch(e => {
        failCallback && failCallback();
        if (e?.response?.status === 413) {
          errorNotification(t("File is too big"));
          return;
        }
        errorNotification(t("An error occured while uploading a file"));
      });
  };

  activatePortRequest = async (
    tenantId: string = Login.getExactLevelReference("tenant"),
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
    tenantId: string = Login.getExactLevelReference("tenant"),
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
    tenantId: string = Login.getExactLevelReference("tenant"),
    subId: string,
    portId: string | number,
    documentId: number,
    successCallback?: () => void,
    failCallback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subId}/porting/requests/${portId}/attachments/${documentId}`,
      loaderName: "@deleteAttachment",
      method: "delete",
    })
      .then(() => {
        successCallback && successCallback();
      })
      .catch(() => {
        failCallback && failCallback();
      });
  };

  clearCurrentRequest = () => {
    this.currentRequestId = null;
    this.currentPortingRequest = {};
    this.portingRequests = [];
    this.portingRequirements = [];
    this.defaultOperatorId = null;
    this.requiredDocuments = [];
    this.currentDocuments = [];
  };
}

export default new PortingRequestsStore();
