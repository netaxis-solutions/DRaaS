import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";

import { request } from "services/api";
import { Country } from "utils/types/publicDataTypes";

class PublicData {
  countries: Array<Country> = [];

  constructor() {
    makeAutoObservable(this, {
      countries: observable.ref,
    });
  }

  getCountriesList = () => {
    request({
      route: `${configStore.config.draasInstance}/public/country_codes`,
      loaderName: "@getCountriesList",
    })
      .then((data: AxiosResponse<{ countryCodes: Array<Country> }>) => {
        const countryCodes = data.data.countryCodes;

        runInAction(() => {
          this.countries = countryCodes;
        });
      })
      .catch(() => {
        this.countries = [];
      });
  };
}

export default new PublicData();
