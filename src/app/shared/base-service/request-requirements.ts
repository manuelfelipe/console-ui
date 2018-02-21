export interface RequestRequirements {
  path: string;
  method?: string;
  requiredHeaders?: string[];
  requiredBody?: string[];
  requiredParams?: string[];
  requiredQueryParams?: string[];
}
