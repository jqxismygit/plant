function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { listDataLike } from './utils';

const useLoadings = (size = 6) => {
  const _React$useState = React.useState(),
        _React$useState2 = _toArray(_React$useState);

  return Array.from({
    length: size
  }).map(i => React.useState(false));
};

export const usePlantCore = (model, options = {}, plugin) => {
  const _React$useState3 = React.useState({
    total: 0,
    list: [],
    allIds: [],
    byId: {}
  }),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        state = _React$useState4[0],
        setState = _React$useState4[1];

  const loadings = useLoadings();
  const _options$dataKey = options.dataKey,
        dataKey = _options$dataKey === void 0 ? 'id' : _options$dataKey;
  const transformAllIds = plugin.transformAllIds,
        transformById = plugin.transformById;

  const attachTemp = (func, actionName, setLoading) => param => {
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        if (!(model === null || model === void 0 ? void 0 : model[actionName])) {
          reject(`模型未定义${actionName}请求，该方法不生效`);
        } else {
          try {
            setLoading(true);

            const _yield$model$actionNa = yield model[actionName](param),
                  data = _yield$model$actionNa.data;

            func === null || func === void 0 ? void 0 : func(data, param);
            resolve(data);
          } catch (error) {
            reject(`[${actionName}]失败！`);
          }

          setLoading(false);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  const fetch = attachTemp(data => {
    if (listDataLike(data)) {
      const total = data.total,
            list = data.list;

      if ((list === null || list === void 0 ? void 0 : list.length) > 0) {
        setState({
          total: total || (list === null || list === void 0 ? void 0 : list.length),
          list,
          allIds: transformAllIds(list, dataKey),
          byId: transformById(list, dataKey)
        });
      }
    }
  }, 'fetch', loadings[0][1]);
  const append = attachTemp(data => {
    if (listDataLike(data)) {
      const total = data.total,
            list = data.list;

      if (list.length > 0) {
        const cList = list.concat(state.list);
        setState({
          total: total || (list === null || list === void 0 ? void 0 : list.length) + (state === null || state === void 0 ? void 0 : state.total),
          list: cList,
          allIds: transformAllIds(cList, dataKey),
          byId: transformById(cList, dataKey)
        });
      }
    }
  }, 'append', loadings[1][1]);
  const create = attachTemp((data, param) => {
    const created = _objectSpread(_objectSpread({}, param), data);

    if (created === null || created === void 0 ? void 0 : created[dataKey]) {
      const cList = state === null || state === void 0 ? void 0 : state.list.concat(created);
      setState({
        total: (state === null || state === void 0 ? void 0 : state.total) + 1,
        list: cList,
        allIds: transformAllIds(cList, dataKey),
        byId: transformById(cList, dataKey)
      });
    }
  }, 'create', loadings[2][1]);
  const update = attachTemp((data, param) => {
    const updated = _objectSpread(_objectSpread({}, param), data);

    if (updated === null || updated === void 0 ? void 0 : updated[dataKey]) {
      const cList = state === null || state === void 0 ? void 0 : state.list.map(i => (i === null || i === void 0 ? void 0 : i[dataKey]) === (updated === null || updated === void 0 ? void 0 : updated[dataKey]) ? updated : i);
      setState({
        total: state === null || state === void 0 ? void 0 : state.total,
        list: cList,
        allIds: transformAllIds(cList, dataKey),
        byId: transformById(cList, dataKey)
      });
    }
  }, 'update', loadings[3][1]);
  const remove = attachTemp((data, param) => {
    if (param === null || param === void 0 ? void 0 : param[dataKey]) {
      const cList = state.list.filter(i => (i === null || i === void 0 ? void 0 : i[dataKey]) !== (param === null || param === void 0 ? void 0 : param[dataKey]));
      setState({
        total: (state === null || state === void 0 ? void 0 : state.total) - 1,
        list: cList,
        allIds: transformAllIds(cList, dataKey),
        byId: transformById(cList, dataKey)
      });
    }
  }, 'remove', loadings[4][1]);
  const detail = attachTemp(data => {
    if (data === null || data === void 0 ? void 0 : data[dataKey]) {
      const cList = state === null || state === void 0 ? void 0 : state.list.map(i => (i === null || i === void 0 ? void 0 : i[dataKey]) === (data === null || data === void 0 ? void 0 : data[dataKey]) ? data : i);
      setState({
        total: state === null || state === void 0 ? void 0 : state.total,
        list: cList,
        allIds: transformAllIds(cList, dataKey),
        byId: transformById(cList, dataKey)
      });
    }
  }, 'detail', loadings[5][1]);
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
      detail: loadings[5][0]
    },
    fetch,
    append,
    create,
    update,
    remove,
    detail
  };
};