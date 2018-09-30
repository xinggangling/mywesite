import React from 'react';
import AsyncLoader from 'components/AsyncLoader';

import {
	Profile
} from 'routes/PersonCenter';

import {
	BriefIntroductionToReact
} from 'routes/ReactExploration';

import {
	BriefIntroductionToD3
} from 'routes/D3Study';

export const routes = [
  {
  	key: '/profile',
  	path: '/profile',
  	title: '个人介绍',
  	icontype: 'profile',
  	route: '/profile',
  	component: Profile
  },
  {
  	key: '/react',
  	path: '/react',
  	title: 'React',
  	icontype: 'react',
  	route: '/react',
  	routes: [
  		{
  			key: '/react/briefintro',
  			path: '/react/briefintro',
  			title: 'React探索的相关介绍',
  			icontype: '',
  			route: '/react/briefintro',
  			component: BriefIntroductionToReact
  		}
  	]
	},
  {
  	key: '/d3',
  	path: '/d3',
  	title: 'D3',
  	icontype: 'D',
  	route: '/d3',
  	routes: [
  		{
  			key: '/d3/briefintro',
	  		path: '/d3/briefintro',
	  		title: 'D3相关介绍',
	  		icontype: '',
	  		route: '/d3/briefintro',
	  		component: BriefIntroductionToD3
	  	}
	  ]
	},
	{
  	key: '/python',
  	path: '/python',
  	title: 'Python',
  	icontype: 'language-python-text',
  	route: '/python',
  	routes: [
  		{
  			key: '/python/briefintro',
	  		path: '/python/briefintro',
	  		title: 'Python相关介绍',
	  		icontype: '',
	  		route: '/python/briefintro',
	  		component: BriefIntroductionToD3
	  	}
	  ]
	}
]
