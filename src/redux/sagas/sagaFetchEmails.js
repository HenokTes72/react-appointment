import { call, put, select } from 'redux-saga/effects';
import { parse } from 'node-html-parser';

import {
  actionFetchEmailsInit,
  actionFetchEmailsFailure,
  actionFetchEmailsSuccess
} from '../actions/actionsFetchEmails';
import { selectQuery } from '../selectors/selectorsFetchEmails';
import { getEmails } from '../../config';

function* fetchEmails() {
  yield put(actionFetchEmailsInit());

  try {
    const query = yield select(selectQuery);
    const result = yield call(getEmails, { query });
    const root = parse(result.data);
    const emailsList = root
      .querySelectorAll('a')
      .map(anchorData => anchorData.childNodes[0].rawText);

    yield put(actionFetchEmailsSuccess(emailsList));
  } catch (error) {
    yield put(actionFetchEmailsFailure());
  }
}

export default fetchEmails;
