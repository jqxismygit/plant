import React from "react";
import { PlantModel, PlantCore, Plugin, Option } from "./types";
import { listDataLike } from "./utils";

interface State<T> {
  total: number;
  list: T[];
  allIds: T[];
  byId: { [key: string]: T };
}

const action = {
  fetch: "fetch",
  append: "append",
  create: "create",
  update: "update",
  remove: "remove",
  detail: "detail",
} as const;

type Action = keyof typeof action;

const useLoadings = (size: number = 6) => {
  const [] = React.useState();
  return Array.from({ length: size }).map((i) => React.useState(false));
};

const useRequestKeys = () => {
  return Object.keys(action).reduce((prev, k) => {
    prev[k] = React.useRef<number>(0);
    return prev;
  }, {});
};

export const usePlantCore = <T = any>(
  model: PlantModel,
  options: Option = {},
  plugin: Plugin
): PlantCore => {
  const [state, setState] = React.useState<State<T>>({
    total: 0,
    list: [],
    allIds: [],
    byId: {},
  });

  const loadings = useLoadings();
  const requestKeys = useRequestKeys();
  const { dataKey = "id" } = options;

  const { transformAllIds, transformById } = plugin;

  const attachTemp =
    (
      func: (data: any, param: any) => void,
      actionName: string,
      setLoading: (loading: boolean) => void
    ) =>
    (param: any) => {
      requestKeys[actionName].current += 1;
      const lastKey = requestKeys[actionName].current;
      return new Promise(async (resolve, reject) => {
        if (!model?.[actionName]) {
          reject(`模型未定义${actionName}请求，该方法不生效`);
        } else {
          try {
            setLoading(true);
            const data = await model[actionName](param);
            if (lastKey === requestKeys[actionName].current) {
              func?.(data, param);
            }
            resolve(data);
          } catch (error) {
            reject(`[${actionName}]失败！`);
          }
          setLoading(false);
        }
      });
    };

  const fetch = attachTemp(
    (data) => {
      if (listDataLike(data)) {
        const { total, list } = data;
        if (list?.length >= 0) {
          setState({
            total: total || list?.length,
            list,
            allIds: transformAllIds(list, dataKey),
            byId: transformById(list, dataKey),
          });
        }
      }
    },
    action.fetch,
    loadings[0][1]
  );

  const append = attachTemp(
    (data) => {
      if (listDataLike(data)) {
        const { total, list } = data;
        if (list.length > 0) {
          const cList = state.list.concat(list);
          setState({
            total: total || list?.length + state?.total,
            list: cList,
            allIds: transformAllIds(cList, dataKey),
            byId: transformById(cList, dataKey),
          });
        }
      }
    },
    action.append,
    loadings[1][1]
  );

  const create = attachTemp(
    (data, param) => {
      const created = { ...param, ...data };
      if (created?.[dataKey]) {
        const cList = state?.list.concat(created);
        setState({
          total: state?.total + 1,
          list: cList,
          allIds: transformAllIds(cList, dataKey),
          byId: transformById(cList, dataKey),
        });
      }
    },
    action.create,
    loadings[2][1]
  );

  const update = attachTemp(
    (data, param) => {
      const updated = { ...param, ...data };
      if (updated?.[dataKey]) {
        const cList = state?.list.map((i) =>
          i?.[dataKey] === updated?.[dataKey] ? updated : i
        );
        setState({
          total: state?.total,
          list: cList,
          allIds: transformAllIds(cList, dataKey),
          byId: transformById(cList, dataKey),
        });
      }
    },
    action.update,
    loadings[3][1]
  );

  const remove = attachTemp(
    (data, param) => {
      if (param?.[dataKey]) {
        const cList = state.list.filter(
          (i) => i?.[dataKey] !== param?.[dataKey]
        );
        setState({
          total: state?.total - 1,
          list: cList,
          allIds: transformAllIds(cList, dataKey),
          byId: transformById(cList, dataKey),
        });
      }
    },
    action.remove,
    loadings[4][1]
  );

  const detail = attachTemp(
    (data) => {
      if (data?.[dataKey]) {
        const cList = [data]
          .concat(state?.list ?? [])
          .reduce((prev, c, idx) => {
            if (c?.[dataKey] !== data?.[dataKey] || idx === 0) {
              prev.push(c);
            }
            return prev;
          }, []);

        setState({
          total: state?.total,
          list: cList,
          allIds: transformAllIds(cList, dataKey),
          byId: transformById(cList, dataKey),
        });
      }
    },
    action.detail,
    loadings[5][1]
  );

  return {
    byId: state.byId,
    allIds: state.allIds,
    total: state.total,
    loading: {
      fetch: loadings[0][0],
      append: loadings[1][0],
      create: loadings[2][0],
      update: loadings[3][0],
      remove: loadings[4][0],
      detail: loadings[5][0],
    },
    fetch,
    append,
    create,
    update,
    remove,
    detail,
  };
};
