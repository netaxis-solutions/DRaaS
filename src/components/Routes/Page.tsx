import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "components/common/Form/FormInput";
import { nameSchema } from "utils/schemas/nameSchema";

type Inputs = {
  firstName: string;
};

const Page = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(nameSchema(t)),
  });

  const handleChange: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div style={{ margin: 10 }}>
      <form onSubmit={handleSubmit(handleChange)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue="adaa"
          rules={{ required: true }}
          render={({ field, ...props }) => (
            <FormInput label="First name" {...field} {...props} />
          )}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Page;
