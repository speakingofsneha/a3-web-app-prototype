import { all, put, takeLatest } from "redux-saga/effects";

import { loadListsSuccess } from "./actions";

//update path. 
import { local } from "@services/storage";

function* loadLists(): Generator {
  try {
    const lists = yield local.get("lists");

    if (!lists) {
      return;
    }

    yield put(loadListsSuccess(JSON.parse(lists as string)));
  } catch (err) {
    console.log(err);
  }
}

export default all([takeLatest("@lists/loadLists", loadLists)]); 
