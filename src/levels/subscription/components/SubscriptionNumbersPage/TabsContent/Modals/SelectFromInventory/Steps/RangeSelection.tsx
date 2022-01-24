import { useEffect } from "react";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
// import MultiStepForm from "storage/singletons/MultiStepForm";

// import { addTenantSchema } from "utils/schemas/tenant";

// const defaultValues = {
//   name: "",
//   billingId: "",
//   owner: {
//     label: "",
//     value: "",
//   },
//   markup: "",
// };

const RangeSelection: React.FC<any> = ({}) => {
  // const { t } = useTranslation();

  // const { handleSubmit } = useForm<any>({
  //   resolver: yupResolver(addTenantSchema(t)),
  //   defaultValues,
  // });
  // const { goNext } = MultiStepForm;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: any = (event: any) => {
    event.preventDefault();
  };

  return (
    <form id={"SelectFromInventory"} onSubmit={onSubmit}>
      RangeSelection
    </form>
  );
};

export default observer(RangeSelection);
