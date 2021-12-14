import { makeAutoObservable, observable } from "mobx";

import { TSteps } from "utils/types/modal";

class MultiStepForm {
  values: object = {};
  activeStep: number = 0;
  steps: TSteps = [];

  get stepContent() {
    return this.steps[this.activeStep]?.component;
  }

  constructor() {
    makeAutoObservable(this, {
      values: observable.ref,
      steps: observable.ref,
      activeStep: observable,
    });
  }

  goNext = () => {
    this.activeStep =
      this.activeStep === this.steps.length ? 0 : this.activeStep + 1;
  };

  goBack = (handleCancel: () => void) => {
    this.activeStep ? (this.activeStep = this.activeStep - 1) : handleCancel();
  };

  setValues = (newValues: object) => {
    this.values = { ...this.values, ...newValues };
  };

  setSteps = (steps: TSteps) => {
    this.steps = steps;
  };
}

export default new MultiStepForm();
