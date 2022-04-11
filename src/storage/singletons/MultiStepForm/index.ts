import { makeAutoObservable, observable, runInAction } from "mobx";

import { TSteps } from "utils/types/modal";

class MultiStepForm {
  values: object = {};
  activeStep: number = 0;
  steps: TSteps = [];
  previousChoices: Array<{ [key: string]: any }> = [];
  isSubmitButtonDisabled: boolean = false;

  get stepContent() {
    return this.steps[this.activeStep]?.component;
  }

  constructor() {
    makeAutoObservable(this, {
      values: observable.ref,
      steps: observable.ref,
      activeStep: observable.ref,
      previousChoices: observable.ref,
      isSubmitButtonDisabled: observable.ref,
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

  setSubmitButtonState = (state: boolean) => {
    this.isSubmitButtonDisabled = state;
  };

  setPreviousChoices = (newChoice: { [key: string]: any }) => {
    this.previousChoices[this.activeStep] = newChoice;
  };

  setSpecificStepChoice = (step: number, value: { [key: string]: any }) => {
    runInAction(() => {
      this.previousChoices[step] = value;
    });
  };

  clearMultiStep = () => {
    this.values = {};
    this.activeStep = 0;
    this.steps = [];
    this.previousChoices = [];
  };
}

export default new MultiStepForm();
