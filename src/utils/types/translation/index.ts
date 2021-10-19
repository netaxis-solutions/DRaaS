export type SpecificLanguageParameters = {
  name: string;
  lng: string;
  customTranslations: boolean;
};
export type GetSpecificLanguageTranslationType = (
  object: SpecificLanguageParameters
) => Promise<void>;
