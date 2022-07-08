export default function dataReducer(keyList, dataList) {
  const result = {};

  function __dataReducer(_keyList, _dataList, _idx, _path) {
    if (_idx >= _keyList.length) {
      _path.reduce((prev, next, curIdx) => {
        if (!prev[next]) prev[next] = {};
        if (_idx - 1 === curIdx) prev[next] = _dataList;
        return prev[next];
      }, result);

      return;
    }

    const grouped = _dataList.reduce((prev, next) => {
      const nextKey = next[_keyList[_idx]].toLowerCase();
      if (!prev[nextKey]) prev[nextKey] = [];
      prev[nextKey].push(next);
      return prev;
    }, {});

    const keys = Object.keys(grouped);

    keys.forEach((k) => {
      _path.push(k);
      __dataReducer(_keyList, grouped[k], _idx + 1, _path);
      _path.pop();
    });
  }

  __dataReducer(keyList, dataList, 0, []);

  return result;
}
