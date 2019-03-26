import { combineReducers } from 'redux';

import { entry } from './entry.reducer';
import { comment } from './comment.reducer';
import { author } from './author.reducer';
import { blog } from './blog.reducer';
import { root } from './root.reducer';

const rootReducer = combineReducers({
  entry,
  comment,
  author,
  blog,
  root
});

export default rootReducer;