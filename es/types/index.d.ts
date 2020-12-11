export interface ListData<T = any> {
  list: T[];
  total: number;
}

export interface ResponseData<T = any> {
  code: number;
  data: T;
}

export type ResponseListData<T> = ResponseData<ListData<T>>;

export interface PlantModel<T = ListData> {
  fetch?: (object: any) => Promise<ResponseData<T>>;
  append?: (object: any) => Promise<ResponseData<T>>;
  create?: (object: any) => Promise<ResponseData<T>>;
  update?: (object: any) => Promise<ResponseData<T>>;
  remove?: (object: any) => Promise<ResponseData<T>>;
  detail?: (object: any) => Promise<ResponseData<T>>;
}

export interface Plugin<T = any> {
  transformAllIds: (list: T[], dataKey?: string) => T[]; //原始数据转化成allIds
  transformById: (list: T[], dataKey?: string) => { [key: string]: T }; //原始数据转化成byId
}

export interface PlantCore<T = any> {
  allIds: T[];
  byId: { [key: string]: T };
  loading: {
    fetch: boolean;
    append: boolean;
    create: boolean;
    update: boolean;
    remove: boolean;
    detail: boolean;
  };
  total: number;
  fetch: (param: any) => Promise<any>;
  append: (object: any) => Promise<any>;
  create: (object: any) => Promise<any>;
  update: (object: any) => Promise<any>;
  remove: (object: any) => Promise<any>;
  detail: (object: any) => Promise<any>;
}

export interface Option {
  type?: 'tree' | 'flat';
  dataKey?: string;
}

export interface PlantContextProps {
  model: PlantModel;
  options?: Option;
  plugin: Plugin;
  plant: React.Context<PlantCore>;
}
