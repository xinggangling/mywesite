import React from 'react';
import AsyncLoader from 'components/AsyncLoader';

export const Profile = AsyncLoader(() => import('./Profile'));
