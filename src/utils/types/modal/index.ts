import React from "react";

export type TSteps = Array<{
  title: string;
  component: React.ReactNode;
  isOptional?: boolean;
}>;

export type TModalHeaderProps = {
  title?: string;
  handleCancel: () => void;
  steps?: TSteps;
  activeStep?: number;
  isBackIconHidden?: boolean;
};

export type TModalProps = TModalHeaderProps & {
  children: React.ReactNode;
  styleWithSideBar?: boolean;
  className?: string;
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
  formId?: string;
  top?: number | string;
  submitButtonDisabled?: boolean;
  className?: string;
};

export type TDeleteModalProps = {
  handleCloseModal: () => void;
  handleDelete: () => void;
  selectedRowsLength: number;
  selectedRows: { [key: number]: boolean };
};

export type RightSideModalFooterType = {
  cancelButton?: {
    icon?: React.FC;
    title?: string;
    onClick?: () => void;
    disabled?: boolean;
    hidden?: boolean;
    className?: string;
  };
  submitButton: {
    icon?: React.FC;
    title?: string;
    onClick?: (handleModalClose: () => void) => void;
    disabled?: boolean;
    hidden?: boolean;
    className?: string;
    formId?: string;
    type?: "button" | "reset" | "submit";
  };
};

//Вынести в стору анимацию
