import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncBlock from 'components/Async/AsyncBlock';
import ContentBlock from 'components/ContentBlock';
import { getProfile } from 'reduxx/modules/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rqstToken: null
    };
  }
  componentDidMount() {
    const { actionPromise, rqstToken } = this.props.getProfile();
    actionPromise.then(resp => {
      this.setState(() => ({
        rqstToken
      }), () => {
        this.initPage();
      })
    })
  }

  initPage = () => {
    this.init();
    this.animate();
    this.resize();
  }

  init = () => {
    let container = document.createElement( 'div' );
    document.getElementById('threejs').appendChild( container );

    const widthDom = ReactDOM.findDOMNode(this.refs.widthGetter);
    let rect = widthDom.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.camera = new THREE.PerspectiveCamera( 45, width / height/3 * 2 , 2, 1000 );
    this.camera.position.z = 3;
    this.camera.position.y = -0.3;
    // console.log('this.camera: ', this.camera)
    // this.camera.up.y = 0;
    // this.camera.up.z = 1;
    this.camera.up = new THREE.Vector3( 0, 0, 1 );
    this.controls = new THREE.TrackballControls( this.camera );

    this.scene = new THREE.Scene();
    this.scene.add( new THREE.HemisphereLight(0xffffff, 0xffffff) );

    this.directionalLight = new THREE.DirectionalLight( 0xffffff );
    this.envLight = new THREE.AmbientLight( 0x404040, 1 );
    this.directionalLight.position.set( 0, 0, 1000 );
    // this.scene.add( this.directionalLight );


    console.log('this.scene: ', this.scene)
    // this.scene.up = new THREE.Vector3( 0, 0, 1 );

    this.scene.add( this.envLight );

    //3ds files dont store normal maps
    // this.loader = new THREE.TextureLoader();
    // this.normal = this.loader.load( 'assets/3ds/portalgun/textures/normal.jpg' );

    this.loader = new THREE.TDSLoader();
    // this.loader.setPath( 'models/3ds/portalgun/textures/' );
    this.loader.load( 'assets/mm.3ds', ( object ) => {
      // 客卧2.max
      // object.traverse( ( child ) => {

      //   if ( child instanceof THREE.Mesh ) {

      //     child.material.normalMap = this.normal;
      //   }

      // } );

      console.log('object: ', object)
      object.position.y = -50;
      object.position.z = -700;
      object.rotation.x = -Math.PI/4;
      this.scene.add( object );

    });

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', this.resize, false );
  }

  resize = () => {

    const widthDom = ReactDOM.findDOMNode(this.refs.widthGetter);
    let rect = widthDom.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const aspect = rect.width / rect.height;

    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height/3 * 2 );

  }

  animate = () => {

    this.controls.update();
    this.renderer.render( this.scene, this.camera );

    requestAnimationFrame( this.animate );

  }

  render() {
    const { rqstToken } = this.state;
    const { user } = this.props;
    return (
      <ContentBlock>
				<AsyncBlock outerSpinner="block" rqstToken={rqstToken} loadingWhenNull>
					<div ref="widthGetter">
						<div>
							姓名：{user.username}
						</div>
						<br />
						<div>
							邮箱：{user.email}
						</div>
            <div id="threejs">
              
            </div>
					</div>
				</AsyncBlock>
			</ContentBlock>
    )
  }
}

export default connect(state => {
  return {
    user: state.auth.user || {},
  }
}, {
  getProfile
})(Profile)