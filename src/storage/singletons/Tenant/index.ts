import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import ResellersStore from "../Resellers";
import TenantsStore from "../Tenants";
import DistributorsStore from "../Distributors";

import {
  TAddTenantValues,
  TCreateTenant,
  TEditTenantPayload,
} from "utils/types/tenant";
import { TOwners } from "utils/types/resellers";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import { request } from "services/api";
import { t } from "services/Translation/index";

const translateResellerGroupLabel = t("Reseller");
const translateDistributorGroupLabel = t("Distributor");
const translateDirectCustomerLabel = t("Direct customer");

class TenantStore {
  owners: Array<TOwners> = [];
  constructor() {
    makeAutoObservable(this, {});
  }

  get ownerOptions() {
    return [
      {
        label: translateDirectCustomerLabel.props.str,
        value: "direct customer",
      },
      ...DistributorsStore?.distributors?.map(distributor => ({
        label: distributor.name,
        value: `${distributor.uuid}*distributor`,
        groupBy: translateDistributorGroupLabel,
      })),
      ...ResellersStore?.resellers?.map(reseller => ({
        label: reseller.name,
        value: `${reseller.uuid}*reseller`,
        groupBy: translateResellerGroupLabel,
      })),
    ];
  }

  get tenantOwners() {
    const filteredData = this.owners.reduce(
      (
        owners: Array<{ label: string; value: string }>,
        currentOwner: TOwners,
      ) =>
        currentOwner.name
          ? [...owners, { label: currentOwner.name, value: currentOwner.uuid }]
          : owners,
      [],
    );
    return filteredData;
  }

  createTenant = ({ payload, callback }: TCreateTenant) => {
    request({
      route: `${configStore.config.draasInstance}/tenants`,
      loaderName: "@createTenant",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Tenant was successfully created!"));
        TenantsStore.getTenantsData();
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  getTenantSubscriptions = async ({
    tenantID,
  }: {
    tenantID: string;
  }): Promise<Array<object> | undefined> => {
    try {
      const result: { data: { subscriptions: Array<object> } } = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions`,
      });
      return await result.data.subscriptions;
    } catch (e) {
      errorNotification(e);
    }
  };

  getSpecificTenant = async ({
    tenantID,
  }: {
    tenantID: string;
  }): Promise<TAddTenantValues | undefined> => {
    const result = await request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}`,
      loaderName: "@getSpecificTenant",
    }).catch(e => {
      errorNotification(e);
    });
    return result!.data;
  };

  getListOwnersTenant = async () => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/public/owners?level=tenant`,
        loaderName: "@getListOwners",
      });
      const owners = data.data.owners;
      runInAction(() => {
        this.owners = owners;
      });
    } catch (e) {
      console.error(e);
    }
  };

  editTenant = ({
    payload: { uuid, markup, ...payload },
    callback,
  }: {
    payload: TEditTenantPayload;
    callback?: () => void;
  }) => {
    const formattedPayload = {
      ...payload,
      markup: markup ? Number(markup) : 0,
    };
    request({
      route: `${configStore.config.draasInstance}/tenants/${uuid}`,
      loaderName: "@editTenant",
      method: "put",
      payload: formattedPayload,
    })
      .then(() => {
        successNotification(t("Tenant was successfully edited!"));
        TenantsStore.getTenantsData();
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new TenantStore();
