import React from 'react';
import AsyncLoader from 'components/AsyncLoader';
import './index.less';

export const NoteList = AsyncLoader(() => import('./NoteList'));
