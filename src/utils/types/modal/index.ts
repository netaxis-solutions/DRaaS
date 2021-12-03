import React from "react";

export type TSteps = Array<{
  title: string;
  component: React.ReactNode;
  isOptional?: boolean;
}>;

export type TModalHeaderProps = {
  title: string;
  handleCancel: () => void;
  steps?: TSteps;
  activeStep?: number;
};

export type TModalProps = TModalHeaderProps & {
  children: React.ReactNode;
};

export type TStepperProps = {
  steps: TSteps;
  activeStep: number;
};

export type TModalButtonsWrapperProps = {
  cancelButton?: boolean;
  cancelButtonTitle?: string;
  handleCancel?: () => void;
  submitButtonTitle?: string;
  submitIcon?: React.FC;
  cancelIcon?: React.FC;
};

export type TDeleteModalProps = {
  handleCloseModal: () => void;
  handleDelete: () => void;
  selectedRowsLength: number;
  selectedRows: { [key: number]: boolean };
};
